import {
  CustomerStatus,
  GamePhase,
  PlayPhase,
  RefillStatus,
  RoundPhase,
} from "../../constants";
import { Game, Statistics, TableModel } from "../../models/game";
import storage from "../../storage";
import { cloneCars, cloneTables } from "../../cloners";
import { roundSetup } from "./roundActions";
import { clearHistory } from "./playPhaseActions";
import { Settings } from "../../models/Settings";

export function roundTearDown(state: Game): Game {
  const statistics = handleStats(state);

  if (state.round === state.settings.totalRounds) return endGameState(state);
  const stars = getStars(state);
  const tables = handleCustomers(state);
  const { coldCounterItems, hotCounterItems } = handleCounterTops(state);
  const cars = handleDriveThru(state);

  return roundSetup(
    clearHistory(
    save({
      ...state,
      stars,
      cars,
      statistics,
      tables,
      coldCounterItems,
      hotCounterItems,
      grillItems: [],
      roundPhase: RoundPhase.SETUP,
      playPhase: PlayPhase.SELECT_RESOURCE,
      availableActions: [],
      selectedTableIndex: null,
      selectedResource: null,
      currentAction: null,
      round: state.round + 1,
      upgrades: {
        ...state.upgrades,
        driveThru:
          state.upgrades.driveThru ||
          state.round >= state.settings.driveThruRound - 1,
      },
    }))
  );
}

function handleStats(state: Game): Statistics {
  const roundTimers = stopTimer(state);
  const tables = cloneTables(state);
  const servedCustomers = [
    ...state.statistics.servedCustomers,
    ...tables.filter(isEatingCustomer).map((t) => t.customer!),
  ];
  const lostCustomers = 
    state.settings.angryCustomersLeave 
    ? tables.filter(table => table.customer?.pointValue === 0).length 
    : 0;

  return {
    ...state.statistics,
    servedCustomers,
    roundTimers,
    lostCustomers: state.statistics.lostCustomers + lostCustomers,
  };
}

function handleDriveThru(state: Game) {
  const cars = cloneCars(state);
  cars[1] = cars[0];
  cars[0] = null;
  return cars;
}

function handleCounterTops(state: Game) {
  const coldCounterItems = [...state.hotCounterItems];
  const hotCounterItems = state.upgrades.heatlamp
    ? [...state.grillItems, ...state.hotCounterItems]
    : [...state.grillItems];
  return { coldCounterItems, hotCounterItems };
}

function handleCustomers(state: Game): TableModel[] {
  let tables = cloneTables(state);
  tables = removeFinishedCustomers(tables);
  tables = tickDownCustomers(tables, state.settings.angryCustomersLeave);
  if (state.settings.angryCustomersLeave)
    tables = removeAngryCustomers(tables);
  return tables;
}

function removeAngryCustomers(tables: TableModel[]): TableModel[] {
  return tables.map((table) => {
    if (table.customer?.pointValue === 0) {
      table.customer = null;
    }
    return table;
  });
}

function stopTimer(state: Game) {
  const roundTimers = [...state.statistics.roundTimers];
  roundTimers[state.round - 1].end = new Date();
  return roundTimers;
}

function endGameState(state: Game): Game {
  const endState: Game = {
    ...state,
    stars: getStars(state),
    roundPhase: RoundPhase.NONE,
    gamePhase: GamePhase.FINISHED,
    playPhase: PlayPhase.NONE,
    availableActions: [],
    selectedTableIndex: null,
    selectedResource: null,
    currentAction: null,
    statistics: {
      ...state.statistics,
      unfinishedTables: [
        ...cloneTables(state)
          .filter((table) => !isEatingCustomer(table))
          .filter(tableHasCustomer),
      ],
    },
  };

  storage.clearAutoSave();
  storage.saveGame(endState);
  return endState;
}

function tableHasCustomer(table: TableModel) {
  return !!table.customer;
}

function removeFinishedCustomers(tables: TableModel[]): TableModel[] {
  tables.forEach((table) => {
    if (isEatingCustomer(table)) {
      table.customer = null;
    }
  });
  return tables;
}

function tickDownCustomers(tables: TableModel[], angryCustomersLeave: boolean): TableModel[] {
  return tables.map((table) => {
    if (!!table.customer) {
      const newPointValue = angryCustomersLeave ?
        table.customer.pointValue - 1 :
        Math.max(table.customer.pointValue - 1, 1);
      table.customer.pointValue = newPointValue;
      table.customer.refillStatus = RefillStatus.EMPTY;
    }
    return table;
  });
}

function getStars(state: Game): number {
  return state.tables.reduce((acc, table) => {
    if (table.customer?.status === CustomerStatus.EATING) {
      return acc + table.customer.pointValue;
    }
    return acc;
  }, state.stars);
}

function save(state: Game): Game {
  storage.saveGame(state);
  return state;
}

function isEatingCustomer(table: TableModel): boolean {
  return (
    table.customer !== null &&
    table.customer !== undefined &&
    table.customer.status === CustomerStatus.EATING
  );
}

function getDirtyPlates(state: Game): string[] {
  return state.tables
    .filter(isEatingCustomer)
    .map((table) => table.customer!.order!);
}
