import { PlayerActions } from "../constants";

const filterMap = {
  [PlayerActions.SEAT_CUSTOMER]: seatFilter,
  [PlayerActions.TAKE_ORDER]: takeOrderFilter,
  [PlayerActions.SERVE]: serveFilter,
  [PlayerActions.COOK]: cookFilter,
  [PlayerActions.REFILL]: refillFilter,
};

function seatFilter(state) {
  return state.customers.filter((customer) => !!customer)?.length < 3;
}

function takeOrderFilter(state) {
  return state.customers.filter((customer) => !!customer && !customer.order)?.length > 0;
}

function cookFilter(state) {
  return state.grillItems.length < 2;
}

function serveFilter(state) {
  const hotCounterContainsFood = state.hotCounterItems.filter((food) => counterFilter(state, food))?.length > 0;

  const coldCounterContainsFood = state.coldCounterItems.filter((food) => counterFilter(state, food))?.length > 0;

  return hotCounterContainsFood || coldCounterContainsFood;
}

function counterFilter(state, food) {
  return (
    state.customers.filter((customer) => {
      return customer?.order === food;
    })?.length > 0
  );
}

function refillFilter(state) {
  return state.customers.filter((customer) => {
    return !!customer && customer.pointValue <= 4;
  });
}

function filter(state, actions) {
  return actions.filter((action) => filterMap[action](state));
}

export default { filter };
