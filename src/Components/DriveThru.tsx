import React, { Fragment } from "react";
import { useGame } from "../gameContext";
import Car from "../icons/Car";
import { ManualAction, PlayPhase } from "../constants";
import "./styles/DriveThru.scss";
import Cube from "../icons/Cube";

export default function DriveThru() {
  const { state, dispatch } = useGame();

  const selectCar = (i: number) => {
    if (state.playPhase === PlayPhase.SELECT_CAR)
      dispatch({ type: ManualAction.SELECT_CAR, carIndex: i });
  };

  return (
    <div id="DriveThru" className="game-area">
      <div className="yellow-stripe"></div>


      {state.cars.map((car, i) => {

        const disabled = 
          state.playPhase !== PlayPhase.SELECT_CAR
          || (state.selectedResource?.color !== "wild" && state.selectedResource?.color !== car?.color);

        const carElement = !!car
          ? <button disabled={disabled} onClick={() => selectCar(i)} key={i} className={`car ${car.status}`}>
            <Car color={car.color} />
            { car.status === "full" && <Cube color={car.color} /> }
          </button>
          : <div key={i} className="car empty"></div>

        return (
          <Fragment key={i}>
            {carElement}
            <div className="yellow-stripe"></div>
          </Fragment>
        )
      }
      )}
    </div>
  );
}
