<style>
  .root-container {
    padding: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>

<script>
  import { onMount } from 'svelte';

  import NormalizeStyles from './normalize-styles.svelte';
  import GlobalStyles from './global-styles.svelte';
  import Slider from './features/slider/slider.svelte';
  import YandexMap from './features/map/yandex-map.svelte';
  import { dataReceived } from './model/index';
  import data from '../data.json';
  import './model/model.js';

  onMount(() => {
    dataReceived(data);
  });
</script>

<div class="root-container">
  <NormalizeStyles />
  <GlobalStyles />
  <Slider />
  <YandexMap />
</div>
