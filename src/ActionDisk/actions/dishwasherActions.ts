import { ManualAction, PlayPhase, DishwasherAction } from "../../constants";
import { roundTearDown } from "./roundActions";
import { Game } from "../../game";

// all customers +1
// increase one customer +2
// add a table
// pull two plates
// reset the wheel position
// car
// add a special

const dishwasherMap: { [key in DishwasherAction]: (game: Game) => Game } = {
  [DishwasherAction.INCREASE_ALL_CUSTOMERS]: increaseAllCustomers,
  [DishwasherAction.INCREASE_ONE_CUSTOMER]: increaseOneCustomer,
  [DishwasherAction.ADD_TABLE]: addTable,
  [DishwasherAction.PULL_PLATES]: pullPlates,
  [DishwasherAction.RESET_WHEEL]: resetWheel,
};

function dishwasherResolver(state: Game, action: DishwasherAction) {
  return addActionToStats(dishwasherMap[action](state), action);
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
