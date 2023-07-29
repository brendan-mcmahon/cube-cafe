import React from "react";
import { useGame } from "../../gameContext";
import { ManualAction } from "../../constants";
import { colorValues } from "../../colors";
import Cube from "../../icons/Cube";

export type CounterProps = {
    name: string,
    reward: number,
    items: string[],
    disabled: boolean,
    selectedCustomerOrder: string | null
}

export function CounterTop(props: CounterProps) {

    const { state, dispatch } = useGame();

    const isDisabled = (food: string) => {
        const foodMatches = food === props.selectedCustomerOrder || (state.settings.cookWildsAsWild && food === "wild");
        return props.disabled || !foodMatches
    };

    return (
        <div className={`counter ${props.name}-counter ${state.upgrades.heatlamp ? "heated" : ""}`}>
            <label className={`${props.name}-label`}>+{props.reward}</label>

            {props.items?.map((food, i) => {
                const disabled = isDisabled(food);
                return (<button disabled={disabled} onClick={() => dispatch({
                    type: ManualAction.SELECT_FOOD,
                    foodIndex: i,
                    counter: props.name
                })} key={i} className={`food cube ${disabled ? "disabled" : ""}`}>
                    <Cube color={food} />
                </button>)
            })}
        </div>);
}
