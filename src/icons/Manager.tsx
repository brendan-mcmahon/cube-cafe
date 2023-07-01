import React from "react";
import { useGame } from "../gameContext";
import { ResourceAction } from "../constants";
import { PlayPhase } from "../constants";

function Manager() {
  const { state, dispatch } = useGame();

  const enabled = state.playPhase === PlayPhase.SELECT_ACTION && !!state.currentValue && state.currentValue >= 0;

  const onClick = () => {
    if (enabled) {
      dispatch({ type: ResourceAction.MOVE_MANAGER });
    }
  };

  return (
    <svg className="manager" onClick={onClick} viewBox="0 0 64 64" x="0px" y="0px" height="40px" width="40px">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feFlood floodColor="yellow" result="yellowColor" />
          <feComposite in="yellowColor" in2="coloredBlur" operator="in" result="yellowBlur" />
          <feMerge>
            <feMergeNode in="yellowBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        filter={enabled ? "url(#glow)" : ""}
        fill={enabled ? "#0C0" : "black"}
        d="M32,20A10,10,0,1,1,42,10,10,10,0,0,1,32,20Zm15,4.92V41.08A1,1,0,0,1,46,42H42V64H22V42H18a1,1,0,0,1-1-.92V24.92A1,1,0,0,1,18,24H46A1,1,0,0,1,47,24.92ZM36,44.06,33.34,33.38A5.86,5.86,0,0,0,35,30c0-1.1-1.34-2-3-2s-3,.9-3,2a5.86,5.86,0,0,0,1.66,3.38L28,44.06,32,50Z"
      />
    </svg>
  );
}

export default Manager;
