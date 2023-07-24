import React, { useEffect } from "react";
import { PlayPhase, ResourceStatus, ResourceAction } from "../constants";
import { useGame } from "../gameContext";

type SliceProps = {
    action: ResourceAction;
    rotation: number;
    size?: "half" | "full";
};

export function Slice({action, rotation, size = "full"}: SliceProps) {
    const { state, dispatch } = useGame();
    const [enabled, setEnabled] = React.useState(false);

    useEffect(() => {
        setEnabled(state.availableActions.includes(action));
    }, [state.availableActions, action]);


    const dispatchAction = () => {
        if (state.playPhase === PlayPhase.SELECT_ACTION && state.availableActions.includes(action)) {
            dispatch({ type: action });
        }
    };

    const endpoint = size === "half" ? "167.09 20.33" : "205 73";

    return (
        <path
            className={`slice ${enabled ? "enabled" : ""}`}
            fill="none"
            // stroke="gray"
            // strokeWidth="1px"
            pointerEvents="all"
            onClick={dispatchAction}
            transform={`rotate(${rotation}, 105, 105)`}
            d={`M105 105 L105 0 A 105 105 0 0 1 ${endpoint} z`} />
    );
}
