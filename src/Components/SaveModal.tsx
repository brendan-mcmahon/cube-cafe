import React, { FormEvent } from "react";
import { Modal } from "../Modal";
import { useGame } from "../gameContext";
import "./styles/SaveModal.scss";
import { IModalProps } from "./IModalProps";
import storage from "./localStorageUtils";

export default function SaveDialog(props: IModalProps) {
  const { state } = useGame();

  const onSaveClicked = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const saveName = form.elements.namedItem("saveName") as HTMLInputElement;

    storage.saveGame(saveName.value, state, () => props.setShow(false));
  }

  return (
    <Modal title="Save Game" show={props.show} setShow={props.setShow}>
      <form id="SaveDialog" onSubmit={onSaveClicked}>
        <label htmlFor="saveName">
          Name:
          <input type="text" id="saveName" name="saveName" />
        </label>
        <button type="submit">Save</button>
      </form>
    </Modal>
  );
}
