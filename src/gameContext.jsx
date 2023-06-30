import { createContext, useContext, useReducer } from "react";
import { roundSetup, beginRoundTearDown, loadDishwasher, finishRotating } from "./actions/roundActions";
import { GamePhases, PlayerActions, RoundPhases, dishwasherActions } from "./constants";
import playActions from "./actions/playPhaseActions";
import { updateSettings } from "./settings/updateSettings";

const GameContext = createContext();

const gameReducer = (state, action) => {
  localStorage.setItem("state", JSON.stringify(state));

  switch (action.type) {
    case "LOAD_GAME":
      return loadGame(state, action.gameFile);
    case "QUIT_GAME":
      return { ...defaultState };
    case "SET_SETTINGS":
      return updateSettings(state, action.settings);
    case "ROUND_SETUP":
      return roundSetup(state);
    case "ROUND_TEARDOWN":
      return beginRoundTearDown(state);
    case "SELECT_RESOURCE":
      return playActions.selectResource(state, action.resource, action.resourceIndex);
    case "SELECT_CUSTOMER":
      return playActions.selectCustomer(state, action.customerIndex);
    case "SELECT_PLATE":
      return playActions.selectPlate(state, action.plate);
    case PlayerActions.ROTATE:
      return playActions.rotate(addHistory(state, action.type), action.direction);
    case "SELECT_FOOD":
      return playActions.selectFood(addHistory(state, action.type), action.foodIndex, action.counter);
    case PlayerActions.MOVE_MANAGER:
      return playActions.moveManager(addHistory(state, action.type));
    case "LOAD_DISHWASHER":
      return loadDishwasher(addHistory(state, action.type), action.squareIndex);
    case "FINISHED_ROTATING":
      return finishRotating(addHistory(state, action.type));
    case PlayerActions.SEAT_CUSTOMER:
      return playActions.seatCustomer(addHistory(state, action.type));
    case PlayerActions.TAKE_ORDER:
      return playActions.takeOrder(addHistory(state, action.type));
    case PlayerActions.COOK:
      return playActions.cook(addHistory(state, action.type));
    case PlayerActions.SERVE:
      return playActions.serve(addHistory(state, action.type));
    case PlayerActions.REFILL:
      return playActions.refill(addHistory(state, action.type));
    case "UNDO":
      return state.history || state;
    default:
      return state;
  }
};

const loadGame = (state, newGame) => {
  localStorage.setItem("state", JSON.stringify(newGame));

  return {
    ...state,
    ...newGame,
    gamePhase: GamePhases.IN_PROGRESS,
  };
};

const addHistory = (state, action) => {
  return {
    ...state,
    actionHistory: [...state.actionHistory, action],
    history: { ...state },
  };
};

const defaultState = {
  settings: {
    platesPerColor: 5,
    startingMood: 3,
    tableCounter: 3,
    numPlates: 1,
    hotFoodReward: 1,
    coldFoodPenalty: 0,
    diceCount: 6,
    totalRounds: 8,
    driveThruLength: 3,
    managerTrack: ["empty", "empty", "empty", "empty", "wild"],
  },
  stars: 0,
  round: 1,
  gamePhase: GamePhases.NOT_STARTED,
  roundPhase: RoundPhases.SETUP,
  actionDisk: {
    rotation: 0,
    colors: ["red", "blue", "yellow", "white", "purple"],
    actions: [
      PlayerActions.SEAT_CUSTOMER,
      PlayerActions.TAKE_ORDER,
      PlayerActions.COOK,
      PlayerActions.SERVE,
      PlayerActions.REFILL,
    ],
  },
  playPhase: null,
  resources: [],
  dice: [],
  currentValue: null,
  availableActions: [],
  managerPosition: 0,
  customers: [null, null],
  grillItems: [],
  hotCounterItems: [],
  coldCounterItems: [],
  plateBag: [
    ...Array.from({ length: 5 }, () => "red"),
    ...Array.from({ length: 5 }, () => "blue"),
    ...Array.from({ length: 5 }, () => "yellow"),
    ...Array.from({ length: 5 }, () => "white"),
    ...Array.from({ length: 5 }, () => "purple"),
  ],
  dishwasher: [
    { plate: null, action: dishwasherActions.INCREASE_ONE_CUSTOMER, activated: false },
    { plate: null, action: dishwasherActions.INCREASE_ONE_CUSTOMER, activated: false },
    { plate: null, action: dishwasherActions.INCREASE_ONE_CUSTOMER, activated: false },
    { plate: null, action: dishwasherActions.PULL_PLATES, activated: false },
    { plate: null, action: dishwasherActions.RESET_WHEEL, activated: false },
    { plate: null, action: dishwasherActions.ADD_TABLE, activated: false },
    { plate: null, action: dishwasherActions.INCREASE_ALL_CUSTOMERS, activated: false },
    { plate: null, action: dishwasherActions.INCREASE_ALL_CUSTOMERS, activated: false },
    { plate: null, action: dishwasherActions.INCREASE_ALL_CUSTOMERS, activated: false },
  ],
  selectedPlate: null,
  actionHistory: [],
  history: null,
  incomingCars: [
    { color: "blue", status: "waiting" },
    { color: "red", status: "waiting" },
  ],
  cars: [],
  servedCustomers: [],
  rotationCount: 0,
  roundTimers: [],
};

export const GameProvider = ({ children }) => {
  const savedState = JSON.parse(localStorage.getItem("state"));
  console.log(savedState);

  const [state, dispatch] = useReducer(gameReducer, defaultState);

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
