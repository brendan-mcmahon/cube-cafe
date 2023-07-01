import React from "react";
import { PlayPhase, ManualAction, ResourceStatus } from "../constants";
import { useGame } from "../gameContext";
import "./styles/Resources.scss";
import { Resource } from "../game";

function Resources() {
  const { state, dispatch } = useGame();

  function dispatchAction(resource: Resource, resourceIndex: number) {
    return dispatch({ type: ManualAction.SELECT_RESOURCE, resource, resourceIndex });
  }

  return (
    <div id="Resources">
      {state.resources.map((resource, i) => (
        <button
          disabled={resource.status === ResourceStatus.EXHAUSTED}
          key={i}
          className={`resource ${resource.color} ${resource.status} ${state.playPhase === PlayPhase.SELECT_RESOURCE ? "selectable" : ""
            } ${state.selectedResourceIndex === i ? "selected" : ""}`}
          onClick={() => dispatchAction(resource, i)}
        ></button>
      ))}
    </div>
  );
}

export default Resources;
