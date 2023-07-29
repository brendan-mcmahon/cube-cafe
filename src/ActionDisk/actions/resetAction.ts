import {
  PlayPhase, ResourceStatus,
  RoundPhase
} from "../../constants";
import { Game, Resource } from "../../models/game";
import { clearHistory } from "./playPhaseActions";

export function resetAction(state: Game): Game {
  const isLastResource = state.resources.filter(
    (resource) => resource.status === ResourceStatus.AVAILABLE
  ).length === 1;

  const resources = exhaustResource(state);

  const newState = {
    ...state,
    playPhase: isLastResource ? PlayPhase.NONE : PlayPhase.SELECT_RESOURCE,
    roundPhase: isLastResource ? RoundPhase.RESOLVE : state.roundPhase,
    availableActions: [],
    selectedCustomerIndex: null,
    resources,
    selectedResourceIndex: null,
    selectedResource: null,
    currentValue: null,
    currentAction: null,
  };

  return newState;
}

function exhaustResource(state: Game): Resource[] {
  if (state.selectedResourceIndex === null) {
    return [...state.resources];
  }
  const resources = [...state.resources];
  resources[state.selectedResourceIndex] = {
    ...resources[state.selectedResourceIndex],
    status: ResourceStatus.EXHAUSTED,
  };
  return resources;
}