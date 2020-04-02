import { createStore, createEvent } from 'effector';

export const data = createStore([]);
export const minAndMaxDates = createStore({
  minDate: null,
  maxDate: null,
});
export const selectedValue = createStore(0);
export const dataToShow = createStore([]);

export const dataReceived = createEvent();
export const valueChanged = createEvent();
