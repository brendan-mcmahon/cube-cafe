import { ManualAction, PlayPhase, DishwasherAction } from "../../constants";
import { roundTearDown } from "./roundActions";
import { Game } from "../../game";

const dishwasherMap: { [key in DishwasherAction]: (game: Game) => Game } = {
  [DishwasherAction.INCREASE_ALL_CUSTOMERS]: increaseAllCustomers,
  [DishwasherAction.INCREASE_ONE_CUSTOMER]: increaseOneCustomer,
  [DishwasherAction.ADD_TABLE]: addTable,
  [DishwasherAction.PULL_PLATES]: pullPlates,
  [DishwasherAction.RESET_WHEEL]: resetWheel,
  [DishwasherAction.FREEZER_UPGRADE]: freezerUpgrade,
  [DishwasherAction.CUSTOMER_START_UPGRADE]: customerStartUpgrade,
  [DishwasherAction.HEATLAMP_UPGRADE]: heatlampUpgrade,
  [DishwasherAction.POINTS]: addPoints,
};

function dishwasherResolver(state: Game, action: DishwasherAction) {
  return addActionToStats(dishwasherMap[action](state), action);
}

function addPoints(state: Game): Game {
  return {
    ...state,
    stars: state.stars + 1,
  };
}

function heatlampUpgrade(state: Game): Game {
  return {
    ...state,
    upgrades: {
      ...state.upgrades,
      heatlamp: true
    }
  }
}

function freezerUpgrade(state: Game): Game {
  return roundTearDown({
    ...state,
    upgrades: {
      ...state.upgrades,
      freezer: true
    }
  })
}

function customerStartUpgrade(state: Game) {
  return roundTearDown({
    ...state,
    settings: {
      ...state.settings,
      startingMood: state.settings.startingMood + 1
    }
  })
}

function addActionToStats(state: Game, action: DishwasherAction): Game {
  return {
    ...state,
    statistics: {
      ...state.statistics,
      dishwasherSelections: [...state.statistics.dishwasherSelections, action],
    },
  };
}

function increaseAllCustomers(state: Game): Game {
  const customers = [...state.customers];
  customers.forEach((customer) => {
    if (!!customer) customer.pointValue = Math.min(5, customer.pointValue + 1);
  });
  return roundTearDown({
    ...state,
    customers,
  });
}

function increaseOneCustomer(state: Game): Game {
  return {
    ...state,
    playPhase: PlayPhase.SELECT_CUSTOMER,
    currentAction: ManualAction.INCREASE_ONE_CUSTOMER,
  };
}

function addTable(state: Game): Game {
  const customers = [...state.customers];
  customers.push(null);
  return roundTearDown({
    ...state,
    customers,
  });
}

function pullPlates(state: Game): Game {
  const settings = { ...state.settings };
  settings.numPlates += 1;
  return roundTearDown({
    ...state,
    settings,
  });
}

function resetWheel(state: Game): Game {
  return {
    ...state,
    playPhase: PlayPhase.ROTATE_FREELY,
  };
}

export default dishwasherResolver;
