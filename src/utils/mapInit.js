export const VECTOR_LAYER_CONFIG = {
  brightness: 0.75,
  vectorGlyphsUrl:
    'https://vec04.maps.yandex.net/vmap2/glyphs?lang=ru_RU&font_id={{fontId}}&range={{range}}',
  vectorImageUrl:
    'https://vec04.maps.yandex.net/vmap2/icons?id={{id}}&scale={{scale}}',
  vectorMeshUrl: 'https://vec04.maps.yandex.net/vmap2/meshes?id={{id}}',
  vectorTileUrl:
    'https://vec01.maps.yandex.net/vmap2/tiles?lang=ru_RU&x={{x}}&y={{y}}&z={{z}}&zmin={{zmin}}&zmax={{zmax}}&v=20.02.12-0',
};

const layerVectorCustomization = [
  {
    types: 'polygon',
    tags: {
      any: ['vegetation'],
    },
    stylers: [
      {
        zoom: [0, 10],
        visibility: 'off',
      },
    ],
  },
  {
    types: 'polygon',
    tags: {
      any: ['land'],
      none: ['park'],
    },
    stylers: [
      {
        zoom: [0, 8],
        color: 'F2F0E6',
      },
      {
        zoom: [8, 22],
        color: 'F2F0E6',
      },
    ],
  },
  {
    types: 'polygon',
    tags: {
      any: ['admin', 'urban_area', 'poi'],
      none: ['park'],
    },
    stylers: {
      color: 'F2F0E6',
    },
  },
  {
    types: 'polygon',
    tags: {
      any: ['structure', 'building'],
    },
    stylers: {
      color: 'ECE9D9',
    },
  },
  {
    types: 'polyline',
    tags: {
      any: ['transit_schema'],
    },
    stylers: {
      visibility: 'off',
    },
  },
  {
    types: 'point',
    tags: {
      any: ['transit'],
    },
    elements: 'label.text.fill',
    stylers: {
      color: '#3d3d3dff',
    },
  },
  {
    types: 'polyline',
    tags: {
      any: ['transit'],
    },
    elements: 'geometry',
    stylers: {
      opacity: 0.4,
    },
  },
  {
    types: 'point',
    tags: {
      all: ['poi'],
    },
    stylers: {
      visibility: 'off',
    },
  },
  {
    types: 'point',
    tags: {
      any: ['transit'],
    },
    stylers: {
      zoom: [0, 12],
      visibility: 'off',
    },
  },
  {
    types: 'polyline',
    elements: 'geometry.fill',
    tags: {
      any: ['road_5', 'road_6'],
    },
    stylers: [
      {
        zoom: [0, 8],
        color: 'FFFFFF',
      },
      {
        zoom: [8, 12],
        color: 'FFFFFF',
      },
      {
        zoom: [12, 14],
        color: 'FFFFFF',
        scale: 1.5,
      },
      {
        zoom: [14, 22],
        color: 'ffffff',
        scale: 1,
      },
    ],
  },
  {
    types: 'polyline',
    tags: {
      any: ['road_5', 'road_6'],
    },
    elements: 'geometry.outline',
    stylers: [
      {
        zoom: [0, 8],
        color: 'ECE9D9',
      },
      {
        zoom: [8, 12],
        color: 'ECE9D9',
        scale: 1,
      },
      {
        zoom: [12, 14],
        color: 'ECE9D9',
        scale: 1.6,
      },
      {
        zoom: [14, 22],
        color: 'dadada',
        scale: 1.2,
      },
    ],
  },
  {
    types: 'polyline',
    elements: 'geometry.fill',
    tags: {
      any: ['road_1', 'road_2', 'road_3', 'road_4'],
    },
    stylers: [
      {
        zoom: [0, 8],
        color: 'ffffff',
        scale: 2,
      },
      {
        zoom: [8, 11],
        color: 'ffffff',
        scale: 2,
      },
      {
        zoom: [11, 12],
        color: 'ffffff',
        scale: 2.5,
      },
      {
        zoom: [12, 14],
        color: 'ffffff',
        scale: 2.5,
      },
      {
        zoom: [14, 22],
        color: 'ffffff',
        scale: 2,
      },
    ],
  },
  {
    types: 'polyline',
    tags: {
      any: ['road_1', 'road_2', 'road_3', 'road_4'],
    },
    elements: 'geometry.outline',
    stylers: [
      {
        zoom: [0, 8],
        color: 'fff',
        scale: 1,
      },
      {
        zoom: [8, 11],
        color: 'fff',
        scale: 1,
      },
      {
        zoom: [11, 12],
        color: 'dadada',
        scale: 1.6,
      },
      {
        zoom: [12, 14],
        color: 'dadada',
        scale: 2,
      },
      {
        zoom: [14, 22],
        color: 'dadada',
        scale: 2,
      },
    ],
  },
];

const initYandexMap = (ymaps, coordinatesCenter) =>
  new ymaps.Map(
    'map',
    {
      center: coordinatesCenter,
      zoom: 10,
      controls: ['zoomControl'],
    },
    {
      vector: true,
      layerVectorMode: 'day',
      layerVectorCustomization,
    }
  );

export { layerVectorCustomization, initYandexMap };
