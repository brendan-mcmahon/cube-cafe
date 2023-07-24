import { GameAction, PlayPhase, ManualAction, ResourceAction } from "./constants";
import { Game, Resource, Settings } from "./game";

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
    resource: Resource;
    resourceIndex: number;
}

export interface SelectCustomerAction {
    type: ManualAction.SELECT_CUSTOMER;
    customerIndex: number;
}

export interface SelectPlateAction {
    type: PlayPhase.SELECT_PLATE;
    plate: string;
}

export interface IResourceAction {
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
