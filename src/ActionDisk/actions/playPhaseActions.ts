import actionFilters from "./actionFilters";
import {
  CustomerStatus,
  ResourceAction,
  PlayPhase,
  ManualAction,
  ResourceStatus,
  RefillStatus,
} from "../../constants";
import resolveManagerActions from "./managerActions";
import { Game, Resource } from "../../models/game";
import Customer from "../../models/Customer";
import { resetAction } from "./resetAction";
import { cloneTables, cloneCars } from "../../cloners";

function selectResource(
  state: Game,
  resource: Resource | null,
  resourceIndex: number | null
): Game {

  if (resource === null || resourceIndex === null) {
    return {
      ...state,
      selectedResource: null,
      selectedResourceIndex: null,
      availableActions: [],
      currentValue: null,
      playPhase: PlayPhase.SELECT_RESOURCE,
    };
  }

  const index = state.actionDisk.colors.indexOf(resource.color);
  let availableActions: ResourceAction[] =
    resource.color === "wild"
      ? [...state.actionDisk.actions]
      : [state.actionDisk.actions[index]];

  //TODO: Not my favorite way to implement this
  if (state.upgrades.driveThru && index === 0)
    availableActions.push(ResourceAction.SERVE_CAR);

  availableActions = actionFilters.filter(state, availableActions, resource);

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
  const newCustomer: Customer = {
    order: null,
    pointValue: state.settings.startingMood,
    status: CustomerStatus.WAITING,
    refillStatus: RefillStatus.EMPTY,
  };

  const firstEmptyIndex = state.tables.findIndex(
    (table) => !table.customer && !table.plate
  );
  
  const tables = cloneTables(state);
  tables[firstEmptyIndex].customer = newCustomer;

  return resetAction({
    ...state,
    tables,
  });
}

function freezeResource(state: Game): Game {
  if (state.selectedResource === null) return { ...state };

  return resetAction({
    ...state,
    freezerItems: [state.selectedResource],
  });
}

function thawResource(state: Game): Game {
  if (state.freezerItems.length === 0) return { ...state };

  return {
    ...state,
    freezerItems: [],
    resources: [...state.resources, ...state.freezerItems],
  };
}

function selectTable(state: Game, tableIndex: number): Game {
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
    default:
      resolve = (s: Game, i: number) => s;
      break;
  }

  return resolve ? resolve(state, tableIndex) : resetAction(state);
}

export function clearHistory(state: Game): Game {
  return {
    ...state,
    actionHistory: [],
    history: null,
  };
}

function clearTable(state: Game, tableIndex: number): Game {
  const tables = cloneTables(state);
  const selectedPlate = tables[tableIndex].plate;

  return {
    ...state,
    tables,
    selectedPlate,
    selectedTableIndex: tableIndex,
    playPhase: PlayPhase.LOAD_DISHWASHER,
  };
}

function refillCustomer(state: Game, tableNumber: number): Game {
  const tables = cloneTables(state);
  const customer = tables[tableNumber].customer;

  if (!!customer) {
    tables[tableNumber].customer = {
      ...customer,
      refillStatus: RefillStatus.FULL,
      pointValue: Math.min(5, customer.pointValue + 1),
    };

    return resetAction({
      ...state,
      tables,
    });
  }
  return { ...state };
}

function chooseFoodToServe(state: Game, customerIndex: number): Game {
  return {
    ...state,
    playPhase: PlayPhase.SELECT_FOOD,
    currentAction: ResourceAction.SERVE,
    selectedTableIndex: customerIndex,
  };
}

function customerExists(
  customer: Customer | null | undefined
): customer is Customer {
  return !!customer;
}

function drawPlates(state: Game, customerIndex: number): Game {
  const newPlateBag = [...state.plateBag];
  // newPlateBag.sort(() => Math.random() - 0.5);
  // const newAvailablePlates: string[] = [];

  // for (let i = 0; i < state.settings.numPlates; i++) {
  //   const plate = newPlateBag.pop();
  //   if (!!plate) {
  //     newAvailablePlates.push(plate);
  //   }
  // }

  // if (newAvailablePlates.length === 1) {
  //   return forcePlate(state, newPlateBag, customerIndex);
  // }

  return forcePlate(state, newPlateBag, customerIndex);

  // return clearHistory({
  //   ...state,
  //   availablePlates: newAvailablePlates,
  //   plateBag: newPlateBag,
  //   playPhase: PlayPhase.PLATE_SELECTION_PHASE,
  //   selectedTableIndex: customerIndex,
  // });
}

