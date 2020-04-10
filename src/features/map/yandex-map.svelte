<style>
  .yandex-map {
    width: 100%;
    flex: 1;
    overflow: hidden;
    border-radius: 16px;
  }
</style>

<script>
  import { onMount, setContext } from 'svelte';
  import { initYandexMap } from '../../utils/mapInit';
  import {
    dataToShow,
    data,
    isPolygonsMode,
    viewModeChanged
  } from '../../model';
  import { nanoid } from 'nanoid';
  import clusterIcon from '../../assets/icons/cluster_icon.png';
  import placemarkIcon from '../../assets/icons/point_icon.png';

  let yandexMaps;
  let map;
  let polygons = [];
  let clusterer;

  const clusterIconContentLayout = `<div class="clusterIcon"></div>`;
  const clusterIcons = [
    {
      href: clusterIcon,
      size: [45, 50],
      offset: [-22.5, -50]
    }
  ];

  onMount(() => {
    ymaps.ready(() => {
      yandexMaps = ymaps;

      const bounds = $data.map(el => el.coordinates.flat(1)).flat(1);
      const centerOfBounds = yandexMaps.util.bounds.fromPoints(bounds);
      const { center } = yandexMaps.util.bounds.getCenterAndZoom(
        centerOfBounds,
        [window.innerWidth, window.innerHeight]
      );

      map = initYandexMap(yandexMaps, center);
      clusterer = new yandexMaps.ObjectManager({
        clusterHasBalloon: false,
        geoObjectOpenBalloonOnClick: false,
        clusterIconContentLayout,
        clusterIcons,
        clusterDisableClickZoom: true,
        minClusterSize: 3,
        clusterize: true
      });

      map.geoObjects.add(clusterer);
      map.events.add('boundschange', e => {
        const oldZoom = e.get('oldZoom');
        const newZoom = e.get('newZoom');

        if (newZoom < 13 && oldZoom >= 13) {
          viewModeChanged(false);
          clusterer.options.set({ clusterize: true });
        }

        if (newZoom >= 13 && oldZoom < 13) {
          viewModeChanged(true);
          clusterer.options.set({ clusterize: false });
        }
      });
    });
  });

  $: {
    if (clusterer) {
      let visiblePoints = [];
      let isPolygon = $isPolygonsMode;
      $dataToShow.forEach(({ polygon, point }) => {
        const target = isPolygon ? polygon : point;
        visiblePoints.push(target);
      });

      clusterer.removeAll();
      clusterer.add({ type: 'FeatureCollection', features: visiblePoints });
    }
  }
</script>

<div id="map" class="yandex-map"></div>
