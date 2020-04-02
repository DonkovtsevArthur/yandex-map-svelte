<style>
  .yandex-map {
    width: 100%;
    flex: 1;
  }
</style>

<script>
  import { onMount, setContext } from 'svelte';

  let map;

  onMount(() => {
    ymaps.ready(() => {
      map = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 7
      });
    });
  });
</script>

<div id="map" class="yandex-map"></div>
