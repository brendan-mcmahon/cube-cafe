import { useGame } from "../gameContext";
import { PlayPhases } from "../constants";
import "./styles/Dishwasher.scss";
import { dishwasherActions } from "../constants";

function Dishwasher() {
  const { state, dispatch } = useGame();

  const enabled = state.playPhase === PlayPhases.SELECT_DISHWASHER_SQUARE;

  const actionMap = {
    [dishwasherActions.INCREASE_ONE_CUSTOMER]: "+2 to one Customer",
    [dishwasherActions.PULL_PLATES]: "Recommendations",
    [dishwasherActions.RESET_WHEEL]: "Reset the Wheel",
    [dishwasherActions.ADD_TABLE]: "+1 Table",
    [dishwasherActions.INCREASE_ALL_CUSTOMERS]: "+1 to all Customers",
  };

  const selectDishwasherSquare = (square, squareIndex) => {
    if (enabled && !square.activated) {
      dispatch({ type: "LOAD_DISHWASHER", squareIndex });
    }
  };

  return (
    <div id="Dishwasher">
      {state.dishwasher.map((square, i) => (
        <button
          disabled={!enabled || square.activated}
          key={i}
          onClick={() => selectDishwasherSquare(square, i)}
          className={`square  ${!enabled ? "disabled" : ""}`}
        >
          <span className={square.plate}>{actionMap[square.action]}</span>
        </button>
      ))}
    </div>
  );
}

export default Dishwasher;
