import { Game } from "./models/game";

export function cloneTables(state: Game) {
  return state.tables.map((t) => ({
    ...t,
    customer: t.customer ? { ...t.customer } : null,
  }));
}

export function cloneCars(state: Game) {
  return state.cars.map((c) => (!!c ? { ...c } : null));
}

export function cloneGame(state: Game): Game {
  return {
    ...state,
  };
}
