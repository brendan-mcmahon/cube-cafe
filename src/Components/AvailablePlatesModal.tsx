import React from "react";
import { PlayPhase } from "../constants";
import { useGame } from "../gameContext";
import { Modal } from "../Modal";
import { IModalProps } from "./IModalProps";
import "./styles/AvailablePlates.scss";

function AvailablePlatesModal(props: IModalProps) {
  const { state, dispatch } = useGame();

  const selectPlate = (plate: string) => {
    dispatch({ type: PlayPhase.SELECT_PLATE, plate });
  };
  return (
    <Modal title="Select a Plate" show={props.show} setShow={props.setShow}>
      <div id="AvailablePlates">
        <ul>
          {state.availablePlates?.map((plate, i) => (
            <li key={i} className={`plate ${plate}`} onClick={() => selectPlate(plate)}></li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}

export default AvailablePlatesModal;
