import React from "react";
import Actions from "./Actions";
import Colors from "./Colors";
import "./ActionDisk.scss";
import RotateArrow from "../icons/RotateArrow";
import { useGame } from "../gameContext";
import { PlayPhase, ManualAction, ResourceAction } from "../constants";

function ActionDisk() {
  const { state, dispatch } = useGame();

  const rotate = (direction: string) => {
    if (state.playPhase === PlayPhase.SELECT_ACTION || state.playPhase === PlayPhase.ROTATE_FREELY) {
      const type = direction === "clockwise" ? ResourceAction.ROTATE_CLOCKWISE : ResourceAction.ROTATE_COUNTERCLOCKWISE;
      dispatch({ type });
    }
  };

  return (
    <>
      <div id="ActionDisk">
        <RotateArrow
          disabled={state.playPhase !== PlayPhase.SELECT_ACTION}
          onClick={() => rotate("clockwise")}
          direction="clockwise"
        />
        <div className="disk">
          <Actions hasDriveThru={state.upgrades.driveThru} />
          <Colors />
        </div>
        <RotateArrow
          disabled={state.playPhase !== PlayPhase.SELECT_ACTION}
          onClick={() => rotate("counter-clockwise")}
          direction="counter-clockwise"
        />
      </div>
      {state.playPhase === PlayPhase.ROTATE_FREELY && (
        <button onClick={() => dispatch({ type: ManualAction.FINISHED_ROTATING })}>Done</button>
      )}
    </>
  );
}

export default ActionDisk;
