import { GameAction, PlayPhase, ManualAction, ResourceAction } from "./constants";
import { Game, Resource } from "./models/game";
import { Settings } from "./models/Settings";

export interface LoadGameAction {
    type: GameAction.LOAD_GAME;
    game: Game;
}

export interface QuitGameAction {
    type: GameAction.QUIT_GAME;
}

export interface SetSettingsAction {
    type: GameAction.SET_SETTINGS;
    settings: Settings;
}

export interface RoundSetupAction {
    type: GameAction.ROUND_SETUP;
}

export interface GameSetupAction {
    type: GameAction.GAME_SETUP;
}


export interface RoundTearDownAction {
    type: GameAction.ROUND_TEARDOWN;
}

export interface SelectResourceAction {
    type: ManualAction.SELECT_RESOURCE;
    resource: Resource | null;
    resourceIndex: number | null;
}

export interface SelectCustomerAction {
    type: ManualAction.SELECT_TABLE;
    tableIndex: number;
}

export interface SelectManagerBonusAction {
    type: ManualAction.SELECT_MANAGER_BONUS;
    bonus: string;
}

export interface SelectPlateAction {
    type: PlayPhase.PLATE_SELECTION_PHASE;
    plate: string;
}

export interface IResourceAction {
    spaces?: number | undefined;
    type: ResourceAction;
}

export interface SelectFoodAction {
    type: ManualAction.SELECT_FOOD;
    foodIndex: number;
    counter: string;
}

export interface SelectCarAction {
    type: ManualAction.SELECT_CAR;
    carIndex: number;
}

export interface LoadDishwasherAction {
    type: ManualAction.LOAD_DISHWASHER;
    squareIndex: number;
}

export interface ClearTableAction {
    type: ManualAction.CLEAR_TABLE;
    tableIndex: number;
}

export interface SelectResourceToCopyAction {
    type: ManualAction.SELECT_RESOURCE_TO_COPY;
    color: string;
}

export interface FinishedRotatingAction {
    type: ManualAction.FINISHED_ROTATING;
}

export interface FreezeResourceAction {
    type: ManualAction.FREEZE_RESOURCE;
}

export interface ThawResourceAction {
    type: ManualAction.THAW_RESOURCE;
}

export interface UndoAction {
    type: ManualAction.UNDO;
}
