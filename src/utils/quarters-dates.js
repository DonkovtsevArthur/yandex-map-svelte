import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const setMonthYear = (time) => dayjs(time).locale('ru').format('MMMM YYYY');

const setDataQuarters = (start, end) => ({
  start: dayjs(start).valueOf(),
  end: dayjs(end).valueOf(),
});

const getTimeNow = () => setDataQuarters();
const quartersDates = {
  q1: setDataQuarters('2020-01-01', '2020-03-31'),
  q2: setDataQuarters('2020-04-01', '2020-06-30'),
  q3: setDataQuarters('2020-07-01', '2020-09-30'),
  q4: setDataQuarters('2020-10-01', '2020-12-31'),
};

export { quartersDates, getTimeNow, setMonthYear };
