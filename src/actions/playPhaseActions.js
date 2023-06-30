import actionFilters from "./actionFilters";
import { PlayPhases, PlayerActions, RoundPhases } from "../constants";
import resolveManagerActions from "./managerActions";
import { roundTearDown } from "./roundActions";

function selectResource(state, resource, resourceIndex) {
  const index = state.actionDisk.colors.indexOf(resource.color);
  let availableActions = resource.color === "wild" ? [...state.actionDisk.actions] : [state.actionDisk.actions[index]];

  availableActions = actionFilters.filter(state, availableActions);

  return {
    ...state,
    selectedResource: resource,
    selectedResourceIndex: resourceIndex,
    availableActions: [...availableActions],
    currentValue: index,
    playPhase: PlayPhases.SELECT_ACTION,
  };
}

function seatCustomer(state) {
  const newCustomer = {
    order: null,
    pointValue: state.settings.startingMood,
    status: "waiting",
  };

  const firstEmptyIndex = state.customers.findIndex((customer) => !customer);
  const newCustomers = [...state.customers];
  newCustomers[firstEmptyIndex] = newCustomer;

  return resetAction({
    ...state,
    customers: newCustomers,
  });
}

function selectCustomer(state, customerIndex) {
  let resolve = null;
  switch (state.currentAction) {
    case PlayerActions.TAKE_ORDER:
      resolve = drawPlates;
      break;
    case PlayerActions.SERVE:
      resolve = chooseFoodToServe;
      break;
    case PlayerActions.REFILL:
      resolve = (s, i) => refillCustomer(s, i);
      break;
    case PlayerActions.INCREASE_ONE_CUSTOMER:
      resolve = (s, i) => buyCustomerADrink(s, i);
      break;
  }

  return resolve ? resolve(state, customerIndex) : resetAction(state);
}

function clearHistory(state) {
  return {
    ...state,
    actionHistory: [],
    history: [],
  };
}

function refillCustomer(state, customerIndex) {
  const newPointValue = state.customers[customerIndex].pointValue + 1;
  const newCustomers = [...state.customers];
  newCustomers[customerIndex].pointValue = newPointValue;

  return resetAction({
    ...state,
    customers: [...state.customers],
  });
}

function buyCustomerADrink(state, customerIndex) {
  const newPointValue = state.customers[customerIndex].pointValue + 2;
  const newCustomers = [...state.customers];
  newCustomers[customerIndex].pointValue = newPointValue;

  return roundTearDown({
    ...state,
    customers: [...state.customers],
  });
}

function chooseFoodToServe(state, customerIndex) {
  return {
    ...state,
    playPhase: PlayPhases.SELECT_FOOD,
    currentAction: PlayerActions.SERVE,
    selectedCustomerIndex: customerIndex,
  };
}

function selectFood(state, foodIndex, counter) {
  let newHotCounter = [...state.hotCounterItems];
  let newColdCounter = [...state.coldCounterItems];
  if (counter === "hot") {
    newHotCounter.splice(foodIndex, 1);
    if (state.customers[state.selectedCustomerIndex].pointValue + parseInt(state.settings.hotFoodReward) > 5) {
      state.customers[state.selectedCustomerIndex].pointValue = 5;
    } else {
      state.customers[state.selectedCustomerIndex].pointValue += parseInt(state.settings.hotFoodReward);
    }
  } else {
    newColdCounter.splice(foodIndex, 1);
    state.customers[state.selectedCustomerIndex].pointValue += parseInt(state.settings.coldFoodPenalty);
  }

  state.customers[state.selectedCustomerIndex].status = "eating";

  return resetAction({
    ...state,
    hotCounterItems: newHotCounter,
    coldCounterItems: newColdCounter,
    customers: [...state.customers],
    playPhase: PlayPhases.SELECT_CUSTOMER,
  });
}

