import { useGame } from "../gameContext";
import { PlayPhase, ManualAction } from "../constants";
import "./styles/Dishwasher.scss";
import { DishwasherAction } from "../constants";

function Dishwasher() {
  const { state, dispatch } = useGame();

  const enabled = state.playPhase === PlayPhase.SELECT_DISHWASHER_SQUARE;

  const actionMap = {
    [DishwasherAction.INCREASE_ONE_CUSTOMER]: "+2 to one Customer",
    [DishwasherAction.PULL_PLATES]: "Recommendations",
    [DishwasherAction.RESET_WHEEL]: "Reset the Wheel",
    [DishwasherAction.ADD_TABLE]: "+1 Table",
    [DishwasherAction.INCREASE_ALL_CUSTOMERS]: "+1 to all Customers",
  };

  const selectDishwasherSquare = (square, squareIndex) => {
    if (enabled && !square.activated) {
      dispatch({ type: ManualAction.LOAD_DISHWASHER, squareIndex });
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