function forcePlate(state: Game, newPlateBag: string[], customerIndex: number) {
  const tables = cloneTables(state);
  const newPlate = newPlateBag[0];
  const plateBag = newPlateBag.slice(1);
  const table = tables[customerIndex];
  if (customerExists(table.customer) && !!newPlate) {
    table.customer.order = newPlate;
    table.plate = newPlate;
  }
  return clearHistory(
    resetAction({
      ...state,
      plateBag,
      tables,
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
  let color =
    !state.settings.cookWildsAsWild && state.selectedResource?.color === "wild"
      ? state.actionDisk.colors[2]
      : state.selectedResource?.color;

  const openOrders =
    state.tables.filter(
      (table) =>
        !!table.customer &&
        table.customer.status === CustomerStatus.WAITING &&
        table.customer.order === color
    ).length > 0;

  const grillItems = !!color
    ? [...state.grillItems, color]
    : [...state.grillItems];

  return resetAction({
    ...state,
    grillItems,
    statistics: {
      ...state.statistics,
      foodCooked: state.statistics.foodCooked + 1,
      itemsCookedWithNoOrder:
        state.statistics.itemsCookedWithNoOrder + (openOrders ? 0 : 1),
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

function serveCar(state: Game): Game {
  return {
    ...state,
    currentAction: ResourceAction.SERVE_CAR,
    playPhase: PlayPhase.SELECT_CAR,
  };
}

function selectCar(state: Game, carIndex: number): Game {
  const cars = cloneCars(state);
  cars[carIndex]!.status = "full";

  const bonusPoints = state.settings.driveThruRewards[carIndex];
  return resetAction({
    ...state,
    cars: cars,
    bonusPoints: state.bonusPoints + bonusPoints,
    statistics: {
      ...state.statistics,
      carPoints: state.statistics.carPoints + bonusPoints,
      carsFed: state.statistics.carsFed + 1,
    },
  });
}

function moveManager(state: Game, spaces?: number): Game {
  return resolveManagerActions(state, spaces);
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
        rotation:
          state.actionDisk.rotation +
          (direction === "counter-clockwise" ? -72 : 72),
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
      rotation:
        state.actionDisk.rotation +
        (direction === "counter-clockwise" ? -72 : 72),
      colors: colors,
    },
  });
}

function giveCustomerPlate(state: Game, plate: string): Game {
  if (state.selectedTableIndex === null) {
    throw new Error("No customer selected");
  }
  const tables = cloneTables(state);
  const customer = tables[state.selectedTableIndex].customer;

  if (!customer) {
    throw new Error(`No customer at index ${state.selectedTableIndex}`);
  }

  customer.order = plate;

  const availablePlates = [...state.availablePlates];
  availablePlates.splice(availablePlates.indexOf(plate), 1);

  const plateBag = [...state.plateBag, ...availablePlates];
  return {
    ...state,
    tables,
    availablePlates: availablePlates,
    plateBag: plateBag,
  };
}

function selectManagerBonus(state: Game, bonus: string): Game {
  let resources = [...state.resources];
  if (bonus !== "point")
    resources.push({ color: bonus, status: ResourceStatus.AVAILABLE });
  const bonusPoints = state.bonusPoints + (bonus === "point" ? 1 : 0);
  return resetAction({
    ...state,
    resources,
    bonusPoints,
    statistics: {
      ...state.statistics,
      managerPoints: state.statistics.managerPoints + bonusPoints
    }
  });
}

function selectResourceToCopy(state: Game, color: string): Game {
  return {
    ...state,
    resources: [
      ...state.resources,
      { color, status: ResourceStatus.AVAILABLE },
    ],
    playPhase: PlayPhase.SELECT_RESOURCE,
  };
}

export default {
  selectResource,
  selectTable,
  freezeResource,
  thawResource,
  selectPlate,
  seatCustomer,
  moveManager,
  takeOrder,
  cook,
  serve,
  refill,
  rotate,
  drawPlates,
  selectCar,
  serveCar: serveCar,
  selectManagerBonus,
  clearTable,
  selectResourceToCopy,
};
