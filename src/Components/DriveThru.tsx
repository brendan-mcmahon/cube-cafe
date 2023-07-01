import React, { useEffect, Fragment } from "react";
import { useGame } from "../gameContext";
import "./styles/DriveThru.scss";

// TODO: I don't know enough about how this drivethru should work to make this, I don't think
export default function DriveThru() {
  const { state, dispatch } = useGame();

  // useEffect(() => { }, [state.cars]);

  //   const occupiedSpaces = state.cars.filter((car) => !!car).length;
  //   const emptySpaces = state.settings.driveThruLength - occupiedSpaces;

  return (
    <div id="DriveThru">
      {Array.from({ length: state.settings.driveThruLength }, (_, i) => (
        <Fragment key={i}>
          <div key={i} className="car empty"></div>
          <div className="yellow-stripe"></div>
        </Fragment>
      ))}
    </div>
  );

  //   return (
  //     <div id="DriveThru">
  //       {state.cars?.map((car, i) => (
  //         <Fragment key={i}>
  //           <div className={`car ${car.color}`}></div>
  //           <div className="yellow-stripe"></div>
  //         </Fragment>
  //       ))}
  //       {Array.from({ length: emptySpaces }, (_, i) => (
  //         <Fragment key={i}>
  //           <div key={i} className="car empty"></div>
  //           <div className="yellow-stripe"></div>
  //         </Fragment>
  //       ))}
  //     </div>
  //   );
}
