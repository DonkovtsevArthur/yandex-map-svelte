import dayjs from 'dayjs';
import { sample } from 'effector';
import { nanoid } from 'nanoid';
import { quartersDates } from '../utils/quarters-dates';
import placemarkIcon from '../assets/icons/point_icon.png';

import {
  data,
  dataReceived,
  selectedValue,
  dataToShow,
  isPolygonsMode,
  valueChanged,
  quartersNewBuildings,
  dataChanged,
  viewModeChanged,
} from './index';

//функция подготовки данных, в том числе описанию полигонов и пинов в том виде в котором их ждет ObjectManager
const prependData = (data) =>
  data
    .filter(({ coordinates }) => coordinates && coordinates.length > 5)
    .map(({ day, coordinates, ...rest }) => {
      const parsedCoordinates = JSON.parse(coordinates);

      const point = {
        id: nanoid(),
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: parsedCoordinates[0][0],
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref: placemarkIcon,
          iconImageSize: [10, 10],
        },
      };

      const polygon = {
        id: nanoid(),
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: parsedCoordinates,
        },
      };

      const enhanced = {
        ...rest,
        point,
        polygon,
        day: dayjs(day).valueOf(),
        coordinates: JSON.parse(coordinates),
      };

      return enhanced;
    });

data.on(dataReceived.map(prependData), (_, data) => data);
selectedValue.on(valueChanged, (_, newValue) => newValue);
dataToShow.on(dataChanged, (_, data) => data);
isPolygonsMode.on(viewModeChanged, (_, newState) => newState);

// здесь немножко костылей, мне было лень переписывать потом, подсчитываем количество жилый комплексов для того или иного квартала
sample({
  source: data,
  clock: data,
  fn: (data) =>
    data.reduce(
      (acc, { day: currentDate }) => {
        let result;

        if (currentDate <= quartersDates.q1) {
          result = { ...acc, q1: acc.q1 + 1 };
        } else if (
          currentDate > quartersDates.q1 &&
          currentDate <= quartersDates.q2
        ) {
          result = { ...acc, q2: acc.q2 + 1 };
        } else if (
          currentDate > quartersDates.q2 &&
          currentDate <= quartersDates.q3
        ) {
          result = { ...acc, q3: acc.q3 + 1 };
        } else {
          result = { ...acc, q4: acc.q4 + 1 };
        }

        return result;
      },
      { q1: 0, q2: 0, q3: 0, q4: 0 }
    ),
  target: quartersNewBuildings,
});

// изменяем данных для отображения в зависимости от выбранного периода
sample({
  source: data,
  clock: selectedValue,
  fn: (data, selectedValue) => data.filter(({ day }) => day <= selectedValue),
  target: dataToShow,
});
