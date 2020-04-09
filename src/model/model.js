import dayjs from 'dayjs';
import { sample } from 'effector';
import { quartersDates } from '../utils/quarters-dates';

import {
  data,
  dataReceived,
  selectedValue,
  dataToShow,
  valueChanged,
  quartersNewBuildings,
  dataChanged,
} from './index';

const prependData = (data) =>
  data
    .filter(({ coordinates }) => coordinates && coordinates.length > 5)
    .map(({ day, coordinates, ...rest }) => {
      const enhanced = {
        ...rest,
        day: dayjs(day).valueOf(),
        coordinates: JSON.parse(coordinates),
      };

      return enhanced;
    });

data.on(dataReceived.map(prependData), (_, data) => data);
selectedValue.on(valueChanged, (_, newValue) => newValue);
dataToShow.on(dataChanged, (_, data) => data);

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

sample({
  source: data,
  clock: selectedValue,
  fn: (data, selectedValue) => data.filter(({ day }) => day <= selectedValue),
  target: dataToShow,
});
