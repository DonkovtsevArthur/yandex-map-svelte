<style>
  .yandex-map {
    width: 100%;
    flex: 1;
    border-radius: 16px;
    overflow: hidden;
  }
</style>

<script>
  import { onMount } from 'svelte';

  import { dataToShow, data } from '../../model';
  import { initYandexMap } from '../../utils/mapInit';
  import clusterIcon from '../../assets/icons/cluster_icon.png';

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

      $data.forEach(geoObject => {
        const point = new yandexMaps.Placemark(
          geoObject.coordinates[0][0],
          {},
          {
            iconLayout: '',
            iconContentLayout: '<div></div>',
            iconImageHref: ''
          }
        );

        const polygon = new yandexMaps.GeoObject({
          geometry: {
            type: 'Polygon',
            coordinates: geoObject.coordinates
          }
        });

        polygons.push({
          ...geoObject,
          polygon,
          point
        });
      });

      const bounds = polygons.map(el => el.coordinates.flat(1)).flat(1);
      const centerOfBounds = yandexMaps.util.bounds.fromPoints(bounds);
      const { center } = yandexMaps.util.bounds.getCenterAndZoom(
        centerOfBounds,
        [window.innerWidth, window.innerHeight]
      );

      map = initYandexMap(yandexMaps, center);
      // clusterer = new yandexMaps.Clusterer({
      //   clusterIconContentLayout,
      //   clusterIcons,
      //   clusterDisableClickZoom: true,
      //   minClusterSize: 3
      // });

      clusterer = new yandexMaps.ObjectManager({
        clusterize: true,
        // clusterHasBalloon: false,
        // geoObjectOpenBalloonOnClick: false,
        clusterIconContentLayout,
        clusterIcons,
        clusterDisableClickZoom: true,
        clusterMinClusterSize: 3
      });

      map.geoObjects.add(clusterer);
    });
  });

  $: {
    if (map) {
      let visiblePoints = [];
      polygons.forEach(({ site_id, polygon, point }) => {
        const currentPolygonIsVisible = $dataToShow.find(
          el => el.site_id === site_id
        );
        const currentPolygonIsExist = map.geoObjects.indexOf(polygon) !== -1;

        if (currentPolygonIsVisible) {
          // if (!currentPolygonIsExist) map.geoObjects.add(polygon);

          clusterer.add(point);
        } else {
          if (currentPolygonIsExist) {
            // map.geoObjects.remove(polygon);
            clusterer.remove(point);
          }
        }
      });

      // clusterer.removeAll();
      // clusterer.add(visiblePoints);
    }
  }
</script>

<div id="map" class="yandex-map"></div>
