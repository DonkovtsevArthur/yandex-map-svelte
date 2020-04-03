import dayjs from 'dayjs';
import { sample } from 'effector';

import {
  data,
  minAndMaxDates,
  dataReceived,
  selectedValue,
  dataToShow,
  valueChanged,
  debouncedChangeData,
  dataChangedFx,
  dataChanged,
} from './index';

const prependData = (data) =>
  data
    .filter(({ coordinates }) => coordinates && coordinates.length > 5)
    .map(({ day, coordinates, ...rest }) => {
      const enhanced = {
        ...rest,
        day: dayjs(day).unix(),
        coordinates: JSON.parse(coordinates),
      };

      return enhanced;
    });

data.on(dataReceived.map(prependData), (_, data) => data);

selectedValue
  .on(minAndMaxDates, (_, { minDate }) => minDate)
  .on(
    valueChanged.map((e) => Number(e.target.value)),
    (_, newValue) => newValue
  );
dataToShow.on(dataChanged, (_, data) => data);

dataChangedFx.watch(debouncedChangeData);

sample({
  source: data,
  clock: data,
  fn: (data) => {
    const dates = data.map((el) => el.day);

    const isDatesEmpty = dates.length === 0;

    const minDate = !isDatesEmpty ? Math.min(...dates) : null;
    const maxDate = !isDatesEmpty ? Math.max(...dates) : null;

    return {
      minDate,
      maxDate,
    };
  },
  target: minAndMaxDates,
});

sample({
  source: data,
  clock: selectedValue,
  fn: (data, selectedValue) => data.filter(({ day }) => day <= selectedValue),
  target: dataChangedFx,
});
