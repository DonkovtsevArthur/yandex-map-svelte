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
const prependData = (data) => {
  return (
    data
      // .filter(({ coordinates }) => coordinates && coordinates.length > 5)
      .map(
        ({
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
        }) => {
          const parsedCoordinates = JSON.parse(coordinates);

          const newCoordinatesPoint = Array.isArray(parsedCoordinates[0])
            ? parsedCoordinates[0]
            : parsedCoordinates;

          const newCoordinatesPolygon = Array.isArray(parsedCoordinates[0])
            ? parsedCoordinates
            : [parsedCoordinates];

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
              coordinates: newCoordinatesPoint,
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
              coordinates: [newCoordinatesPolygon],
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
            coordinates: [newCoordinatesPolygon],
          };

          return enhanced;
        }
      )
  );
};

data.on(dataReceived.map(prependData), (_, data) => data);
dataToShow.on(dataChanged, (_, data) => data);
isPolygonsMode.on(viewModeChanged, (_, newState) => newState);

// здесь немножко костылей, мне было лень переписывать потом, подсчитываем количество жилый комплексов для того или иного квартала
sample({
  source: data,
  clock: data,
  fn: (data) =>
    data.reduce(
      (acc, { day: currentDate, ...rest }) => {
        let result;

        if (currentDate <= quartersDates.q1.end) {
          result = {
            ...acc,
            q1: {
              key: quartersDates.q1,
              count: acc.q1.count + 1,
              builds: [...acc.q1.builds, { day: currentDate, ...rest }],
            },
          };
        } else if (
          currentDate >= quartersDates.q2.start &&
          currentDate <= quartersDates.q2.end
        ) {
          result = {
            ...acc,
            q2: {
              key: quartersDates.q2,
              count: acc.q2.count + 1,
              builds: [...acc.q2.builds, { day: currentDate, ...rest }],
            },
          };
        } else if (
          currentDate > quartersDates.q3.start &&
          currentDate <= quartersDates.q3.end
        ) {
          result = {
            ...acc,
            q3: {
              key: quartersDates.q3,
              count: acc.q3.count + 1,
              builds: [...acc.q3.builds, { day: currentDate, ...rest }],
            },
          };
        } else {
          result = {
            ...acc,
            q4: {
              key: quartersDates.q4,
              count: acc.q4.count + 1,
              builds: [...acc.q4.builds, { day: currentDate, ...rest }],
            },
          };
        }

        return result;
      },
      {
        q1: { count: 0, builds: [] },
        q2: { count: 0, builds: [] },
        q3: { count: 0, builds: [] },
        q4: { count: 0, builds: [] },
      }
    ),
  target: quartersNewBuildings,
});
