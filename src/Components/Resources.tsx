import React, { useEffect, useState } from "react";
import { PlayPhase, ManualAction, ResourceStatus, DishwasherAction } from "../constants";
import { useGame } from "../gameContext";
import "./styles/Resources.scss";
import { Resource } from "../models/game";
import Cube from "../icons/Cube";

function Resources() {
  const { state, dispatch } = useGame();
  const [copyMode, setCopyMode] = useState(state.playPhase === PlayPhase.SELECT_RESOURCE_TO_COPY);

  useEffect(() => {
    setCopyMode(state.playPhase === PlayPhase.SELECT_RESOURCE_TO_COPY);
  }, [state.playPhase]);

  function dispatchAction(resource: Resource, resourceIndex: number) {
    console.log('clicked!');
    if (copyMode) {
      return dispatch({ type: ManualAction.SELECT_RESOURCE_TO_COPY, color: resource.color });
    }
    if (state.selectedResourceIndex === resourceIndex) {
      return dispatch({ type: ManualAction.SELECT_RESOURCE, resource: null, resourceIndex: null });
    }
    return dispatch({ type: ManualAction.SELECT_RESOURCE, resource, resourceIndex });
  }

  return (
    <div id="Resources" className={copyMode ? "copy-mode" : ""}>
      {state.resources.map((resource, i) => (
        <button
          disabled={resource.status === ResourceStatus.EXHAUSTED && !copyMode}
          key={i}
          className={`resource ${resource.status} ${state.playPhase === PlayPhase.SELECT_RESOURCE ? "selectable" : ""
            } ${state.selectedResourceIndex === i ? "selected" : ""}`}
          onClick={() => dispatchAction(resource, i)}
        >
          <Cube color={resource.color!} />

        </button>
      ))}
    </div>
  );
}

export default Resources;
