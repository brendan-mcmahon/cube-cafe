import { PlayPhase, DishwasherAction } from "../../constants";
import { Game } from "../../models/game";
import playPhaseActions from "./playPhaseActions";

const dishwasherMap: { [key in DishwasherAction]: (game: Game, color?: (string | null)) => Game } = {
  [DishwasherAction.MOVE_MANAGER]: moveManager,
  [DishwasherAction.COLLECT_RESOURCE]: collectResource,
  [DishwasherAction.COPY_RESOURCE]: copyResource
};

function moveManager(game: Game, color?: (string | null)) {
    return playPhaseActions.moveManager(game, 3);
  };

function collectResource(game: Game, color?: (string | null)): Game {
  return {
    ...game,
    resources: [...game.resources, { color: color!, status: "available" }],
    playPhase: PlayPhase.SELECT_RESOURCE,
  };
};

function copyResource(game: Game, color?: (string | null)): Game {
  return {
    ...game,
    playPhase: PlayPhase.SELECT_RESOURCE_TO_COPY,
  };
};

function dishwasherResolver(state: Game, action: DishwasherAction, color?: (string | null)) {
  return addActionToStats(dishwasherMap[action](state, color), action);
}

function addActionToStats(state: Game, action: DishwasherAction): Game {
  return {
    ...state,
    statistics: {
      ...state.statistics,
      dishwasherSelections: [...state.statistics.dishwasherSelections, action],
    },
  };
}

export default dishwasherResolver;
