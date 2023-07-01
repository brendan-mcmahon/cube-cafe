import React, { useEffect } from "react";
import { PlayPhase, ResourceStatus, ResourceAction } from "../constants";
import { useGame } from "../gameContext";

type SliceProps = {
    action: ResourceAction;
    rotation: number;
};

export function Slice(props: SliceProps) {
    const { state, dispatch } = useGame();
    const [enabled, setEnabled] = React.useState(false);

    useEffect(() => {
        setEnabled(state.availableActions.includes(props.action));
    }, [state.availableActions, props.action]);


    const dispatchAction = () => {
        if (state.playPhase === PlayPhase.SELECT_ACTION && state.availableActions.includes(props.action)) {
            dispatch({ type: props.action });
        }
    };

    return (
        <path
            className={`slice ${enabled ? "enabled" : ""}`}
            fill="none"
            pointerEvents="all"
            onClick={dispatchAction}
            transform={`rotate(${props.rotation}, 105, 105)`}
            d="M105 105 L105 0 A 105 105 0 0 1 205 73 z" />
    );
}
