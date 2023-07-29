import React from "react";
import { useGame } from "../../gameContext";
import Cube from "../../icons/Cube";
import { colorValues } from "../../colors";
import { fillTo } from "../../utilities";

export function Grill() {
    const { state } = useGame();

    const foods = fillTo(2, state.grillItems);

    return <>
        <label className="grill-label">Grill</label>
        <div className="grill">
            {foods.map((food, i) => (
                <div key={i} className="burner">
                    {!!food && <Cube color={food} />}
                </div>
            ))}
        </div>
    </>;
}
