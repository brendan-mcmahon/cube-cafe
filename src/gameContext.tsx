import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { roundSetup, beginRoundTearDown, loadDishwasher, finishRotating } from "./ActionDisk/actions/roundActions";
import { GamePhase, ManualAction, PlayPhase, ResourceStatus, GameAction, ResourceAction } from "./constants";
import playActions from "./ActionDisk/actions/playPhaseActions";
import { updateSettings } from "./settings/updateSettings";
import { Game, defaultGame } from "./game";
import { IResourceAction, FinishedRotatingAction, LoadDishwasherAction, SelectFoodAction, LoadGameAction, QuitGameAction, SetSettingsAction, RoundSetupAction, RoundTearDownAction, SelectResourceAction, SelectCustomerAction, SelectPlateAction, UndoAction } from "./actions";

type Action = IResourceAction | FinishedRotatingAction | LoadDishwasherAction | SelectFoodAction | LoadGameAction | QuitGameAction | SetSettingsAction | RoundSetupAction | RoundTearDownAction | SelectResourceAction | SelectCustomerAction | SelectPlateAction | UndoAction;

const gameReducer = (state: Game, action: Action) => {
  // localStorage.setItem("state", JSON.stringify(state));

  switch (action.type) {
    case GameAction.LOAD_GAME:
      return loadGame(state, action.game);
    case GameAction.QUIT_GAME:
      return { ...defaultGame };
    case GameAction.SET_SETTINGS:
      return updateSettings(state, action.settings);
    case GameAction.ROUND_SETUP:
      return roundSetup(state);
    case GameAction.ROUND_TEARDOWN:
      return beginRoundTearDown(state);
    case ManualAction.SELECT_RESOURCE:
      return playActions.selectResource(state, action.resource, action.resourceIndex);
    case ManualAction.SELECT_CUSTOMER:
      return playActions.selectCustomer(state, action.customerIndex);
    case PlayPhase.SELECT_PLATE:
      return playActions.selectPlate(state, action.plate);
    case ResourceAction.ROTATE_CLOCKWISE:
      return playActions.rotate(addHistory(state, action.type), "clockwise");
    case ResourceAction.ROTATE_COUNTERCLOCKWISE:
      return playActions.rotate(addHistory(state, action.type), "counter-clockwise");
    case ManualAction.SELECT_FOOD:
      return playActions.selectFood(addHistory(state, action.type), action.foodIndex, action.counter);
    case ResourceAction.MOVE_MANAGER:
      return playActions.moveManager(addHistory(state, action.type));
    case ManualAction.LOAD_DISHWASHER:
      return loadDishwasher(state, action.squareIndex);
    case ManualAction.FINISHED_ROTATING:
      return finishRotating(addHistory(state, action.type));
    case ResourceAction.SEAT_CUSTOMER:
      return playActions.seatCustomer(addHistory(state, action.type));
    case ResourceAction.TAKE_ORDER:
      return playActions.takeOrder(addHistory(state, action.type));
    case ResourceAction.COOK:
      return playActions.cook(addHistory(state, action.type));
    case ResourceAction.SERVE:
      return playActions.serve(state);
    case ResourceAction.REFILL:
      return playActions.refill(addHistory(state, action.type));
    case ManualAction.UNDO:
      return state.history || state;
    default:
      return state;
  }
};

const loadGame = (state: Game, newGame: Game) => {
  localStorage.setItem("state", JSON.stringify(newGame));

  return {
    ...state,
    ...newGame,
    gamePhase: GamePhase.IN_PROGRESS,
  };
};

const addHistory = (state: Game, action: string): Game => {
  console.log(state.customers[0]);
  const clonedState: Game = {
    ...state,
    resources: state.resources.map((resource) => ({ ...resource })),
    customers: state.customers.map((customer) => (!!customer ? { ...customer } : null)),
  };

  return {
    ...clonedState,
    actionHistory: [...clonedState.actionHistory, action],
    history: clonedState,
  };
};


type GameProviderProps = {
  children: ReactNode;
};

interface GameContextType {
  state: Game;
  dispatch: React.Dispatch<Action>;
}

const defaultGameContext: GameContextType = {
  state: defaultGame,
  dispatch: () => { },
};

const GameContext = createContext(defaultGameContext);

export const GameProvider = ({ children }: GameProviderProps) => {
  const [state, dispatch] = useReducer(gameReducer, defaultGame);

  return <GameContext.Provider value={{ state, dispatch }}> {children}</GameContext.Provider>;
};

export const useGame = (): GameContextType => useContext(GameContext);
