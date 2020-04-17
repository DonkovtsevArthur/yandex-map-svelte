<style>
  .root-container {
    padding: 32px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: var(--grey-100);
  }

  .details-container {
    display: flex;
    padding-top: 16px;
    justify-content: space-between;
    align-items: center;
  }

  .details-info {
    font-size: 14px;
    line-height: 20px;
    color: var(--black-92);
    margin-right: 66px;
  }
</style>

<script>
  import { onMount } from 'svelte';

  import NormalizeStyles from './normalize-styles.svelte';
  import GlobalStyles from './global-styles.svelte';
  import QuarterControl from './features/quarter-control/quarter-control.svelte';
  import YandexMap from './features/map/yandex-map.svelte';
  import { dataReceived, buildingsCount } from './model/index';
  import data from '../data.json';
  import './features/quarter-control/models/';
  import './model/model.js';

  onMount(() => {
    dataReceived(data);
  });
</script>

<div class="root-container">
  <NormalizeStyles />
  <GlobalStyles />
  <YandexMap />
  <div class="details-container">
    <span class="details-info">
      {$buildingsCount} очереди строительства в 2020 году
    </span>
    <QuarterControl />
  </div>

</div>
