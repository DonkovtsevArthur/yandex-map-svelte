import { createStore, createEvent, createEffect } from 'effector';
import { quartersDates } from '../utils/quarters-dates';

export const data = createStore([]);

export const selectedValue = createStore(quartersDates.startOfYear);
export const dataToShow = createStore([]);
export const buildingsCount = data.map((state) => state.length);
export const quartersNewBuildings = createStore({
  q1: 0,
  q2: 0,
  q3: 0,
  q4: 0,
});
export const isFirstQuarter = selectedValue.map(
  (state) => state > quartersDates.startOfYear
);
export const isSecondQuarter = selectedValue.map(
  (state) => state > quartersDates.q1
);
export const isThirdQuarter = selectedValue.map(
  (state) => state > quartersDates.q2
);
export const isFourthQuarter = selectedValue.map(
  (state) => state > quartersDates.q3
);

export const dataReceived = createEvent();
export const valueChanged = createEvent();
export const dataChanged = createEvent();

export const dataChangedFx = createEffect({ handler: (data) => data });
