import App from './App.svelte';

const app = new App({
  // eslint-disable-next-line
  target: document.body,
  props: {
    name: 'Yandex buildings timeline',
  },
});

export default app;
