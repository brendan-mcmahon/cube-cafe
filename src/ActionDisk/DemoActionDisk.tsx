import React from "react";
import Actions from "./Actions";
import Colors from "./Colors";
import "./ActionDisk.scss";
import RotateArrow from "../icons/RotateArrow";
import { useGame } from "../gameContext";
import { ResourceAction } from "../constants";

function DemoActionDisk() {
  const { state, dispatch } = useGame();

  const rotate = (direction: string) => {
    const type = direction === "clockwise" ? ResourceAction.ROTATE_CLOCKWISE : ResourceAction.ROTATE_COUNTERCLOCKWISE;
    dispatch({ type });
  };

  return (
    <div id="ActionDisk">
      <RotateArrow
        onClick={() => rotate("clockwise")}
        direction="clockwise"
      />
      <div className="disk">
        <Actions hasDriveThru={state.upgrades.driveThru} />
        <Colors />
      </div>
      <RotateArrow
        onClick={() => rotate("counter-clockwise")}
        direction="counter-clockwise"
      />
    </div>
  );
}

export default DemoActionDisk;
