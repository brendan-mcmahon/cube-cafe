import { IResourceAction,
    GameSetupAction,
    FinishedRotatingAction,
    LoadDishwasherAction,
    SelectFoodAction,
    LoadGameAction,
    QuitGameAction,
    SetSettingsAction,
    RoundSetupAction,
    RoundTearDownAction,
    SelectResourceAction,
    SelectTableAction,
    SelectPlateAction,
    UndoAction,
    FreezeResourceAction,
    ThawResourceAction,
    SelectCarAction,
    SelectManagerBonusAction,
    ClearTableAction,
    SelectResourceToCopyAction,
    TakeOrderSelectTableAction } from "./actions";

// if you're trying to add something to this with a new type of dispatch action,
// create the action interface in the actions.ts file,
// then add that to the union below here,
// then MAKE SURE that the dispatch.type is the same as the action.type in the reducer below

export type Action = 
    IResourceAction
    | SelectResourceToCopyAction
    | ClearTableAction
    | SelectManagerBonusAction
    | ThawResourceAction
    | FreezeResourceAction
    | GameSetupAction
    | FinishedRotatingAction
    | LoadDishwasherAction
    | SelectFoodAction
    | SelectCarAction
    | LoadGameAction
    | QuitGameAction
    | SetSettingsAction
    | RoundSetupAction
    | RoundTearDownAction
    | SelectResourceAction
    | SelectTableAction
    | SelectPlateAction
    | TakeOrderSelectTableAction
    | UndoAction;
