import clusterIcon from '../../assets/icons/clusterIcon.svg';
// конфиг пина кластера
const clusterIconContentLayout = `<div class="clusterIcon"></div>`;
const clusterIcons = [
  {
    href: clusterIcon,
    size: [45, 50],
    offset: [-22.5, -50],
  },
];

// polygon active
const polygonActive = {
  strokeColor: 'rgba(255,102,102, 0.7)',
  fillColor: 'rgba(255,102,102, 0.7)',
};

// polygon viewed
const polygonViewed = {
  strokeColor: 'rgba(71,157,255, 0.7)',
  fillColor: 'rgba(71,157,255, 0.7)',
};

const changePointIcon = ({ objectId, icon, objectManager }) => {
  objectManager.objects.setObjectOptions(objectId, {
    iconLayout: 'default#image',
    iconImageHref: icon,
    iconImageSize: [10, 10],
  });
};

const changeClusterIcon = ({ clusterId, icon, objectManager }) => {
  objectManager.clusters.setClusterOptions(clusterId, {
    clusterIcons: [
      {
        href: icon,
        size: [45, 50],
        offset: [-22.5, -50],
      },
    ],
  });
};

export {
  changePointIcon,
  changeClusterIcon,
  clusterIconContentLayout,
  clusterIcons,
  polygonActive,
  polygonViewed,
};
