function updateSettings(state, newSettings) {
  const newCustomers = handleTableCountChange(state, newSettings);

  return {
    ...state,
    settings: newSettings,
    customers: [...newCustomers],
  };
}

function handleTableCountChange(state, newSettings) {
  let newCustomers = [...state.customers];
  if (state.settings.tableCount !== newSettings.tableCount) {
    const difference = newSettings.tableCount - state.settings.tableCount;

    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        newCustomers.push(null);
      }
    } else {
      for (let i = 0; i < Math.abs(difference); i++) {
        newCustomers.pop();
      }
    }
  }
  return newCustomers;
}

export { updateSettings };
