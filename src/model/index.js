import { createStore, createEvent } from 'effector';

//стор со всеми объектами для карты
export const data = createStore([]);

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

export const dataReceived = createEvent();
export const dataChanged = createEvent();
export const viewModeChanged = createEvent();
