// import { useGame } from "./gameContext";

import Actions from "./Actions";
import Colors from "./Colors";
import "./ActionDisk.scss";
import RotateArrow from "../icons/RotateArrow";
import { useGame } from "../gameContext";
import { PlayPhases, PlayerActions } from "../constants";

function ActionDisk() {
  const { state, dispatch } = useGame();

  const rotate = (direction) => {
    if (state.playPhase === PlayPhases.SELECT_ACTION || state.playPhase === PlayPhases.ROTATE_FREELY) {
      dispatch({ type: PlayerActions.ROTATE, direction });
    }
  };

  return (
    <>
      <div id="ActionDisk">
        <RotateArrow
          disabled={state.playPhase !== PlayPhases.SELECT_ACTION}
          onClick={() => rotate("clockwise")}
          direction="clockwise"
        />
        <div className="disk">
          <Actions />
          <Colors />
        </div>
        <RotateArrow
          disabled={state.playPhase !== PlayPhases.SELECT_ACTION}
          onClick={() => rotate("counter-clockwise")}
          direction="counter-clockwise"
        />
      </div>
      {state.playPhase === PlayPhases.ROTATE_FREELY && (
        <button onClick={() => dispatch({ type: "FINISHED_ROTATING" })}>Done</button>
      )}
    </>
  );
}

export default ActionDisk;
