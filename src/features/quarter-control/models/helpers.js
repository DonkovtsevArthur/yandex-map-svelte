const setSelectedValues = (state, newValue) => {
  const isChecked = state.some(({ start }) => start === newValue.start);
  const newState = isChecked
    ? state.filter(({ start }) => start !== newValue.start)
    : [...state, newValue];
  return [...newState];
};

const setFilterData = ({ quartersNewBuildings = {}, selectedValue }) => {
  const d = Object.values(quartersNewBuildings);

  let newData = [];

  if (selectedValue.length) {
    d.forEach(({ key, builds }) => {
      if (
        selectedValue.some(({ start, end }) => {
          return key.start >= start && key.end <= end;
        })
      ) {
        newData.push(...builds);
      }
    });
  } else {
    d.forEach(({ builds }) => {
      newData.push(...builds);
    });
  }

  return newData;
};

export { setFilterData, setSelectedValues };
