import React from "react";
import { useGame } from "../gameContext";
import { PlayPhase, ManualAction } from "../constants";
import "./styles/Dishwasher.scss";
import { DishwasherAction } from "../constants";
import { DishwasherSquare } from "../game";

function Dishwasher() {
  const { state, dispatch } = useGame();

  const enabled = state.playPhase === PlayPhase.SELECT_DISHWASHER_SQUARE;

  const actionMap : { [key in DishwasherAction]: string } = {
    [DishwasherAction.INCREASE_ONE_CUSTOMER]: "+2 to one Customer",
    [DishwasherAction.PULL_PLATES]: "Choose from 2 plates",
    [DishwasherAction.RESET_WHEEL]: "Reset the Wheel",
    [DishwasherAction.ADD_TABLE]: "+1 Table",
    [DishwasherAction.INCREASE_ALL_CUSTOMERS]: "+1 to all Customers",
    [DishwasherAction.FREEZER_UPGRADE]: "Buy a Freezer",
    [DishwasherAction.CUSTOMER_START_UPGRADE]: "+1 Customer Start",
    [DishwasherAction.HEATLAMP_UPGRADE]: "Buy a Heatlamp"
  };

  const selectDishwasherSquare = (square: DishwasherSquare, squareIndex: number) => {
    if (enabled && !square.activated) {
      dispatch({ type: ManualAction.LOAD_DISHWASHER, squareIndex });
    }
  };

  return (
    <div id="Dishwasher" className="game-area">
      {state.dishwasher.map((square, i) => (
        <button
          disabled={!enabled || square.activated}
          key={i}
          onClick={() => selectDishwasherSquare(square, i)}
          className={`square  ${!enabled ? "disabled" : ""}`}
        >
          <span className={square.plate || ""}>{actionMap[square.action]}</span>
        </button>
      ))}
    </div>
  );
}

export default Dishwasher;
