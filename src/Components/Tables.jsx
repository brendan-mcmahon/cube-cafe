import { Fragment } from "react";
import { PlayPhases, PlayerActions } from "../constants";
import { useGame } from "../gameContext";
import Manager from "../icons/Manager";
import Meeple from "../icons/Meeple";
import "./styles/Tables.scss";
import Arrow from "../icons/Arrow";

function Table({ customer, index }) {
  const { state, dispatch } = useGame();

  if (!customer) {
    return <button disabled className={`customer empty disabled`}></button>;
  }

  let disabled = true;

  switch (state.currentAction) {
    case PlayerActions.SERVE:
      disabled =
        !customer.order ||
        customer.status === "eating" ||
        (!state.hotCounterItems.includes(customer.order) && !state.coldCounterItems.includes(customer.order));
      break;
    case PlayerActions.TAKE_ORDER:
      disabled = !!customer.order;
      break;
    case PlayerActions.REFILL:
      disabled = customer.value === 5;
      break;
    case PlayerActions.INCREASE_ONE_CUSTOMER:
      disabled = customer.value === 5;
      break;
    default:
      disabled = true;
      break;
  }

  if (state.playPhase !== PlayPhases.SELECT_CUSTOMER) {
    disabled = true;
  }

  return (
    <button
      disabled={disabled}
      className={`customer ${customer.status} ${disabled ? "disabled" : ""}`}
      onClick={() => dispatch({ type: "SELECT_CUSTOMER", customerIndex: index })}
    >
      <Meeple number={customer.pointValue} />
      {!!customer.order && (
        <div className={`plate ${customer.order}`}>
          {customer.status === "eating" && <div className={`cube ${customer.order}`}></div>}
        </div>
      )}
    </button>
  );
}

function Tables() {
  const { state } = useGame();

  const ThreeTables =
    '"table1 table1 table1 table2 table2 table2" ". . table3 table3 . ." "track track track track track track"';
  const TwoTables = '"table1 table1 table1 table2 table2 table2" "track track track track track track"';
  const tableGrid = {
    gridTemplateRows: state.customers.length === 3 ? "repeat(2, 1fr) 0.5fr" : "1fr 0.5fr",
    gridTemplateAreas: state.customers.length === 3 ? ThreeTables : TwoTables,
  };
  return (
    // if customers count is 3, grid-template-rows: repeat(2, 1fr) 0.5fr; otherwise, grid-template-rows: 1fr 0.5fr;
    <div id="Tables" style={tableGrid}>
      <Table customer={state.customers[0]} index={0}></Table>
      <Table customer={state.customers[1]} index={1}></Table>
      {state.customers.length === 3 && <Table customer={state.customers[2]} index={2}></Table>}
      <div className="manager-track">
        {state.settings.managerTrack?.map((stop, index) => (
          <Fragment key={index}>
            <div className="stop-container">
              <div className="stop">{state.managerPosition === index && <Manager />}</div>
              <p>{stop === "empty" ? "" : stop}</p>
            </div>
            {index < state.settings.managerTrack.length - 1 && <Arrow />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Tables;
