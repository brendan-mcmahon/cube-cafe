import { PlayerActions, RoundPhases, PlayPhases, dishwasherActions } from "../constants";
import { roundTearDown } from "./roundActions";

// all customers +1
// increase one customer +2
// add a table
// pull two plates
// reset the wheel position
// car
// add a special

const dishwasherMap = {
  [dishwasherActions.INCREASE_ALL_CUSTOMERS]: increaseAllCustomers,
  [dishwasherActions.INCREASE_ONE_CUSTOMER]: increaseOneCustomer,
  [dishwasherActions.ADD_TABLE]: addTable,
  [dishwasherActions.PULL_PLATES]: pullPlates,
  [dishwasherActions.RESET_WHEEL]: resetWheel,
  [dishwasherActions.CAR]: addCar,
};

function dishwasherResolver(state, action) {
  return dishwasherMap[action](state);
}

function addCar(state) {
  return roundTearDown({
    ...state,
    incomingCars: [...state.incomingCars, { color: "blue", status: "waiting" }],
  });
}

function increaseAllCustomers(state) {
  const customers = [...state.customers];
  customers.forEach((customer) => {
    if (!!customer) customer.pointValue += 1;
  });
  return roundTearDown({
    ...state,
    customers,
  });
}

function increaseOneCustomer(state) {
  return {
    ...state,
    playPhase: PlayPhases.SELECT_CUSTOMER,
    currentAction: PlayerActions.INCREASE_ONE_CUSTOMER,
  };
}

function addTable(state) {
  const customers = [...state.customers];
  customers.push(null);
  return roundTearDown({
    ...state,
    customers,
  });
}

function pullPlates(state) {
  const settings = { ...state.settings };
  settings.numPlates += 1;
  return roundTearDown({
    ...state,
    settings,
  });
}

function resetWheel(state) {
  return {
    ...state,
    playPhase: PlayPhases.ROTATE_FREELY,
  };
}

export default dishwasherResolver;
