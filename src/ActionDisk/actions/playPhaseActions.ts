import actionFilters from "./actionFilters";
import { CustomerStatus, DishwasherAction, ResourceAction, PlayPhase, ManualAction, ResourceStatus, RoundPhase } from "../../constants";
import resolveManagerActions from "./managerActions";
import { roundTearDown } from "./roundActions";
import { Customer, Game, Resource } from "../../game";
import { stat } from "fs";

function selectResource(state: Game, resource: Resource, resourceIndex: number): Game {
  const index = state.actionDisk.colors.indexOf(resource.color);
  let availableActions: ResourceAction[] = resource.color === "wild" ? [...state.actionDisk.actions] : [state.actionDisk.actions[index]];

  availableActions = actionFilters.filter(state, availableActions);

  return {
    ...state,
    selectedResource: resource,
    selectedResourceIndex: resourceIndex,
    availableActions: [...availableActions],
    currentValue: index,
    playPhase: PlayPhase.SELECT_ACTION,
  };
}

function seatCustomer(state: Game): Game {
  const newCustomer = {
    order: null,
    pointValue: state.settings.startingMood,
    status: CustomerStatus.WAITING,
  };

  const firstEmptyIndex = state.customers.findIndex((customer) => !customer);
  const newCustomers = [...state.customers];
  newCustomers[firstEmptyIndex] = newCustomer;

  return resetAction({
    ...state,
    customers: newCustomers,
  });
}

function selectCustomer(state: Game, customerIndex: number): Game {
  console.log('selecting customer: ', state.customers[customerIndex])
  let resolve = null;
  switch (state.currentAction) {
    case ResourceAction.TAKE_ORDER:
      resolve = drawPlates;
      break;
    case ResourceAction.SERVE:
      resolve = chooseFoodToServe;
      break;
    case ResourceAction.REFILL:
      resolve = (s: Game, i: number) => refillCustomer(s, i);
      break;
    case DishwasherAction.INCREASE_ONE_CUSTOMER:
      resolve = (s: Game, i: number) => buyCustomerADrink(s, i);
      break;
  }

  return resolve ? resolve(state, customerIndex) : resetAction(state);
}

function clearHistory(state: Game): Game {
  return {
    ...state,
    actionHistory: [],
    history: null,
  };
}

function refillCustomer(state: Game, customerIndex: number): Game {
  if (customerIndex >= 0 && customerIndex < state.customers.length) {
    const customer = state.customers[customerIndex];

    if (customer) {
      const newCustomers = [...state.customers];
      newCustomers[customerIndex] = {...customer, pointValue: Math.min(5, customer.pointValue + 1)};

      return resetAction({
        ...state,
        customers: newCustomers,
      });
    }
  }
  return state;
}


function buyCustomerADrink(state: Game, customerIndex: number): Game {
  if (customerIndex >= 0 && customerIndex < state.customers.length) {
    const customer = state.customers[customerIndex];

    if (customer) {
      const newCustomers = [...state.customers];
      newCustomers[customerIndex] = {...customer, pointValue: Math.min(5, customer.pointValue + 2)};

      return roundTearDown({
        ...state,
        customers: newCustomers,
      });
    }
  }
  return state;
}


function chooseFoodToServe(state: Game, customerIndex: number): Game {
  return {
    ...state,
    playPhase: PlayPhase.SELECT_FOOD,
    currentAction: ResourceAction.SERVE,
    selectedCustomerIndex: customerIndex,
  };
}

function selectFood(state: Game, foodIndex: number, counter: string): Game {
  if (state.selectedCustomerIndex === null) {
    return state;
  }
  
  if (!state.customers[state.selectedCustomerIndex]) {
    return state;
  }

  let newHotCounter = [...state.hotCounterItems];
  let newColdCounter = [...state.coldCounterItems];
  const selectedCustomer: Customer = { ...state.customers[state.selectedCustomerIndex]! };
  const statistics = { ...state.statistics };

  if (counter === "hot") {
    newHotCounter.splice(foodIndex, 1);
    selectedCustomer.pointValue = Math.min(selectedCustomer.pointValue + state.settings.hotFoodReward, 5);
    statistics.hotFoodServed++;
  } else {
    newColdCounter.splice(foodIndex, 1);
    selectedCustomer.pointValue += state.settings.coldFoodPenalty;
    statistics.coldFoodServed++;
  }

  selectedCustomer.status = CustomerStatus.EATING;

  const newCustomers = [...state.customers];
  newCustomers[state.selectedCustomerIndex] = selectedCustomer;

  return resetAction({
    ...state,
    hotCounterItems: newHotCounter,
    coldCounterItems: newColdCounter,
    customers: newCustomers,
    playPhase: PlayPhase.SELECT_CUSTOMER,
    statistics,
  });
}

function customerExists(customer: Customer | null | undefined): customer is Customer {
  return !!customer;
}

function drawPlates(state: Game, customerIndex: number): Game {
  const newPlateBag = [...state.plateBag];
  newPlateBag.sort(() => Math.random() - 0.5);
  const newAvailablePlates: string[] = [];

  for (let i = 0; i < state.settings.numPlates; i++) {
    const plate = newPlateBag.pop();
    if (!!plate) {
      newAvailablePlates.push(plate);
    }
  }

  if (newAvailablePlates.length === 1) {
    return forcePlate(state, newPlateBag, customerIndex);
  }

  return clearHistory({
    ...state,
    availablePlates: newAvailablePlates,
    plateBag: newPlateBag,
    playPhase: PlayPhase.SELECT_PLATE,
    selectedCustomerIndex: customerIndex,
  });
}


