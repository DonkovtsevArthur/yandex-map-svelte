const setSelectedValues = (state, newValue) => {
  const isChecked = state.some(({ start }) => start === newValue.start);
  const newState = isChecked
    ? state.filter(({ start }) => start !== newValue.start)
    : [...state, newValue];
  return [...newState];
};

const setFilterData = ({ data, selectedValue }) => {
  console.log('setFilterData -> data', data);
  console.log('setFilterData -> selectedValue', selectedValue);
  const newData = data.filter(({ day }) => {
    return selectedValue.some(({ start, end }) => {
      return day >= start && day <= end;
    });
  });

  return newData.length ? newData : data;
};

export { setFilterData, setSelectedValues };
