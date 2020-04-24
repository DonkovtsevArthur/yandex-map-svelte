<style global>
  * {
    box-sizing: border-box;
  }

  /* Пока пакет не вольется в Морду и Дзен, использовать шрифты из статики морды. */
  @font-face {
    font-family: 'YS Text';

    /* src: url('freeze:link:./font/text-light.woff2') format('woff2'), */
    /* url('freeze:link:./font/text-light.woff') format('woff'); */
    src: url('//yastatic.net/s3/home/fonts/ys/1/text-light.woff2')
        format('woff2'),
      url('//yastatic.net/s3/home/fonts/ys/1/text-light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
  }

  @font-face {
    font-family: 'YS Text';

    /* src: url('freeze:link:./font/text-regular.woff2') format('woff2'), */
    /* url('freeze:link:./font/text-regular.woff') format('woff'); */
    src: url('//yastatic.net/s3/home/fonts/ys/1/text-regular.woff2')
        format('woff2'),
      url('//yastatic.net/s3/home/fonts/ys/1/text-regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
  }

  @font-face {
    font-family: 'YS Text';

    /* src: url('freeze:link:./font/text-medium.woff2') format('woff2'), */
    /* url('freeze:link:./font/text-medium.woff') format('woff'); */
    src: url('//yastatic.net/s3/home/fonts/ys/1/text-medium.woff2')
        format('woff2'),
      url('//yastatic.net/s3/home/fonts/ys/1/text-medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
  }

  @font-face {
    font-family: 'YS Text';

    /* src: url('freeze:link:./font/text-bold.woff2') format('woff2'), */
    /* url('freeze:link:./font/text-bold.woff') format('woff'); */
    src: url('//yastatic.net/s3/home/fonts/ys/1/text-bold.woff2')
        format('woff2'),
      url('//yastatic.net/s3/home/fonts/ys/1/text-bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
  }

  body {
    font-family: 'YS Text', 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-feature-settings: 'liga', 'kern';
    -moz-font-feature-settings: 'liga', 'kern';
    font-feature-settings: 'liga', 'kern';
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  h3,
  p {
    margin: 0;
  }

  img {
    width: 100%;
    height: 100%;
  }

  :root {
    --white: #ffffff;
    --red-100: #ffbcbc;
    --red-200: #ff6666;
    --red-300: #ff3333;
    --red-400: #e00000;

    --yellow-100: #ffea95;
    --yellow-200: #ffde5a;
    --yellow-300: #ffcc00;
    --yellow-400: #eba704;

    --green-100: #8fdeab;
    --green-200: #63e693;
    --green-300: #00b341;
    --green-400: #008c33;
    --green-500: #005f23;

    --blue-1-100: #e0edfa;
    --blue-1-200: #8fc3ff;
    --blue-1-300: #0077ff;
    --blue-1-400: #0065d9;
    --blue-1-500: #004594;

    --blue-2-100: #b9e9fc;
    --blue-2-200: #5fcef9;
    --blue-2-300: #58bfe7;
    --blue-2-400: #2a9fcb;

    --violet-100: #da80ff;
    --violet-200: #c947ff;
    --violet-300: #35117c;

    --black-100: #000000;
    --black-92: rgba(0, 0, 0, 0.92);
    --black-72: rgba(0, 0, 0, 0.72);
    --black-56: rgba(0, 0, 0, 0.56);
    --black-32: rgba(0, 0, 0, 0.32);
    --black-24: rgba(0, 0, 0, 0.24);
    --black-16: rgba(0, 0, 0, 0.16);
    --black-12: rgba(0, 0, 0, 0.12);
    --black-08: rgba(0, 0, 0, 0.08);
    --black-04: rgba(0, 0, 0, 0.04);

    --grey-100: #f5f5f5;
  }
</style>
