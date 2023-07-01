import React from "react";
import { useGame } from "../gameContext";
import "./styles/Dice.scss";

type DieProps = {
  color: string;
};

function Die(props: DieProps) {
  return (
    <div className={`die`}>
      <div className={`dot ${props.color}`}></div>
    </div>
  );
}

function Dice() {
  const { state } = useGame();

  return (
    <div id="Dice">
      {state.dice?.map((value, i) => (
        <Die key={i} color={value} />
      ))}
    </div>
  );
}

export default Dice;
