import React from "react";
import { PlayPhase, ManualAction, CustomerStatus, ResourceAction, RefillStatus } from "../constants";
import { useGame } from "../gameContext";
import Meeple from "../icons/Meeple";
import "./styles/Tables.scss";
import { Game } from "../models/game";
import { TableModel } from "../models/game";
import Drink from "../icons/Drink";

type TableProps = {
  table: TableModel;
  index: number;
};

export default function Table(props: TableProps) {
  const { state, dispatch } = useGame();

  if (!props.table) {
    return <button
      disabled
      className={`customer empty disabled`}
    >
      <p className="table-number">{props.index + 1}</p></button>;
  }

  const onSelect = () => dispatch({ type: ManualAction.SELECT_TABLE, tableIndex: props.index });
  const onPlateSelect = () => dispatch({ type: ManualAction.CLEAR_TABLE, tableIndex: props.index  });

  let enabled = false;

  const hasOrder = !!props.table.customer?.order;
  const couldBeHappier = (props.table.customer?.pointValue || 0) < 5;
  const hasCustomer = !!props.table.customer;
  const isEating = props.table.customer?.status === CustomerStatus.EATING;
  const orderIsOnTheCounter = counterContains(state, props.table.customer?.order!);
  const cookWildsAsWild = state.settings.cookWildsAsWild && counterContains(state, "wild");
  const hasPlate = !!props.table.plate;

  switch (state.currentAction) {
    case ResourceAction.SERVE:
      enabled = hasCustomer && hasOrder && !isEating && (cookWildsAsWild || orderIsOnTheCounter);
      break;
    case ResourceAction.TAKE_ORDER:
      enabled = hasCustomer && !hasOrder;
      break;
    case ResourceAction.REFILL:
      enabled = hasCustomer && couldBeHappier && (state.settings.refillMode === "unlimited" || props.table.customer?.refillStatus === RefillStatus.EMPTY);
      break;
    case ManualAction.INCREASE_ONE_CUSTOMER:
      enabled = hasCustomer && couldBeHappier;
      break;
    default:
      enabled = false;
      break;
  }

  let drink = null;
  if (!!props.table.customer) {
    drink = <Drink isFull={props.table.customer.refillStatus === RefillStatus.FULL} />
  }

  let plate = null;
  if (!!props.table.plate) {
    plate = <button disabled={!!props.table.customer} onClick={onPlateSelect} className={`plate ${props.table.plate}`}>
      {props.table.customer?.status === "eating" && <div className={`cube ${props.table.plate}`}></div>}
    </button>
  }

  let customer = null;
  if (!!props.table.customer) {
    customer = <Meeple number={props.table.customer.pointValue} />
  }

  return (
    <button
      disabled={!enabled}
      className={`customer ${props.table.customer?.status} ${!enabled ? "disabled" : ""}`}
      onClick={onSelect}
    >
      <p className="table-number">{props.index + 1}</p>

      {customer}
      {plate}
      {drink}
    </button>
  );
}
function counterContains(state: Game, food: string) {
  return state.hotCounterItems.includes(food) || state.coldCounterItems.includes(food);
}

