import React, { useEffect } from "react";
import { useGame } from "../../gameContext";
import { ManualAction } from "../../constants";

export function Freezer() {
    const { state, dispatch } = useGame();

    const thaw = () => {
        dispatch({ type: ManualAction.THAW_RESOURCE });
    }

    const freeze = () => {
        dispatch({ type: ManualAction.FREEZE_RESOURCE });
    }

    const body = state.freezerItems.length > 0
        ? state.freezerItems.map((item, index) => 
            <div onClick={thaw} key={index} className={`freezer-item ${item.color}`}>
            </div>
        )
        : <div onClick={freeze} className={`freezer-item empty`}></div>;

    return <><label className="freezer-label">Freezer</label>
        <div className="freezer">
            {body}
        </div>
    </>;
}
