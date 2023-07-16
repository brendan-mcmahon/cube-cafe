import { ManualAction, PlayPhase, RoundPhase, GamePhase, ResourceStatus } from "../../constants";
import dishwasherResolver from "./dishwasherActions";
import { CustomerStatus } from "../../constants";
import { Customer, Game, Resource, RoundTimer } from "../../game";
import { dateFormat } from "../../Components/dateFormat";
import storage from "../../storage";
import { generateRestaurantName } from "../../nameGenerator";

function gameSetup(state: Game) {
  const gameName = generateRestaurantName();
  console.log(gameName);
  return roundSetup({
    ...state,
    settings: {
      ...state.settings,
      gameName,
    }
  });
}

function roundSetup(state: Game): Game {
  const dice = rollDice(state);

  return {
    ...state,
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

  return roundSetup(save({
    ...state,
    stars: getStars(state),
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
  // // save the game here
  const now = new Date().toLocaleString("en-US", dateFormat);
  storage.saveGame(state);
  return {
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
