import { useGame } from "../gameContext";
import "./styles/Dice.scss";

function Die({ color }) {
  return (
    <div className={`die`}>
      <div className={`dot ${color}`}></div>
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
