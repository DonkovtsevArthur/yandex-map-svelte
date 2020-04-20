<style>
  .yandex-map {
    position: relative;
    display: block;
    width: 100%;
    flex: 1;
    overflow: hidden;
    border-radius: 16px;
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

  import clusterIcon from '../../assets/icons/cluster_icon.png';
  import placemarkIcon from '../../assets/icons/point_icon.png';

  let map;
  let objectManager;

  // конфиг пина кластера
  const clusterIconContentLayout = `<div class="clusterIcon"></div>`;
  const clusterIcons = [
    {
      href: clusterIcon,
      size: [45, 50],
      offset: [-22.5, -50]
    }
  ];

  let ymapsVectorMapLayer;
  let ymaps;

  let isShowPopup = false;

  onMount(() => {
    loadYMapsApi()
      .then(ymaps => {
        ymaps.ready({
          successCallback: function() {
            //рассчет центра карты для первоначальной отрисовки
            const bounds = $data.map(el => el.coordinates.flat(1)).flat(1); //для рассчета центра необходимо сделать структуру координат полигонов более плоской

            const centerOfBounds = ymaps.util.bounds.fromPoints(bounds);
            const { center } = ymaps.util.bounds.getCenterAndZoom(
              centerOfBounds,
              [window.innerWidth, window.innerHeight]
            );

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
              clusterHasBalloon: true,
              geoObjectOpenBalloonOnClick: false,
              clusterIconContentLayout,
              clusterIcons,
              clusterDisableClickZoom: true,
              minClusterSize: 3,
              clusterize: true
            });

            map.geoObjects.add(objectManager);

            map.events.add('click', function(e) {
              console.log('e', e);
              isShowPopup = false;
            });

            objectManager.objects.events.add('click', function(e) {
              const objectId = e.get('objectId');

              const object = objectManager.objects.getById(objectId).info || {};

              changeInfo(object);

              isShowPopup = true;
            }); // привязка ObjectManager к текущей карте

            // добавляем событие реагирующее на изменение зума карты, т.к. при определенном зуме нам нужно показывать либо полигоны, либо пины
            map.events.add('boundschange', e => {
              const oldZoom = e.get('oldZoom');
              const newZoom = e.get('newZoom');

              if (newZoom < 13 && oldZoom >= 13) {
                viewModeChanged(false);
                objectManager.options.set({ clusterize: true });
              }

              if (newZoom >= 13 && oldZoom < 13) {
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
