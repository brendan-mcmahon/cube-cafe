const managerActions = {
  empty,
  wild,
};

function empty(state) {
  return state;
}

function wild(state) {
  return {
    ...state,
    resources: [
      ...state.resources,
      {
        color: "wild",
        status: "available",
      },
    ],
  };
}

function resolveManagerActions(state) {
  if (state.currentValue === 0) return state;

  const max = state.settings.managerTrack.length - 1;
  const target = getTarget(state, max);
  let workingState = { ...state };
  let current = state.managerPosition;

  do {
    current = current === max ? 0 : current + 1;
    const action = state.settings.managerTrack[current];
    if (managerActions[action]) workingState = managerActions[action](workingState);
  } while (current !== target);
  return {
    ...workingState,
    managerPosition: target,
  };
}

function getTarget(state, max) {
  const newPosition = state.managerPosition + state.currentValue;
  return newPosition > max ? newPosition - (max + 1) : newPosition;
}

export default resolveManagerActions;

// have the functions defined. each function can take in the state + the current manager position
// have a function that will resolve the action based on the name of the manager action
