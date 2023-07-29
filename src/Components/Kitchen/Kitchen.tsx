import React, { useEffect, useState } from "react";
import { PlayPhase } from "../../constants";
import { useGame } from "../../gameContext";
import "./Kitchen.scss";
import { Grill } from "./Grill";
import { CounterTop } from "./CounterTop";
import { Freezer } from "./Freezer";

function Kitchen() {
    const { state } = useGame();
    const [disabled, setDisabled] = useState(state.playPhase !== PlayPhase.SELECT_FOOD);
    const [selectedCustomerOrder, setSelectedCustomerOrder] = useState<string | null>(null);

    useEffect(() => {
        setDisabled(state.playPhase !== PlayPhase.SELECT_FOOD);
    }, [state.playPhase]);

    useEffect(() => {
        if (state.selectedTableIndex === 0 || !!state.selectedTableIndex) {
            const customerOrder = state.tables[state.selectedTableIndex].customer?.order || null;
            setSelectedCustomerOrder(customerOrder);
        }
    }, [state.selectedTableIndex, state.tables]);

    return (
        <div id="Kitchen" className={`game-area ${state.upgrades.heatlamp ? "heated" : ""}`}>

            <Grill />

            { state.upgrades.freezer && <Freezer /> }

            <label className="counters-label">Counter</label>

            <CounterTop name="hot" reward={state.settings.hotFoodReward} items={state.hotCounterItems} disabled={disabled} selectedCustomerOrder={selectedCustomerOrder} />
            
            { !state.upgrades.heatlamp && <CounterTop name="cold" reward={state.settings.coldFoodPenalty} items={state.coldCounterItems} disabled={disabled} selectedCustomerOrder={selectedCustomerOrder} /> }
           
        </div>
    );
}

export default Kitchen;
