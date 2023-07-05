import React from "react";
import Trash from "../icons/Trash";
import { ManagerAction } from "../constants";


type ManagerTrackStepProps = {
  index: number;
  step: ManagerAction;
  updateStep: (index: number, event: React.ChangeEvent<HTMLSelectElement>) => void;
  deleteStep: (index: number, event: React.MouseEvent) => void;
};

export function ManagerTrackStep(props: ManagerTrackStepProps) {
  return (
    <li className="manager-track-step">
      <label>{props.index + 1}:</label>
      <select name="manager-track-step" value={props.step} onChange={(e) => props.updateStep(props.index, e)}>
        <option value={ManagerAction.EMPTY}></option>
        <option value={ManagerAction.WILD}>+1 Wild</option>
      </select>

      <button onClick={(e) => props.deleteStep(props.index, e)} className="delete-manager-track-step">
        <Trash />
      </button>
    </li>
  );
}
