import React from "react";
import { useGame } from "../gameContext";
import { PlayPhase, ManualAction, DishwasherAction } from "../constants";
import "./styles/Dishwasher.scss";
import { DishwasherCellModel } from "../models/game";
import Copy from "../icons/Copy";
import Manager from "../icons/Manager";
import Cube from "../icons/Cube";

function DishwasherCell(props: DishwasherCellModel) {
  
  if (!props.plate) {
    switch (props.action) {
      case DishwasherAction.COLLECT_RESOURCE:
        return <span className="cell"><Cube color={props.color!} /></span>;
      case DishwasherAction.MOVE_MANAGER:
        return <span className="cell"><Manager /></span>;
      case DishwasherAction.COPY_RESOURCE:
        return <span className="cell"><Copy /></span>;
    }
  }

  return (<span className={`cell ${props.plate}`}></span>);
}


function Dishwasher() {
  const { state, dispatch } = useGame();

  const enabled = state.playPhase === PlayPhase.LOAD_DISHWASHER;

  const selectDishwasherSquare = (square: DishwasherCellModel, squareIndex: number) => {
    if (enabled && square.available) {
      dispatch({ type: ManualAction.LOAD_DISHWASHER, squareIndex });
    }
  };

  return (
    <div id="Dishwasher" className={`game-area`}>
      <label className="label">Dishwasher</label>

      <div className={`cells ${enabled ? 'active' : ''}`}>
        {state.dishwasher.map((cell, i) => (
          <button
            disabled={!enabled || !cell.available}
            key={i}
            onClick={() => selectDishwasherSquare(cell, i)}
            className={`square ${!enabled ? "disabled" : ""}`}
          >
            <DishwasherCell {...cell} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dishwasher;

