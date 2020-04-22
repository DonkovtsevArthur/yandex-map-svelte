import dayjs from 'dayjs';
import { sample } from 'effector';
import { nanoid } from 'nanoid';
import { quartersDates } from '../utils/quarters-dates';
import pointDefault from '../assets/icons/point.svg';

import {
  data,
  dataReceived,
  dataToShow,
  isPolygonsMode,
  quartersNewBuildings,
  dataChanged,
  viewModeChanged,
} from './index';

//функция подготовки данных, в том числе описанию полигонов и пинов в том виде в котором их ждет ObjectManager
const prependData = (data) =>
  data
    .filter(({ coordinates }) => coordinates && coordinates.length > 5)
    .map(
      (
        {
          day,
          coordinates,
          name,
          url,
          main_photo,
          description,
          developer_name,
          metro_line,
          address,
          mode_of_transport,
          time_to_metro,
          phases_count,
          site_id,
          building_site_name,
          ...rest
        },
        i
      ) => {
        const parsedCoordinates = JSON.parse(coordinates);

        const info = {
          name,
          url,
          main_photo,
          description,
          developer_name,
          metro_line,
          address,
          mode_of_transport,
          time_to_metro,
          day,
          phases_count,
          site_id,
          building_site_name,
        };

        const point = {
          id: nanoid(),
          originalId: site_id + building_site_name,
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: parsedCoordinates[0],
          },
          properties: {
            hintContent: name,
          },
          info,

          options: {
            iconLayout: 'default#image',
            iconImageHref: pointDefault,
            iconImageSize: [10, 10],
          },
        };

        const polygon = {
          id: nanoid(),
          originalId: site_id + building_site_name,
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [parsedCoordinates],
          },
          info,
          properties: {
            hintContent: name,
          },
        };

        const enhanced = {
          ...rest,
          name,
          point,
          polygon,
          day: dayjs(day).valueOf(),
          coordinates: [parsedCoordinates],
        };

        return enhanced;
      }
    );

data.on(dataReceived.map(prependData), (_, data) => data);
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

        if (currentDate <= quartersDates.q1.end) {
          result = { ...acc, q1: acc.q1 + 1 };
        } else if (
          currentDate >= quartersDates.q2.start &&
          currentDate <= quartersDates.q2.end
        ) {
          result = { ...acc, q2: acc.q2 + 1 };
        } else if (
          currentDate > quartersDates.q3.start &&
          currentDate <= quartersDates.q3.end
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