function drawPlates(state, customerIndex) {
  const newPlateBag = [...state.plateBag];
  newPlateBag.sort(() => Math.random() - 0.5);
  const newAvailablePlates = [];

  for (let i = 0; i < state.settings.numPlates; i++) {
    const plate = newPlateBag.pop();
    newAvailablePlates.push(plate);
  }

  if (newAvailablePlates.length === 1) {
    const customers = [...state.customers];
    customers[customerIndex].order = newPlateBag.pop();

    return clearHistory(
      resetAction({
        ...state,
        customers: customers,
      })
    );
  }
  return clearHistory({
    ...state,
    availablePlates: newAvailablePlates,
    plateBag: newPlateBag,
    playPhase: PlayPhases.SELECT_PLATE,
    selectedCustomerIndex: customerIndex,
  });
}

function selectPlate(state, plate) {
  switch (state.currentAction) {
    case PlayerActions.TAKE_ORDER:
      return giveCustomerPlate(state, plate);
    case PlayerActions.LOAD_DISHWASHER:
      return moveToDishwasherSquareSelection(state, plate);
  }
}

function moveToDishwasherSquareSelection(state, plate) {
  return {
    ...state,
    selectedPlate: plate,
    playPhase: PlayPhases.SELECT_DISHWASHER_SQUARE,
  };
}

function takeOrder(state) {
  return {
    ...state,
    currentAction: PlayerActions.TAKE_ORDER,
    playPhase: PlayPhases.SELECT_CUSTOMER,
  };
}

function cook(state) {
  const color = state.selectedResource.color === "wild" ? state.actionDisk.colors[2] : state.selectedResource.color;

  return resetAction({
    ...state,
    grillItems: [...state.grillItems, color],
  });
}

function serve(state) {
  return {
    ...state,
    currentAction: PlayerActions.SERVE,
    playPhase: PlayPhases.SELECT_CUSTOMER,
  };
}

function resetAction(state) {
  const lastResource = state.resources.filter((resource) => resource.status === "available").length === 1;

  const newState = {
    ...state,
    playPhase: lastResource ? null : PlayPhases.SELECT_RESOURCE,
    roundPhase: lastResource ? RoundPhases.RESOLVE : state.roundPhase,
    availableActions: [],
    selectedCustomerIndex: null,
    resources: exhaustResource(state),
    selectedResourceIndex: null,
    selectedResource: null,
    currentValue: null,
    currentAction: null,
  };

  return lastResource ? clearHistory(newState) : newState;
}

function refill(state) {
  return {
    ...state,
    currentAction: PlayerActions.REFILL,
    playPhase: PlayPhases.SELECT_CUSTOMER,
  };
}

function moveManager(state) {
  return resetAction(resolveManagerActions(state));
}

function exhaustResource(state) {
  const resources = [...state.resources];
  resources[state.selectedResourceIndex].status = "exhausted";
  return resources;
}

function rotate(state, direction) {
  const colors = [...state.actionDisk.colors];

  if (direction === "counter-clockwise") {
    const firstColor = colors.shift();
    colors.push(firstColor);
  } else if (direction === "clockwise") {
    const lastColor = colors.pop();
    colors.unshift(lastColor);
  }

  if (state.playPhase === PlayPhases.ROTATE_FREELY) {
    return {
      ...state,
      actionDisk: {
        ...state.actionDisk,
        rotation: state.actionDisk.rotation + (direction === "counter-clockwise" ? -72 : 72),
        colors: colors,
      },
    };
  }

  return resetAction({
    ...state,
    rotationCount: state.rotationCount + 1,
    actionDisk: {
      ...state.actionDisk,
      rotation: state.actionDisk.rotation + (direction === "counter-clockwise" ? -72 : 72),
      colors: colors,
    },
  });
}

export default {
  selectResource,
  selectCustomer,
  selectPlate,
  selectFood,
  seatCustomer,
  moveManager,
  takeOrder,
  cook,
  serve,
  refill,
  rotate,
};
function giveCustomerPlate(state, plate) {
  const customers = [...state.customers];
  customers[state.selectedCustomerIndex].order = plate;

  // remove the selected plate from the available plates
  const availablePlates = [...state.availablePlates];
  availablePlates.splice(availablePlates.indexOf(plate), 1);

  // put the unselected plates back in the bag
  const plateBag = [...state.plateBag, ...availablePlates];
  return {
    ...state,
    customers: customers,
    availablePlates: availablePlates,
    plateBag: plateBag,
  };
}
