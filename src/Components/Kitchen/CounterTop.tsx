import React from "react";
import { useGame } from "../../gameContext";
import { ManualAction } from "../../constants";

export type CounterProps = {
    name: string,
    reward: number,
    items: string[],
    disabled: boolean,
    selectedCustomerOrder: string | null
}

export function CounterTop(props: CounterProps) {

    const { state, dispatch } = useGame();

    return (<div className={`counter ${props.name}-counter ${state.upgrades.heatlamp ? "heated" : ""}`}>
        <label className={`${props.name}-label`}>+{props.reward}</label>

        {props.items?.map((food, i) => <button disabled={props.disabled || food !== props.selectedCustomerOrder} onClick={() => dispatch({
            type: ManualAction.SELECT_FOOD,
            foodIndex: i,
            counter: props.name
        })} key={i} className={`food cube ${food} ${props.disabled || food !== props.selectedCustomerOrder ? "disabled" : ""}`}></button>)}
    </div>);
}
