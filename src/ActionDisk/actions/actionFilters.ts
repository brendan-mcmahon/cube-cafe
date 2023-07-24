import { colors } from "../../colors";
import { ResourceAction} from "../../constants";
import { Game, Resource } from "../../game";

type Filter = (state: Game, resource: Resource) => boolean;

const filterMap : { [key in ResourceAction]: Filter } = {
  [ResourceAction.SEAT_CUSTOMER]: seatFilter,
  [ResourceAction.TAKE_ORDER]: takeOrderFilter,
  [ResourceAction.SERVE]: serveFilter,
  [ResourceAction.COOK]: cookFilter,
  [ResourceAction.REFILL]: refillFilter,
  [ResourceAction.MOVE_MANAGER]: moveManagerFilter,
  [ResourceAction.ROTATE_CLOCKWISE]: rotateFilter,
  [ResourceAction.ROTATE_COUNTERCLOCKWISE]: rotateFilter,
  [ResourceAction.FEED_CAR]: feedCarFilter,
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

function feedCarFilter(state: Game, resource: Resource) : boolean {

  
  return state.cars.filter((car) => {
    const carExists = !!car;
    const colorMatches = resource.color === colors[5] || car?.color === resource?.color;
    const carIsWaiting = car?.status !== 'full';
    return carExists && colorMatches && carIsWaiting;
  }).length > 0;
  
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

function filter(state: Game, actions: (ResourceAction)[], resource: Resource) {
  return actions.filter((action) => filterMap[action](state, resource));
}

export default { filter };
