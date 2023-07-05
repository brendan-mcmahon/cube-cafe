import React from "react";
import { useGame } from "./gameContext";
import { useEffect, useState } from "react";
import { GameAction } from "./constants";
import "./EndGame.scss";
import { RoundTimer } from "./game";
import Save from "./icons/Save";

function getTimeInSeconds(t: RoundTimer) {
  const end = t.end || new Date();
  return (new Date(end).getTime() - new Date(t.start).getTime()) / 1000;
}

function formatSecondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(Math.round(remainingSeconds)).padStart(2, "0");

  return `${minutesStr}:${secondsStr}`;
}

type EndGameProps = {
  setSaveOpen: (open: boolean) => void;
};

function EndGame({ setSaveOpen }: EndGameProps) {
  const { dispatch, state } = useGame();

  const getAverageRoundTime = () => {
    if (state.statistics.roundTimers.length === 0) {
      return 0;
    }
    var arr = state.statistics.roundTimers.filter((t) => !!t.end).map((t) => getTimeInSeconds(t));
    var sum = arr.reduce((prev, cur) => prev + cur, 0);
    return sum / arr.length;
  };

  const getAverageCustomerPointValue = (): string => {
    var arr = state.statistics.servedCustomers.map((c) => c.pointValue);
    var sum = arr.reduce((prev, cur) => prev + cur, 0);
    return (sum / arr.length).toFixed(2);
  };

  const getTotalTime = () => {
    var arr = state.statistics.roundTimers.filter((t) => !!t.end).map((t) => getTimeInSeconds(t));
    var sum = arr.reduce((prev, cur) => prev + cur, 0);
    return sum;
  };

  const [averageRound, setAverageRound] = useState<number>(getAverageRoundTime());
  const [totalTime, setTotalTime] = useState<number>(getTotalTime());
  const [averageCustomerPointValue, setAverageCustomerPointValue] = useState<string>(getAverageCustomerPointValue());

  useEffect(() => {
    setAverageRound(getAverageRoundTime());
    setTotalTime(getTotalTime());
  }, [state.statistics.roundTimers]);

  useEffect(() => {
    setAverageCustomerPointValue(getAverageCustomerPointValue());
  }, [state.statistics.servedCustomers]);

  return (
    <div id="EndGame">
      <div className="title">
        <h1>Game Over</h1>
      </div>
      <div className="buttons">
        <Save onClick={() => setSaveOpen(true)} />
        <button onClick={() => dispatch({ type: GameAction.ROUND_SETUP })}>Play Again</button>
      </div>
      <div className="stats-region customers">
        <h2>Customers</h2>
        <div className="stats-row">
          <label>Stars</label>
          <div className="value">{state.stars}</div>
        </div>

        <div className="stats-row">
          <label>Customers Served</label>
          <div className="value">{state.statistics.servedCustomers.length}</div>
        </div>

        <div className="stats-row">
          <label>Customers Not Served</label>
          <div className="value">{state.statistics.leftOverCustomers?.length}</div>
        </div>

        {/* List each finished customer (round seated, round order taken, round served, color of order, star rating) */}
        <div className="stats-row horizontal">
          <label>Customers</label>
          <div className="stats-list">
            {state.statistics.servedCustomers.map((c, i) => (
              <div key={i} className="value">
                <div className={`plate ${c.order}`}>{c.pointValue}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-row">
          <label>Average Stars / Customer</label>
          <div className="value">{averageCustomerPointValue}</div>
        </div>
      </div>

      <div className="stats-region time">
        <h2>Time</h2>
        <div className="stats-row">
          <label>Average Round Time</label>
          <div className="value">{formatSecondsToMinutes(averageRound)}</div>
        </div>
        <div className="stats-row">
          <label>Round Times</label>
          <div className="stats-list">
            {state.statistics.roundTimers.map((t, i) => (
              <div key={i} className="value">
                {formatSecondsToMinutes(getTimeInSeconds(t))}
              </div>
            ))}
          </div>
        </div>
        <div className="stats-row">
          <label>Total Time</label>
          <div className="value">{formatSecondsToMinutes(totalTime)}</div>
        </div>
      </div>

      <div className="stats-region player">
        <h2>Player Tactics</h2>
        <div className="stats-row">
          <label>Rotations</label>
          <div className="value">{state.statistics.rotationCount}</div>
        </div>

        <div className="stats-row">
          <label>Hot Food Served</label>
          <div className="value">{state.statistics.hotFoodServed}</div>
        </div>

        <div className="stats-row">
          <label>Cold Food Served</label>
          <div className="value">{state.statistics.coldFoodServed}</div>
        </div>

        <div className="stats-row">
          <label>Refills</label>
          <div className="value">{state.statistics.refillCount}</div>
        </div>

        <div className="stats-row">
          <label>Food Cooked</label>
          <div className="value">{state.statistics.foodCooked}</div>
        </div>

        <div className="stats-row">
          <label>Manager Actions / Total Steps</label>
          <div className="value">{state.statistics.managerActionsTaken} / {state.statistics.managerStepsMoved}</div>
        </div>

        <div className="stats-row">
          <label>Cooking without an Order</label>
          <div className="value">{state.statistics.itemsCookedWithNoOrder}</div>
        </div>

        <div className="stats-row">
          <label>Dishwasher Selections</label>
          <div className="stats-list">
            {state.statistics.roundTimers.map((t, i) => (
              <div key={i} className="value">
                {formatSecondsToMinutes(getTimeInSeconds(t))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default EndGame;
