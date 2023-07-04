import React, { useEffect, useState } from "react";
import { PlayPhase } from "../constants";
import { useGame } from "../gameContext";
import { ManualAction } from "../constants";
import "./styles/NewKitchen.scss";

function NewKitchen() {
    const { state, dispatch } = useGame();
    const [disabled, setDisabled] = useState(state.playPhase !== PlayPhase.SELECT_FOOD);
    const [selectedCustomerOrder, setSelectedCustomerOrder] = useState<string | null>(null);

    useEffect(() => {
        setDisabled(state.playPhase !== PlayPhase.SELECT_FOOD);
    }, [state.playPhase]);

    useEffect(() => {
        if (state.selectedCustomerIndex === 0 || !!state.selectedCustomerIndex) {
            const customerOrder = state.customers[state.selectedCustomerIndex]?.order || null;
            setSelectedCustomerOrder(customerOrder);
        }
    }, [state.selectedCustomerIndex, state.customers]);

    return (
        <div id="NewKitchen">
            <label className="grill-label">grill</label>
            <div className="grill">
                <div className={`burner ${state.grillItems?.[0] || ""}`}></div>
                <div className={`burner ${state.grillItems?.[1] || ""}`}></div>
            </div>

            <label className="hot-label">+{state.settings.hotFoodReward}</label>
            <div className="counter hot-counter">
                {state.hotCounterItems?.map((food, i) => (
                    <button
                        disabled={disabled || food !== selectedCustomerOrder}
                        onClick={() => dispatch({ type: ManualAction.SELECT_FOOD, foodIndex: i, counter: "hot" })}
                        key={i}
                        className={`food cube ${food} ${disabled || food !== selectedCustomerOrder ? "disabled" : ""}`}
                    ></button>
                ))}
            </div>
            <label className="cold-label">+{state.settings.coldFoodPenalty}</label>
            <div className="counter cold-counter">
                {state.coldCounterItems?.map((value, i) => (
                    <button
                        disabled={disabled || value !== selectedCustomerOrder}
                        onClick={() => dispatch({ type: ManualAction.SELECT_FOOD, foodIndex: i, counter: "cold" })}
                        key={i}
                        className={`food cube ${value} ${disabled || value !== selectedCustomerOrder ? "disabled" : ""}`}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default NewKitchen;
