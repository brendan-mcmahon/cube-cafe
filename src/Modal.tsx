import React from "react";
import "./Modal.scss";
import X from "./icons/X";

// TODO: This is a name collision with another thing. We should figure that out? Maybe the other one should be an interface that this implements?
type ModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export function Modal(props: ModalProps) {
  if (!props.show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1>{props.title}</h1>
          <span className="close" onClick={() => props.setShow(false)}>
            <X />
          </span>
        </div>
        <div className="modal-body">{props.children}</div>
      </div>
    </div>
  );
}
