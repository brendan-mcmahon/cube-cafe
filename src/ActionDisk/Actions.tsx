import React from "react";
import { ResourceAction } from "../constants";
import { useGame } from "../gameContext";
import { Slice } from "./Slice";
import { GlowFilter } from "../icons/GlowFilter";
import seat from '../assets/chalkboard/icons/seat.png';
import clipboard from '../assets/chalkboard/icons/clipboard.png';
import pan from '../assets/chalkboard/icons/pan.png';
import cloche from '../assets/chalkboard/icons/cloche.png';
import refill from '../assets/chalkboard/icons/refill.png';
import serveCar from '../assets/chalkboard/icons/serve_car.png';

type ActionsProps = {
  hasDriveThru?: boolean;
}

function Actions(props: ActionsProps) {
  const { state } = useGame();

  return (
    <svg viewBox="0 0 210 210" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs> <GlowFilter /> </defs>

      <circle cx="105" cy="105" r="100" fill="#2a2a2a" stroke="#fff"></circle>

      <image
        id="Seat"
        className={`action-icon ${actionAvailable(ResourceAction.SEAT_CUSTOMER) ? "glow" : ""} ${props.hasDriveThru ? "drive-thru" : ""}`}
        href={seat} x="0" y="0" width="40"
        transform={props.hasDriveThru ? "scale(.8) translate(140 18)" : "translate(85, 12)"} />


      {props.hasDriveThru && (
        <image id="Car"
          className={`action-icon ${actionAvailable(ResourceAction.SERVE_CAR) ? "glow" : ""}`} href={serveCar} x="0" y="0" width="40"
          transform="scale(1.1) translate(55 18)" />
      )}

      <image id="Clipboard"
        className={`action-icon ${actionAvailable(ResourceAction.TAKE_ORDER) ? "glow" : ""}`}
        transform="rotate(72 105 105) translate(82 36) rotate(-72)" href={clipboard} x="0" y="0" height="40" width="28" />

      <image id="Pan"
        className={`action-icon ${actionAvailable(ResourceAction.COOK) ? "glow" : ""}`}
        transform="rotate(144 105 105) translate(75 24) rotate(-144 25 13.25)" href={pan} x="0" y="0" width="55" />

      <image id="Cloche"
        className={`action-icon ${actionAvailable(ResourceAction.SERVE) ? "glow" : ""}`}
        transform="rotate(-144 105 105) translate(85 -5) rotate(144 20 32)"
        href={cloche} x="0" y="0" width="40" />


      <image id="Refill"
        className={`action-icon ${actionAvailable(ResourceAction.REFILL) ? "glow" : ""}`}
        transform={`rotate(-72 105 105) translate(91 9) rotate(72 12.5 20)`}
        href={refill} x="0" y="0" width="28" />


      <Slice action={ResourceAction.TAKE_ORDER} rotation={36} />
      <Slice action={ResourceAction.COOK} rotation={108} />
      <Slice action={ResourceAction.SERVE} rotation={180} />
      <Slice action={ResourceAction.REFILL} rotation={252} />
      {!props.hasDriveThru && <Slice action={ResourceAction.SEAT_CUSTOMER} rotation={324} />}
      {props.hasDriveThru && <Slice action={ResourceAction.SERVE_CAR} rotation={324} size="half" />}
      {props.hasDriveThru && <Slice action={ResourceAction.SEAT_CUSTOMER} rotation={0} size="half" />}
    </svg>
  );

  function actionAvailable(action: ResourceAction): boolean {
    return state.availableActions.includes(action);
  }
}

export default Actions;
