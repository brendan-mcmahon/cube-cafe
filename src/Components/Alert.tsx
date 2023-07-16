import React from "react";
import { Modal } from "../Modal"
import { useGame } from "../gameContext";

type AlertProps = {
    show: boolean,
    setShow: (show: boolean) => void
}

export default function Alert(props: AlertProps ){

    const { state } = useGame();

    return <Modal title={state.alert?.title || ""} show={props.show} setShow={props.setShow} >
      <div id="alert-body">
        {state.alert?.text || ""}
        <div className="buttons">
            { !!state.alert?.confirm && <button onClick={() => state.alert?.confirm()}>{state.alert.confirmText}</button> }
            { !!state.alert?.cancel && <button onClick={() => state.alert?.cancel()}>{state.alert.cancelText}</button> }
        </div>
      </div>
    </Modal>
}

