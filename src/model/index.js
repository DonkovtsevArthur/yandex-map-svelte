import { createStore, createEvent, createEffect, combine } from 'effector';
import debounce from 'just-debounce-it';

export const data = createStore([]);
export const minAndMaxDates = createStore({
  minDate: null,
  maxDate: null,
});
export const selectedValue = createStore(0);
export const dataToShow = createStore([]);

export const sliderFillPercentage = combine(
  minAndMaxDates,
  selectedValue,
  ({ minDate, maxDate }, selectedValue) => {
    if (!minDate || !maxDate) return 0;

    return (100 * (selectedValue - minDate)) / (maxDate - minDate);
  }
);

export const dataReceived = createEvent();
export const valueChanged = createEvent();
export const dataChanged = createEvent();
export const debouncedChangeData = debounce(dataChanged, 300);

export const dataChangedFx = createEffect({ handler: (data) => data });
