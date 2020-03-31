<script>
  import NormalizeStyles from './normalize-styles.svelte';
  import GlobalStyles from './global-styles.svelte';

  let greet = 'Hello';
</script>

<div>
  <NormalizeStyles />
  <GlobalStyles />
  <h1 class="title">{greet}</h1>
</div>
