import React, { useEffect } from "react";
import "./styles/History.scss";
import { useGame } from "../gameContext";
import { Action } from "../Action";
import { ManualAction, ResourceAction } from "../constants";
import Undo from "../icons/Undo";
import { Game, TableModel } from "../models/game";

export default function History() {
  const { state, dispatch } = useGame();

  // const histories: { table: TableModel, index: number }[] = [];
  // let i = 0;

  // useEffect(() => {
  //   getHistories(state);
  // }, [state])

  // const getHistories = (history: Game) => {
  //   if (!history.history) {
  //     histories.push({ table: history.tables[0], index: i });
  //     i++;
  //   } else {
  //     getHistories(history.history);
  //   }
  // }

  const getHistoryListItem = (action: Action) => {

    // Action contains many types | together. I need to figure out which type it is and then use that type to get the correct data.
    // I think I need to use a switch statement here.

    switch (action.type) {
      case ManualAction.SELECT_RESOURCE:
        return (<span>Selected {action.resource?.color} resource</span>);
      case ManualAction.SELECT_TABLE:
        return (<span>Selected table #{action.tableIndex+1}</span>);
      default:
        return (<span>{action.type}</span>);
    }
  }

  return (
    <div id="History" className="game-area">
      <div className="header">
        <h2>History</h2>
        <Undo onClick={() => dispatch({ type: ManualAction.UNDO })} disabled={state.actionHistory?.length === 0} />
      </div>
      <ul>
        {/* {state.actionHistory?.map((action, i) => (
          <li key={i}>{action}</li>
        ))} */}

        {state.playbackHistory.rounds?.map((round, i) => (
          <li key={i}>
            <h4>Round {i}</h4>
            {round?.actions.map((action, j) => (
              <li key={j}>{getHistoryListItem(action)}</li>
            ))}
          </li>
        ))}


        {/* {histories?.map((moment, i) => (
          <li key={i}>{moment.index}: {moment.table.customer?.status}</li>
        ))} */}
      </ul>
    </div>
  );
}
