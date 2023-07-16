import React from "react";
import { useGame } from "../gameContext";
import "./styles/Dice.scss";
import { Die } from "./Die";

function Dice() {
  const { state } = useGame();

  return (
    <div id="Dice">
      {/* {state.dice?.map((value, i) => (
        <Die onClick={null} key={i} color={value} />
      ))} */}
    </div>
  );
}

export default Dice;
