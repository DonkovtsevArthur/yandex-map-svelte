import { createStore, sample } from 'effector';
import { quartersDates } from '../../../utils/quarters-dates';
import { valueChanged } from './events';
import { data, dataToShow } from '../../../model/index';
import { setSelectedValues, setFilterData } from './helpers';

//выбранная дата (по факту последний день того или иного квартала, либо начало года если это initial значение)
const selectedValue = createStore([]);

selectedValue.on(valueChanged, setSelectedValues);

// далее идут 4 стора флаги говорящие входит ли тот или иной квартал в выбранный период времени
const isFirstQuarter = selectedValue.map((state) =>
  state.some(({ start }) => start === quartersDates.q1.start)
);
const isSecondQuarter = selectedValue.map((state) =>
  state.some(({ start }) => start === quartersDates.q2.start)
);
const isThirdQuarter = selectedValue.map((state) =>
  state.some(({ start }) => start === quartersDates.q3.start)
);
const isFourthQuarter = selectedValue.map((state) =>
  state.some(({ start }) => start === quartersDates.q4.start)
);

// изменяем данные для отображения в зависимости от выбранного периода
sample({
  source: { data, selectedValue },
  clock: selectedValue,
  fn: setFilterData,
  target: dataToShow,
});

// изменяем данные для отображения в зависимости от исходного периода
sample({
  source: { data, selectedValue },
  clock: data,
  fn: setFilterData,
  target: dataToShow,
});

export {
  selectedValue,
  isFirstQuarter,
  isSecondQuarter,
  isThirdQuarter,
  isFourthQuarter,
};
