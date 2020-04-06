<style>
  .yandex-map {
    width: 100%;
    flex: 1;
  }
</style>

<script>
  import { onMount, setContext } from 'svelte';
  import { dataToShow, data } from '../../model';

  let yandexMaps;
  let map;
  let polygons = [];

  onMount(() => {
    ymaps.ready(() => {
      yandexMaps = ymaps;

      $data.forEach(geoObject => {
        const polygon = new yandexMaps.GeoObject({
          geometry: {
            type: 'Polygon',
            coordinates: geoObject.coordinates
          }
        });

        polygons.push({
          ...geoObject,
          polygon
        });
      });

      const bounds = polygons.map(el => el.coordinates.flat(1)).flat(1);
      const centerBounds = yandexMaps.util.bounds.fromPoints(bounds);
      const { center } = yandexMaps.util.bounds.getCenterAndZoom(centerBounds, [
        window.innerWidth,
        window.innerHeight
      ]);

      map = new ymaps.Map('map', {
        center,
        zoom: 10,
        controls: ['zoomControl']
      });
    });
  });

  $: {
    if (map) {
      polygons.forEach(({ site_id, polygon }, index) => {
        const currentPolygonIsVisible = $dataToShow.find(
          el => el.site_id === site_id
        );
        const currentPolygonIsExist = map.geoObjects.indexOf(polygon) !== -1;

        if (currentPolygonIsVisible) {
          if (!currentPolygonIsExist) {
            map.geoObjects.add(polygon);
          }
        } else {
          if (currentPolygonIsExist) {
            map.geoObjects.remove(polygon);
          }
        }
      });
    }
  }
</script>

<div id="map" class="yandex-map"></div>
