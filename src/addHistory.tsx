import { Car, Game, TableModel } from "./models/game";

export const addHistory = (state: Game, action: string): Game => {
  const clonedState: Game = cloneState(state);

  return {
    ...clonedState,
    actionHistory: [...clonedState.actionHistory, action],
    history: {...clonedState},
  };
};

function cloneState(state: Game): Game {
  return {
    ...state,
    resources: state.resources.map((resource) => ({ ...resource })),
    tables: state.tables.map(cloneTable),
    cars: state.cars.map(cloneCar),
  };
}

function cloneTable(table: TableModel): TableModel {
  if (!table.customer) return { ...table, customer: null };
  return {
    ...table,
    customer: { ...table.customer }
  };
}

function cloneCar(car: (Car | null)): (Car | null) {
  return !!car ? { color: car.color, status: car.status } : null;
}

export const undo = (game: Game): Game => {
  if (!game.history) return game;
  return {
    ...game.history,
    resources: [...game.history.resources.map((resource) => ({ ...resource }))],
    tables: [...game.history.tables.map(cloneTable)],
    cars: [...game.history.cars.map(cloneCar)],
  }
}
