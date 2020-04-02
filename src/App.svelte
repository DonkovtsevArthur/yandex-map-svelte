<style>
  .root-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
</style>

<script>
  import NormalizeStyles from './normalize-styles.svelte';
  import GlobalStyles from './global-styles.svelte';
  import Slider from './features/slider/slider.svelte';
</script>

<div class="root-container">
  <NormalizeStyles />
  <GlobalStyles />
  <Slider />
</div>
