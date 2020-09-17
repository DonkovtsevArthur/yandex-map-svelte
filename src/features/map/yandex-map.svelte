<style>
  .yandex-map {
    position: initial;
    display: block;
    width: 100%;
    flex: 1;
    overflow: hidden;
    border-radius: 16px;
    z-index: 2;
  }
</style>

<script>
  import { onMount, setContext } from 'svelte';
  import YandexPopup from './yandex-popup';
  import {
    initYandexMap,
    layerVectorCustomization,
    VECTOR_LAYER_CONFIG
  } from '../../utils/mapInit';
  import {
    dataToShow,
    data,
    isPolygonsMode,
    viewModeChanged
  } from '../../model';
  import { changeInfo } from './models/';
  import { loadYMapsApi } from './ymaps-load';

  import clusterIconActive from '../../assets/icons/clusterIconActive.svg';
  import clusterIconViewed from '../../assets/icons/clusterIconViewed.svg';

  import pointIconViewed from '../../assets/icons/pointViewed.svg';
  import pointIconActive from '../../assets/icons/pointActive.svg';

  import {
    changePointIcon,
    changeClusterIcon,
    clusterIconContentLayout,
    clusterIcons,
    polygonActive,
    polygonViewed
  } from './helpers';

  let map;
  let objectManager;

  let ymapsVectorMapLayer;
  let ymaps;

  let isShowPopup = false;

  const center = [55.75393, 37.621401];

  onMount(() => {
    loadYMapsApi()
      .then(ymaps => {
        ymaps.ready({
          successCallback: function() {
            //рассчет центра карты для первоначальной отрисовки
            const bounds = $data.map(el => el.coordinates.flat(1)).flat(1); //для рассчета центра необходимо сделать структуру координат полигонов более плоской

            const centerOfBounds = ymaps.util.bounds.fromPoints(bounds);
            // const { center } = ymaps.util.bounds.getCenterAndZoom(
            //   centerOfBounds,
            //   [window.innerWidth, window.innerHeight]
            // );

            // инициализация карты
            map = initYandexMap(ymaps, center);

            // создаем векторную карту
            const layer = new ymaps.VectorMapLayer(
              {
                vectorCustomization: layerVectorCustomization
              },
              VECTOR_LAYER_CONFIG
            );
            // удаляем все слои
            map.layers.get(0).removeAll();
            // добавляем новый векторной слой
            map.layers.get(0).add(layer);

            // инициализация ObjectManager который отвечает за отрисовку точек, полигонов, кластеров
            objectManager = new ymaps.ObjectManager({
              clusterHasBalloon: false,
              geoObjectOpenBalloonOnClick: false,
              clusterIconContentLayout,
              clusterIcons,
              clusterDisableClickZoom: true,
              minClusterSize: 3,
              clusterize: true
            });

            // привязка ObjectManager к текущей карте
            map.geoObjects.add(objectManager);

            // for cluster

            let lastClusterId;
            let clusterActive;
            let lastFeature = [];

            // for point and polygon

            let lastObjectId;
            let objectActive;
            let lastObjects = [];

            // событие по кластеру
            objectManager.clusters.events.add(['click'], function(e) {
              const clusterId = e.get('objectId');

              const clustersList = objectManager.clusters.getAll();
              const clusters = objectManager.clusters.getById(clusterId) || {};

              const { features = [] } = clusters || {};
              const clusterObject = features[0] || {};

              // const objects = clusters.properties.geoObjects;

              //  если есть предыдущий активный кластер то делаем его неактивным
              if (lastClusterId) {
                const lastCluster = clustersList.find(({ features }) =>
                  features.some(el => el.originalId === lastClusterId)
                );

                if (lastCluster) {
                  changeClusterIcon({
                    clusterId: lastCluster.id,
                    icon: clusterIconViewed,
                    objectManager
                  });
                }
              }

              //  если есть предыдущий активный поинт то делаем его неактивным
              if (lastObjectId) {
                const listpolygon = objectManager.objects.getAll();
                listpolygon.forEach(({ originalId, id }) => {
                  if (originalId === lastObjectId) {
                    changePointIcon({
                      objectId: id,
                      icon: pointIconViewed,
                      objectManager
                    });
                  }
                });

                lastObjectId = '';
              }

              // собираем все ранее просмотренные кластеры
              lastFeature.push(
                ...new Set([...lastFeature, features[0].originalId])
              );

              // возможно тут можно сделать и по-другому но проект одноразовы
              // далее это все разруливается, что-то удаляется что- то нет
              // акивный кластер
              clusterActive = clusterObject.originalId;
              // он же становится предыдущим
              lastClusterId = clusterObject.originalId;

              // поинт активный и последний
              objectActive = clusterObject.originalId;
              lastObjectId = clusterObject.originalId;

              // отображаем активный кластер
              changeClusterIcon({
                clusterId,
                icon: clusterIconActive,
                objectManager
              });
              // отображаем активный  поинт при увеличении карты
              changePointIcon({
                objectId: clusterObject.id,
                icon: pointIconActive,
                objectManager
              });
              // заносим инфу для попапа
              changeInfo(clusterObject.info);

              // открываем попап
              isShowPopup = true;
            });

            // при зуме все менятся и отрисовывается заново
            // событие на добавления кластера на карту
            objectManager.clusters.events.add('add', function(e) {
              const clusterId = e.get('objectId');
              const cluster = objectManager.clusters.getById(clusterId);

              const clustersList = objectManager.clusters.getAll();
              const objects = cluster.properties.geoObjects;

              // при смене зума определяем какой кластер в данный момент
              const clusterObject = cluster.features.find(({ originalId }) =>
                lastFeature.some(el => el.includes(originalId))
              );

              // при смене зума отображаем просмотренные кластеры
              if (clusterObject && clusterObject.originalId !== clusterActive) {
                changeClusterIcon({
                  clusterId,
                  icon: clusterIconViewed,
                  objectManager
                });

                changePointIcon({
                  objectId: clusterObject.id,
                  icon: pointIconViewed,
                  objectManager
                });
              }

              // set active cluster
              if (clusterActive) {
                clustersList.forEach(({ id, features }) => {
                  const isFeature = features.some(
                    ({ originalId }) => originalId === clusterActive
                  );

                  if (isFeature) {
                    changeClusterIcon({
                      clusterId: id,
                      icon: clusterIconActive,
                      objectManager
                    });
                  }
                });
              }
            });

            // событие по клику на point на карте
            objectManager.objects.events.add('click', function(e) {
              const objectId = e.get('objectId');
              const object = objectManager.objects.getById(objectId);

              // lastFeature = [object.originalId];

              const isPolygon = object.geometry.type === 'Polygon';

              // заносим все просмотренные поинты в кэш
              lastObjects = [...new Set([...lastObjects, object.originalId])];

              const listObject = objectManager.objects.getAll();

              // меняем при клике с активного на неавктивный кластер
              if (lastClusterId) {
                const clustersList = objectManager.clusters.getAll();
                const lastCluster = clustersList.find(({ features }) =>
                  features.some(el => el.originalId === lastClusterId)
                );

                if (lastCluster) {
                  changeClusterIcon({
                    clusterId: lastCluster.id,
                    icon: clusterIconViewed,
                    objectManager
                  });
                }
              }

              // меняем при клике с активного на неавктивный поинт
              if (lastObjectId) {
                listObject.forEach(({ originalId, id }) => {
                  if (originalId === lastObjectId) {
                    if (isPolygon) {
                      objectManager.objects.setObjectOptions(id, polygonViewed);
                    } else {
                      changePointIcon({
                        objectId: id,
                        icon: pointIconViewed,
                        objectManager
                      });
                    }
                  }
                });
              }

              // записываем последний поинт  и активный
              lastObjectId = objectId;
              objectActive = object.originalId;

              const { info } = object || {};

              // при клике определяем тип и устанавливаем актиный поинт или полигон
              listObject.forEach(({ originalId, id }) => {
                if (originalId === object.originalId) {
                  lastObjectId = originalId;

                  lastFeature.push(originalId);
                  lastClusterId = originalId;
                  clusterActive = originalId;
                  if (isPolygon) {
                    objectManager.objects.setObjectOptions(id, polygonActive);
                  } else {
                    changePointIcon({
                      objectId,
                      icon: pointIconActive,
                      objectManager
                    });
                  }
                } else {
                  changeClusterIcon({
                    clusterId: id,
                    icon: clusterIconViewed,
                    objectManager
                  });
                }
              });

              // заносим инфу для попапа
              changeInfo(info);

              isShowPopup = true;
            });

            // при смене зума заносим все данные по поинтам и полигонам
            objectManager.objects.events.add('add', function(e) {
              const objectId = e.get('objectId');
              const object = objectManager.objects.getById(objectId);

              const isPolygon = object.geometry.type === 'Polygon';

              const isLastObjects = lastObjects.some(
                el => el === object.originalId
              );

              // определяем какие ранее были просмотрены поинты или полигоны
              if (isLastObjects && objectActive !== object.originalId) {
                objectManager.objects.setObjectOptions(objectId, polygonViewed);
                changePointIcon({
                  objectId,
                  icon: pointIconViewed,
                  objectManager
                });
              }

              // определяем какой активен  поинт или полигон
              if (object.originalId === objectActive) {
                //  lastObjectId = objectId;
                objectManager.objects.setObjectOptions(objectId, polygonActive);
                changePointIcon({
                  objectId,
                  icon: pointIconActive,
                  objectManager
                });
              }
            });

            // событие клика по самой карте
            map.events.add('click', function(e) {
              if (lastClusterId) {
                const clustersList = objectManager.clusters.getAll();

                const lastCluster = clustersList.find(({ features }) =>
                  features.some(el => el.originalId === lastClusterId)
                );

                if (lastCluster) {
                  changeClusterIcon({
                    clusterId: lastCluster.id,
                    icon: clusterIconViewed,
                    objectManager
                  });
                }

                changePointIcon({
                  objectId: lastClusterId,
                  icon: pointIconViewed,
                  objectManager
                });
              }

              if (clusterActive) {
                clusterActive = '';
              }

              if (objectActive) {
                objectActive = '';
              }

              // при клике на карту мы делаем активный поинте не активным
              if (lastObjectId) {
                const listObjects = objectManager.objects.getAll();
                listObjects.forEach(({ originalId, id }) => {
                  if (originalId === lastObjectId) {
                    objectManager.objects.setObjectOptions(id, polygonViewed);
                    changePointIcon({
                      objectId: id,
                      icon: pointIconViewed,
                      objectManager
                    });
                  }
                });

                lastObjectId = '';
              }
              isShowPopup = false;
            });

            // добавляем событие реагирующее на изменение зума карты, т.к. при определенном зуме нам нужно показывать либо полигоны, либо пины
            map.events.add('boundschange', e => {
              const oldZoom = e.get('oldZoom');
              const newZoom = e.get('newZoom');

              if (
                (newZoom < 13 && oldZoom >= 13) ||
                (newZoom < 13 && oldZoom <= 13)
              ) {
                viewModeChanged(false);
                objectManager.options.set({ clusterize: true });
              }

              if (newZoom >= 12 && oldZoom < 13) {
                viewModeChanged(true);
                objectManager.options.set({ clusterize: false });
              }
            });
          }
        });
      })
      .catch(error => console.log('eror', error));
  });

  $: {
    // тут реактивная реакция на изменение стора dataToShow. при каждом изменении чистим ObjectManager и добавляем новые данные в него
    if (objectManager) {
      objectManager.removeAll();
      $dataToShow.forEach(({ polygon, point }) => {
        const target = $isPolygonsMode ? polygon : point;
        objectManager.add(target);
      });
    }
  }
</script>

<div id="map" class="yandex-map">
  {#if isShowPopup}
    <YandexPopup />
  {/if}
</div>
