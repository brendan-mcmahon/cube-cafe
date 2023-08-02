import React, { ChangeEvent, MouseEvent } from "react";
import Trash from "../icons/Trash";
import { ManagerAction } from "../constants";


type ManagerTrackStepProps = {
  index: number;
  step: ManagerAction;
  updateStep: (index: number, event: ChangeEvent<HTMLSelectElement>) => void;
  deleteStep: (index: number, event: MouseEvent) => void;
};

export function ManagerTrackStep(props: ManagerTrackStepProps) {
  return (
    <li className="manager-track-step">
      <label>{props.index + 1}:</label>
      <select name="manager-track-step" value={props.step} onChange={(e) => props.updateStep(props.index, e)}>
        <option value={ManagerAction.EMPTY}></option>
        <option value={ManagerAction.BOOST_ONE}>+1 table 1</option>
        <option value={ManagerAction.BOOST_TWO}>+1 table 2</option>
        <option value={ManagerAction.BOOST_THREE}>+1 table 3</option>
        <option value={ManagerAction.CUBE_OR_POINT}>+1 Wild</option>
      </select>

      <button onClick={(e) => props.deleteStep(props.index, e)} className="delete-manager-track-step">
        <Trash />
      </button>
    </li>
  );
}
