import React, { useEffect } from "react";
import { PlayPhase, ManualAction, CustomerStatus, ResourceAction } from "../constants";
import { useGame } from "../gameContext";
import Meeple from "../icons/Meeple";
import "./styles/Tables.scss";
import { Customer } from "../game";

type TableProps = {
  customer: Customer | null;
  index: number;
};

export default function Table(props: TableProps) {
  const { state, dispatch } = useGame();

  if (!props.customer) {
    return <button 
    disabled
     className={`customer empty disabled`}
     >
     <p className="table-number">{props.index + 1}</p></button>;
  }

  let disabled = true;

  switch (state.currentAction) {
    case ResourceAction.SERVE:
      disabled =
        !props.customer.order ||
        props.customer.status === CustomerStatus.EATING ||
        (!state.hotCounterItems.includes(props.customer.order) && !state.coldCounterItems.includes(props.customer.order));
      break;
    case ResourceAction.TAKE_ORDER:
      disabled = !!props.customer.order;
      break;
    case ResourceAction.REFILL:
    case ManualAction.INCREASE_ONE_CUSTOMER:
      disabled = props.customer.pointValue === 5;
      break;
    default:
      disabled = true;
      break;
  }

  if (state.playPhase !== PlayPhase.SELECT_CUSTOMER) {
    disabled = true;
  }

  return (
    <button
      disabled={disabled}
      className={`customer ${props.customer.status} ${disabled ? "disabled" : ""}`}
      onClick={() => dispatch({ type: ManualAction.SELECT_CUSTOMER, customerIndex: props.index })}
    >
      <p className="table-number">{props.index + 1}</p>
      <Meeple number={props.customer.pointValue} />
      {!!props.customer.order && (
        <div className={`plate ${props.customer.order}`}>
          {props.customer.status === CustomerStatus.EATING && <div className={`cube ${props.customer.order}`}></div>}
        </div>
      )}
    </button>
  );
}
