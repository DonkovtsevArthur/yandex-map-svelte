/* eslint-disable no-undef */
import qs from 'querystring';

// функциаонал от яндекса

const successCallbackName = '_$_api_success';
const errorCallbackName = '_$_api_error';

const defaultOptions = {
  lang: 'ru_RU',
  coordorder: 'latlong',
  load: 'package.full',
  mode: 'release',
  namespace: '',
  onload: successCallbackName,
  onerror: errorCallbackName,
};

const fetchScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.onload = resolve;
    script.onerror = reject;
    script.src = url;

    const beforeScript = document.getElementsByTagName('script')[0];

    beforeScript.parentNode.insertBefore(script, beforeScript);
  });
};

const generateURL = (options) =>
  `https://api-maps.yandex.ru/${'2.1'}/?${qs.stringify({
    ...defaultOptions,
    ...options,
  })}&mode=debug`;

let loadPromise;

export const loadYMapsApi = (options) => {
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    window[successCallbackName] = (ymaps) => {
      ymaps.modules.require('vectorEngine.VectorMapLayer', (VectorMapLayer) => {
        ymaps.VectorMapLayer = VectorMapLayer;
        resolve(ymaps);
      });
      window[successCallbackName] = null;
    };

    window[errorCallbackName] = (error) => {
      reject(error);
      window[errorCallbackName] = null;
    };

    fetchScript(generateURL(options));
  });

  return loadPromise;
};