function forcePlate(state: Game, newPlateBag: string[], customerIndex: number) {
  const customers = [...state.customers];
  const newPlate = newPlateBag.pop();
  const customer = customers[customerIndex];
  if (customerExists(customer) && !!newPlate) {
    customer.order = newPlate;
  }
  return clearHistory(
    resetAction({
      ...state,
      customers: customers,
    })
  );
}

function selectPlate(state: Game, plate: string): Game {
  switch (state.currentAction) {
    case ResourceAction.TAKE_ORDER:
      return resetAction(giveCustomerPlate(state, plate));
    case ManualAction.LOAD_DISHWASHER:
      return moveToDishwasherSquareSelection(state, plate);
    default:
      return state;
  }
}

function moveToDishwasherSquareSelection(state: Game, plate: string): Game {
  return {
    ...state,
    selectedPlate: plate,
    playPhase: PlayPhase.SELECT_DISHWASHER_SQUARE,
  };
}

function takeOrder(state: Game): Game {
  return {
    ...state,
    currentAction: ResourceAction.TAKE_ORDER,
    playPhase: PlayPhase.SELECT_CUSTOMER,
  };
}

function cook(state: Game): Game {
  const color = state.selectedResource?.color === "wild" ? state.actionDisk.colors[2] : state.selectedResource?.color;

  const grillItems = !!color ?
    [...state.grillItems, color] :
    [...state.grillItems];

  return resetAction({
    ...state,
    grillItems,
    statistics: {
      ...state.statistics,
      foodCooked: state.statistics.foodCooked + 1,
    },
  });
}

function serve(state: Game): Game {
  return {
    ...state,
    currentAction: ResourceAction.SERVE,
    playPhase: PlayPhase.SELECT_CUSTOMER,
  };
}

function resetAction(state: Game): Game {
  const lastResource = state.resources.filter((resource) => resource.status === ResourceStatus.AVAILABLE).length === 1;

  const resources = exhaustResource(state);

  const newState = {
    ...state,
    playPhase: lastResource ? PlayPhase.NONE : PlayPhase.SELECT_RESOURCE,
    roundPhase: lastResource ? RoundPhase.RESOLVE : state.roundPhase,
    availableActions: [],
    selectedCustomerIndex: null,
    resources,
    selectedResourceIndex: null,
    selectedResource: null,
    currentValue: null,
    currentAction: null,
  };

  return lastResource ? clearHistory(newState) : newState;
}

function refill(state: Game): Game {
  return {
    ...state,
    currentAction: ResourceAction.REFILL,
    playPhase: PlayPhase.SELECT_CUSTOMER,
    statistics: {
      ...state.statistics,
      refillCount: state.statistics.refillCount + 1,
    },
  };
}

function moveManager(state: Game): Game {
  return resetAction(resolveManagerActions(state));
}

function exhaustResource(state: Game): Resource[] {
  if (state.selectedResourceIndex === null) {
    return [...state.resources];
  }
  const resources = [...state.resources];
  resources[state.selectedResourceIndex] = {
    ...resources[state.selectedResourceIndex],
    status: ResourceStatus.EXHAUSTED,
  };
  return resources;
}

function rotate(state: Game, direction: string): Game {
  const colors = [...state.actionDisk.colors];

  if (direction === "counter-clockwise") {
    const firstColor = colors.shift();
    colors.push(firstColor!);
  } else if (direction === "clockwise") {
    const lastColor = colors.pop();
    colors.unshift(lastColor!);
  }

  if (state.playPhase === PlayPhase.ROTATE_FREELY) {
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
    statistics: {
      ...state.statistics,
      rotationCount: state.statistics.rotationCount + 1,
    },
    actionDisk: {
      ...state.actionDisk,
      rotation: state.actionDisk.rotation + (direction === "counter-clockwise" ? -72 : 72),
      colors: colors,
    },
  });
}

function giveCustomerPlate(state: Game, plate: string): Game {
  if (state.selectedCustomerIndex === null) {
    throw new Error("No customer selected");
  }
  const customers = [...state.customers];
  const customer = customers[state.selectedCustomerIndex];
  if (!customer) {
    throw new Error(`No customer at index ${state.selectedCustomerIndex}`);
  }
  customer.order = plate;

  const availablePlates = [...state.availablePlates];
  availablePlates.splice(availablePlates.indexOf(plate), 1);

  const plateBag = [...state.plateBag, ...availablePlates];
  return {
    ...state,
    customers: customers,
    availablePlates: availablePlates,
    plateBag: plateBag,
  };
}

// function giveCustomerPlate(state: Game, plate: string): Game {
//   if (state.selectedCustomerIndex === null) {
//     throw new Error("No customer selected");
//   }

//   const customers = [...state.customers];
//   const selectedCustomer = customers[state.selectedCustomerIndex];

//   if (!selectedCustomer) {
//     throw new Error(`No customer at index ${state.selectedCustomerIndex}`);
//   }

//   selectedCustomer.order = plate;

//   const availablePlates = [...state.availablePlates];
//   const plateIndex = availablePlates.indexOf(plate);
  
//   if (plateIndex === -1) {
//     throw new Error(`Plate "${plate}" not found in available plates`);
//   }
  
//   availablePlates.splice(plateIndex, 1);

//   const plateBag = [...state.plateBag, ...availablePlates];

//   return {
//     ...state,
//     customers: customers,
//     availablePlates: availablePlates,
//     plateBag: plateBag,
//   };
// }



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