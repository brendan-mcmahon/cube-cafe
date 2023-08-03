import React, { ReactNode, createContext, useContext, useReducer } from "react";
import { roundSetup, gameSetup, loadDishwasher, finishRotating } from "./ActionDisk/actions/roundActions";
import { ManualAction, PlayPhase, GameAction, ResourceAction, DishwasherAction } from "./constants";
import playActions from "./ActionDisk/actions/playPhaseActions";
import { updateSettings } from "./settings/updateSettings";
import { Game } from "./models/game";
import { defaultGame } from "./models/defaultGame";
import { v4 as uuidv4 } from 'uuid';
import { IResourceAction, GameSetupAction, FinishedRotatingAction, LoadDishwasherAction, SelectFoodAction, LoadGameAction, QuitGameAction, SetSettingsAction, RoundSetupAction, RoundTearDownAction, SelectResourceAction, SelectCustomerAction, SelectPlateAction, UndoAction, FreezeResourceAction, ThawResourceAction, SelectCarAction, SelectManagerBonusAction, ClearTableAction, SelectResourceToCopyAction } from "./actions";
import { generatePersonName } from "./nameGenerator";
import { roundTearDown } from "./ActionDisk/actions/roundTearDown";
import selectFood from "./ActionDisk/actions/selectFood";
import { addHistory, undo } from "./addHistory";

// if you're trying to add something to this with a new type of dispatch action,
// create the action interface in the actions.ts file,
// then add that to the union below here,
// then MAKE SURE that the dispatch.type is the same as the action.type in the reducer below

type Action = IResourceAction | SelectResourceToCopyAction | ClearTableAction | SelectManagerBonusAction | ThawResourceAction | FreezeResourceAction | GameSetupAction | FinishedRotatingAction | LoadDishwasherAction | SelectFoodAction | SelectCarAction | LoadGameAction | QuitGameAction | SetSettingsAction | RoundSetupAction | RoundTearDownAction | SelectResourceAction | SelectCustomerAction | SelectPlateAction | UndoAction;

const gameReducer = (state: Game, action: Action) => {
  localStorage.setItem("autosave", JSON.stringify(state));

  switch (action.type) {
    case GameAction.LOAD_GAME:
      return loadGame(state, action.game);
    case GameAction.QUIT_GAME:
      return quitGame(state);
    case GameAction.SET_SETTINGS:
      return updateSettings(state, action.settings);
    case GameAction.GAME_SETUP:
      return gameSetup(state);
    case GameAction.ROUND_SETUP:
      return roundSetup(state);
    case GameAction.ROUND_TEARDOWN:
      return roundTearDown(state);
    case ManualAction.SELECT_RESOURCE:
      return playActions.selectResource(addHistory(state, action.type), action.resource, action.resourceIndex);
    case ManualAction.SELECT_TABLE:
      return playActions.selectTable(state, action.tableIndex);
    case ManualAction.SELECT_MANAGER_BONUS:
      return playActions.selectManagerBonus(state, action.bonus);
    case PlayPhase.PLATE_SELECTION_PHASE:
      return playActions.selectPlate(state, action.plate);
    case ResourceAction.ROTATE_CLOCKWISE:
      return playActions.rotate(state, "clockwise");
    case ResourceAction.ROTATE_COUNTERCLOCKWISE:
      return playActions.rotate(state, "counter-clockwise");
    case ManualAction.SELECT_FOOD:
      return selectFood(state, action.foodIndex, action.counter);
    case ResourceAction.MOVE_MANAGER:
      return playActions.moveManager(state, action.spaces);
    case ManualAction.CLEAR_TABLE:
      return playActions.clearTable(addHistory(state, action.type), action.tableIndex);
    case ManualAction.LOAD_DISHWASHER:
      return loadDishwasher(state, action.squareIndex);
    case ManualAction.SELECT_RESOURCE_TO_COPY:
      return playActions.selectResourceToCopy(state, action.color);
    // case ManualAction.FINISHED_ROTATING:
    //   return finishRotating(addHistory(state, action.type));
    case ResourceAction.SEAT_CUSTOMER:
      return playActions.seatCustomer(state);
    case ResourceAction.TAKE_ORDER:
      return playActions.takeOrder(state);
    case ResourceAction.COOK:
      return playActions.cook(state);
    case ResourceAction.SERVE:
      return playActions.serve(state);
    case ResourceAction.REFILL:
      return playActions.refill(state);
    case ManualAction.SELECT_CAR:
      return playActions.selectCar(state, action.carIndex);
    case ResourceAction.SERVE_CAR:
      return playActions.serveCar(state);
    case ManualAction.FREEZE_RESOURCE:
      return playActions.freezeResource(state);
    case ManualAction.THAW_RESOURCE:
      return playActions.thawResource(addHistory(state, action.type))
    case ManualAction.UNDO:
      return undo(state);
    default:
      return state;
  }
};



const loadGame = (state: Game, newGame: Game) => {
  localStorage.setItem("autosave", JSON.stringify(newGame));

  return {
    ...state,
    ...newGame
  };
};

const quitGame = (state: Game) => {
  localStorage.removeItem("autosave");
  return { ...defaultGame };
}

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

  if (!localStorage.getItem("user")) {
    const user = generatePersonName();
    localStorage.setItem("user", user);
    defaultGame.settings.user = user;
  }

  const [state, dispatch] = useReducer(gameReducer, defaultGame);

  return <GameContext.Provider value={{ state, dispatch }}> {children}</GameContext.Provider>;
};

export const useGame = (): GameContextType => useContext(GameContext);
