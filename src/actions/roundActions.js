import { PlayerActions, PlayPhases, RoundPhases, GamePhases } from "../constants";
import dishwasherResolver from "./dishwasherActions";

const diceTemplates = [
  ["red", "red", "blue", "yellow", "white", "purple"],
  ["red", "blue", "yellow", "yellow", "white", "purple"],
  ["red", "blue", "blue", "yellow", "white", "purple"],
  ["red", "blue", "yellow", "purple", "white", "white"],
  ["red", "blue", "yellow", "white", "purple", "purple"],
  ["red", "blue", "yellow", "white", "purple", "wild"],
];

function roundSetup(state) {
  const dice = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6) + 1);
  dice.forEach((die, index) => {
    dice[index] = diceTemplates[index][die - 1];
  });

  const resources = dice.map((die) => {
    return { color: die, status: "available" };
  });

  const roundTimers = [...state.roundTimers, { start: new Date() }];

  return {
    ...state,
    dice,
    resources,
    roundPhase: RoundPhases.PLAY,
    playPhase: PlayPhases.SELECT_RESOURCE,
    gamePhase: GamePhases.IN_PROGRESS,
    roundTimers,
  };
}

function finishRotating(state) {
  return roundTearDown({
    ...state,
  });
}

// should remove the dish from the available plates
// should add the dish to the dishwasher in the right spot
// should execute the bonus action - the bonus action should be responsible for calling roundTearDown
function loadDishwasher(state, squareIndex) {
  const dishwasher = [...state.dishwasher];
  dishwasher[squareIndex] = {
    ...dishwasher[squareIndex],
    plate: state.selectedPlate,
    activated: true,
  };

  const availablePlates = [...(state.availablePlates || [])];
  availablePlates.splice(availablePlates.indexOf(state.selectedPlate), 1);
  return dishwasherResolver(
    {
      ...state,
      availablePlates,
      selectedPlate: null,
      dishwasher,
    },
    dishwasher[squareIndex].action
  );
}

function beginRoundTearDown(state) {
  return roundTearDown({
    ...state,
    availablePlates: [...getDirtyPlates(state)],
  });
}

function roundTearDown(state) {
  const finishedCustomers = state.customers?.filter((customer) => !!customer && customer.status === "eating") || [];
  const customers = removeFinishedCustomers(state);

  const roundTimers = [...state.roundTimers];
  roundTimers[state.round - 1].end = new Date();

  if (state.availablePlates.length > 0) {
    return {
      ...state,
      playPhase: PlayPhases.SELECT_PLATE,
      currentAction: PlayerActions.LOAD_DISHWASHER,
    };
  }

  if (parseInt(state.round) === parseInt(state.settings.totalRounds)) {
    return endGameState(state);
  }

  tickDownCustomers(customers);

  const coldCounterItems = moveHotFoodToCold(state);

  let newState = MoveCars(state);

  newState = addIncomingCarsToDriveThru(state);

  return roundSetup({
    ...newState,
    stars: getStars(newState),
    servedCustomers: [...state.servedCustomers, ...finishedCustomers],
    customers,
    coldCounterItems,
    hotCounterItems: [...newState.grillItems],
    grillItems: [],
    roundPhase: RoundPhases.SETUP,
    playPhase: PlayPhases.SELECT_RESOURCE,
    availableActions: [],
    selectedCustomerIndex: null,
    selectedResource: null,
    currentAction: null,
    round: newState.round + 1,
    roundTimers,
  });
}

function MoveCars(state) {}

function addIncomingCarsToDriveThru(state) {
  const cars = [...state.cars, ...state.incomingCars];
  return {
    ...state,
    incomingCars: [],
    cars,
  };
}

function endGameState(state) {
  return {
    ...state,
    stars: getStars(state),
    roundPhase: null,
    gamePhase: GamePhases.FINISHED,
    playPhase: null,
    availableActions: [],
    selectedCustomerIndex: null,
    selectedResource: null,
    currentAction: null,
    leftOverCustomers: [...state.customers.filter((customer) => !!customer)],
  };
}

function moveHotFoodToCold(state) {
  const coldCounterItems = [...state.coldCounterItems];
  state.hotCounterItems.forEach((item) => {
    coldCounterItems.push(item);
  });
  return coldCounterItems;
}

function getDirtyPlates(state) {
  return state.customers
    .filter((customer) => !!customer && customer.status === "eating")
    .map((customer) => customer.order);
}

function tickDownCustomers(customers) {
  customers.forEach((customer) => {
    if (!!customer && customer.pointValue > 1) customer.pointValue -= 1;
  });
}

function removeFinishedCustomers(state) {
  // add the customer orders to available plates
  return [...state.customers.map((customer) => (customer?.status === "eating" ? null : customer))];
}

function getStars(state) {
  return state.customers.reduce((acc, customer) => {
    if (customer?.status === "eating") {
      return acc + customer.pointValue;
    }
    return acc;
  }, state.stars);
}

export { roundSetup, beginRoundTearDown, loadDishwasher, finishRotating, roundTearDown };
