import { ResourceAction} from "../../constants";
import { Game } from "../../game";

type Filter = (state: Game) => boolean;

const filterMap : { [key in ResourceAction]: Filter } = {
  [ResourceAction.SEAT_CUSTOMER]: seatFilter,
  [ResourceAction.TAKE_ORDER]: takeOrderFilter,
  [ResourceAction.SERVE]: serveFilter,
  [ResourceAction.COOK]: cookFilter,
  [ResourceAction.REFILL]: refillFilter,
  [ResourceAction.MOVE_MANAGER]: moveManagerFilter,
  [ResourceAction.ROTATE_CLOCKWISE]: rotateFilter,
  [ResourceAction.ROTATE_COUNTERCLOCKWISE]: rotateFilter,
};

function  moveManagerFilter() : boolean {
  return true;
}

function rotateFilter() : boolean {
  return true;
}

function seatFilter(state: Game) : boolean {
  return state.customers.filter((customer) => !customer)?.length > 0;
}

function takeOrderFilter(state: Game) : boolean {
  return state.customers.filter((customer) => !!customer && !customer.order)?.length > 0;
}

function cookFilter(state: Game) : boolean {
  return state.grillItems.length < 2;
}

function serveFilter(state: Game) : boolean {
  const hotCounterContainsFood = state.hotCounterItems.filter((food) => counterFilter(state, food))?.length > 0;

  const coldCounterContainsFood = state.coldCounterItems.filter((food) => counterFilter(state, food))?.length > 0;

  return hotCounterContainsFood || coldCounterContainsFood;
}

function counterFilter(state: Game, food: string) : boolean {
  return (
    state.customers.filter((customer) => {
      return customer?.order === food;
    })?.length > 0
  );
}

function refillFilter(state: Game) : boolean {
  return state.customers.filter((customer) =>  !!customer && customer.pointValue <= 4)?.length > 0;
}

function filter(state: Game, actions: (ResourceAction)[]) {
  return actions.filter((action) => filterMap[action](state));
}

export default { filter };
