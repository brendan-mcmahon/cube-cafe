import React, { useEffect } from "react";
import "./styles/History.scss";
import { useGame } from "../gameContext";
import { ManualAction } from "../constants";
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

  return (
    <div id="History" className="game-area">
      <div className="header">
        <h2>History</h2>
        <Undo onClick={() => dispatch({ type: ManualAction.UNDO })} disabled={state.actionHistory?.length === 0} />
      </div>
      <ul>
        {state.actionHistory?.map((action, i) => (
          <li key={i}>{action}</li>
        ))}

        
        {/* {histories?.map((moment, i) => (
          <li key={i}>{moment.index}: {moment.table.customer?.status}</li>
        ))} */}
      </ul>
    </div>
  );
}
