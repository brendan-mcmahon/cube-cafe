import React from "react";
import { useGame } from "../../gameContext";

export function Grill() {
    const { state } = useGame();
    return <>
        <label className="grill-label">Grill</label>
        <div className="grill">
            <div className={`burner ${state.grillItems?.[0] || ""}`}></div>
            <div className={`burner ${state.grillItems?.[1] || ""}`}></div>
        </div>
    </>;
}
