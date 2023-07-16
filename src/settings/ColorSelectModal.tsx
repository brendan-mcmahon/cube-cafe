import React from "react";
import { Modal } from "../Modal";
import { colors } from "../colors";

type ColorSelectModalProps = {
  show: boolean,
  setShow: (show: boolean) => void,
  onSelect: (color: string) => void
}

export function ColorSelectModal(props: ColorSelectModalProps) {
  return (
    <Modal title="Select a Color" show={props.show} setShow={props.setShow}>
      <div className="color-options">
        {colors.map((color, index) => <div onClick={() => props.onSelect(color)} key={index} className={`color-option ${color}`}></div>)}
      </div>
    </Modal>
  );
}
