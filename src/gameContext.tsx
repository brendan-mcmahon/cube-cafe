import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { roundSetup, gameSetup, beginRoundTearDown, loadDishwasher, finishRotating } from "./ActionDisk/actions/roundActions";
import { GamePhase, ManualAction, PlayPhase, GameAction, ResourceAction } from "./constants";
import playActions from "./ActionDisk/actions/playPhaseActions";
import { updateSettings } from "./settings/updateSettings";
import { Game, defaultGame } from "./game";
import { v4 as uuidv4 } from 'uuid';
import { IResourceAction, GameSetupAction, FinishedRotatingAction, LoadDishwasherAction, SelectFoodAction, LoadGameAction, QuitGameAction, SetSettingsAction, RoundSetupAction, RoundTearDownAction, SelectResourceAction, SelectCustomerAction, SelectPlateAction, UndoAction, FreezeResourceAction, ThawResourceAction } from "./actions";
import { generatePersonName } from "./nameGenerator";

type Action = IResourceAction | ThawResourceAction | FreezeResourceAction | GameSetupAction | FinishedRotatingAction | LoadDishwasherAction | SelectFoodAction | LoadGameAction | QuitGameAction | SetSettingsAction | RoundSetupAction | RoundTearDownAction | SelectResourceAction | SelectCustomerAction | SelectPlateAction | UndoAction;

const gameReducer = (state: Game, action: Action) => {
  // TODO: localStorage.setItem("state", JSON.stringify(state));

  switch (action.type) {
    case GameAction.LOAD_GAME:
      return loadGame(state, action.game);
    case GameAction.QUIT_GAME:
      return { ...defaultGame };
    case GameAction.SET_SETTINGS:
      return updateSettings(state, action.settings);
    case GameAction.GAME_SETUP:
      return gameSetup(state);
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
    case ManualAction.FREEZE_RESOURCE:
      return playActions.freezeResource(addHistory(state, action.type));
    case ManualAction.THAW_RESOURCE:
      return playActions.thawResource(addHistory(state, action.type))
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
    ...newGame
  };
};

const addHistory = (state: Game, action: string): Game => {
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
  defaultGame.id = uuidv4();

  if (defaultGame.settings.startingTableCount === 3) {
    defaultGame.customers[3] = null;
  }

  if (!localStorage.getItem("user")) {
    const user = generatePersonName();
    localStorage.setItem("user", user);
    defaultGame.settings.user = user;
  }

  const [state, dispatch] = useReducer(gameReducer, defaultGame);

  return <GameContext.Provider value={{ state, dispatch }}> {children}</GameContext.Provider>;
};

export const useGame = (): GameContextType => useContext(GameContext);
