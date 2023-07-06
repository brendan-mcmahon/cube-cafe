import React from "react";
import { useGame } from "../gameContext";

const Colors: React.FC = () => {
  const { state } = useGame();

  return (
    <svg id="ColorDisk" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 210">
      <circle cx="105" cy="105" r="50" fill="#fff" stroke="#000"></circle>
      <g className="rotatable" stroke="#000" transform={`translate(105, 105) rotate(${state.actionDisk.rotation})`}>
        <path fill="red" d="M-10 -40H10V-20H-10z"></path>
        <path fill="#00f" d="M-10 -40H10V-20H-10z" transform="rotate(72)"></path>
        <path fill="#ff0" d="M-10 -40H10V-20H-10z" transform="rotate(144)"></path>
        <path fill="#fff" d="M-10 -40H10V-20H-10z" transform="rotate(216)"></path>
        <path fill="purple" d="M-10 -40H10V-20H-10z" transform="rotate(288)"></path>
      </g>
    </svg>
  );
}

export default Colors;
