import React, { ChangeEvent, MouseEvent } from "react";
import { ManagerTrackStep } from "./ManagerTrackStep";
import { ManagerAction } from "../constants";
import Plus from "../icons/Plus";

type ManagerTrackSettingsProps = {
    managerTrack: ManagerAction[],
    updateManagerStep: (index: number, event: ChangeEvent<HTMLSelectElement>) => void;
    deleteManagerStep: (index: number, event: MouseEvent) => void;
    setManagerTrack: (actions: ManagerAction[]) => void
}

export function ManagerTrackSettings(props: ManagerTrackSettingsProps) {
  return (<div className="manager-track-settings">
    <label>Manager Track:</label>
    <div className="manager-track-input">
      <ul>
        <li className="headers">
          <div>#</div>
          <div>Action</div>
          <div>Table #</div>
        </li>
        {props.managerTrack.map((step, index) => <ManagerTrackStep key={index} updateStep={props.updateManagerStep} deleteStep={props.deleteManagerStep} step={step} index={index} />)}
      </ul>
      <Plus class={"add-manager-track-step"} onClick={() => props.setManagerTrack([...props.managerTrack, ManagerAction.EMPTY])} />
    </div>
  </div>);
}
