import { ManualAction, PlayPhase, RoundPhase, GamePhase, ResourceStatus } from "../../constants";
import dishwasherResolver from "./dishwasherActions";
import { CustomerStatus } from "../../constants";
import { Customer, Game, Resource, RoundTimer } from "../../game";
import storage from "../../storage";
import { generateRestaurantName } from "../../nameGenerator";
import playPhaseActions from "./playPhaseActions";
import { colors } from "../../colors";

function gameSetup(state: Game) {
  const gameName = generateRestaurantName();

  const rotateCount = Math.floor(Math.random() * 6);
  let newState = state;
  for (let i = 0; i < rotateCount; i++) {
    newState = playPhaseActions.rotate(newState, "clockwise");
  }

  return roundSetup({
    ...newState,
    actionDisk: {
      ...newState.actionDisk,

    },
    settings: {
      ...newState.settings,
      gameName,
    },
    upgrades: {
      ...newState.upgrades,
      driveThru: newState.upgrades.driveThru || state.round >= (state.settings.driveThruRound - 1),
    }
  });
}

function roundSetup(state: Game): Game {
  const dice = rollDice(state);

  const color = colors[Math.floor(Math.random() * (colors.length - 1))];

  const cars = [...state.cars];
  if (state.upgrades.driveThru || state.settings.driveThruRound <= state.round)
    cars[0] = { color, status: 'waiting'};

  return {
    ...state,
    cars,
    dice,
    resources: pullResources(dice),
    roundPhase: RoundPhase.PLAY,
    playPhase: PlayPhase.SELECT_RESOURCE,
    gamePhase: GamePhase.IN_PROGRESS,
    statistics: {
      ...state.statistics,
      roundTimers: addRoundTimer(state)
    },
  };
}

function save(state: Game): Game {
  storage.saveGame(state);
  return state;
}

function addRoundTimer(state: Game): RoundTimer[] {
  return [...state.statistics.roundTimers, { start: new Date(), end: null }];
}

function pullResources(dice: string[]): Resource[] {
  return dice.map((die) => {
    return { color: die, status: ResourceStatus.AVAILABLE };
  });
}

function rollDice(state: Game): string[] {
  const diceCount = state.settings.dice.length;
  return Array
    .from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1)
    .map((die, index) => state.settings.dice[index][die - 1]);
}

function finishRotating(state: Game): Game {
  return roundTearDown({
    ...state,
  });
}

function loadDishwasher(state: Game, squareIndex: number): Game {
  if (!state.selectedPlate) {
    throw new Error("No plate selected");
  }

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

function beginRoundTearDown(state: Game): Game {
  return roundTearDown({
    ...state,
    availablePlates: [...getDirtyPlates(state)],
  });
}

function isEatingCustomer(customer: Customer | null | undefined): customer is Customer {
  return customer !== null && customer !== undefined && customer.status === CustomerStatus.EATING;
}

function roundTearDown(state: Game): Game {
  const roundTimers = stopTimer(state);
  const servedCustomers = [...state.statistics.servedCustomers, ...state.customers.filter(isEatingCustomer)]; 
  
  if (state.availablePlates.length > 0)
    return loadDishwasherState(state);

  if (state.round === state.settings.totalRounds)
    return endGameState(state);

  let customers = removeFinishedCustomers(state);
  customers = tickDownCustomers(customers);
  let hotCounterItems = state.upgrades.heatlamp
  ? [...state.grillItems, ...state.hotCounterItems]
  : [...state.grillItems];

  const cars = [...state.cars];
  cars[1] = cars[0];
  cars[0] = null;

  return roundSetup(save({
    ...state,
    stars: getStars(state),
    cars,
    statistics: {
      ...state.statistics,
      servedCustomers,
      roundTimers,
    },
    customers,
    coldCounterItems: moveHotFoodToCold(state),
    hotCounterItems: hotCounterItems,
    grillItems: [],
    roundPhase: RoundPhase.SETUP,
    playPhase: PlayPhase.SELECT_RESOURCE,
    availableActions: [],
    selectedCustomerIndex: null,
    selectedResource: null,
    currentAction: null,
    round: state.round + 1,
    upgrades: {
      ...state.upgrades,
      driveThru: state.upgrades.driveThru || state.round >= (state.settings.driveThruRound - 1),
    }
  }));
}

function loadDishwasherState(state: Game): Game {
  return {
    ...state,
    playPhase: PlayPhase.SELECT_PLATE,
    currentAction: ManualAction.LOAD_DISHWASHER,
  };
}

function stopTimer(state: Game) {
  const roundTimers = [...state.statistics.roundTimers];
  roundTimers[state.round - 1].end = new Date();
  return roundTimers;
}

function endGameState(state: Game): Game {
  const endState = {
    ...state,
    stars: getStars(state),
    roundPhase: RoundPhase.NONE,
    gamePhase: GamePhase.FINISHED,
    playPhase: PlayPhase.NONE,
    availableActions: [],
    selectedCustomerIndex: null,
    selectedResource: null,
    currentAction: null,
    statistics: {
      ...state.statistics,
      leftOverCustomers: [...state.customers.filter((customer) => !isEatingCustomer(customer)).filter(customerExists)],
    }
  };
  
  storage.saveGame(endState);
  return endState;
}

function customerExists(customer: Customer | null | undefined): customer is Customer {
  return !!customer;
}

function moveHotFoodToCold(state: Game): string[] {
  //Need to test this... there may be a reason this wasn't working before. Seems to obvious

  if (state.upgrades.heatlamp) return [...state.coldCounterItems];

  return [...state.coldCounterItems, ...state.hotCounterItems];

  const coldCounterItems = [...state.coldCounterItems];
  state.hotCounterItems.forEach((item) => {
    coldCounterItems.push(item);
  });
  return coldCounterItems;
}

function getDirtyPlates(state: Game): string[] {
  return state.customers
    .filter(isEatingCustomer)
    .map((customer) => customer.order!);
}

function tickDownCustomers(customers: (Customer | null)[]): (Customer | null)[] {
  return customers.map((customer: (Customer | null)) => {
    if (!customer) return null;
    return { ...customer, pointValue: Math.max(customer.pointValue - 1, 1) };
  });
}

function removeFinishedCustomers(state: Game): (Customer | null)[] {
  // add the customer orders to available plates
  return [...state.customers.map((customer) => (isEatingCustomer(customer) ? null : customer))];
}

function getStars(state: Game): number {
  return state.customers.reduce((acc, customer) => {
    if (customer?.status === CustomerStatus.EATING) {
      return acc + customer.pointValue;
    }
    return acc;
  }, state.stars);
}

export { gameSetup, roundSetup, beginRoundTearDown, loadDishwasher, finishRotating, roundTearDown };
