import { createStore, createEvent, createEffect } from 'effector';
import { quartersDates } from '../utils/quarters-dates';

//стор со всеми объектами для карты
export const data = createStore([]);
//выбранная дата (по факту последний день того или иного квартала, либо начало года если это initial значение)
export const selectedValue = createStore(quartersDates.startOfYear);
//стор только с теми объектами которые предназначены для отображения на карте
export const dataToShow = createStore([]);
//общее количество жилых комплексов в предоставленном датасете
export const buildingsCount = data.map((state) => state.length);
//стор хранящий текущий вариант отображения карты (полигоны или пины)
export const isPolygonsMode = createStore(false);
// количество жилых комплексов которые будут сданы в тот или иной квартал (например: q1 - 1й квартал)
export const quartersNewBuildings = createStore({
  q1: 0,
  q2: 0,
  q3: 0,
  q4: 0,
});
// далее идут 4 стора флаги говорящие входит ли тот или иной квартал в выбранный период времени
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
export const viewModeChanged = createEvent();
