import { useGame } from "./gameContext";
import { useEffect, useState } from "react";

function getTimeInSeconds(t) {
  return (new Date(t.end).getTime() - new Date(t.start).getTime()) / 1000;
}

function formatSecondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesStr = String(minutes).padStart(2, "0");
  const secondsStr = String(remainingSeconds).padStart(2, "0");

  return `${minutesStr}:${Math.round(secondsStr)}`;
}

function EndGame() {
  const { dispatch, state } = useGame();

  const getAverageRoundTime = () => {
    console.log(state.roundTimers);
    var arr = state.roundTimers.filter((t) => !!t.end).map((t) => getTimeInSeconds(t));
    console.log(arr);
    var sum = arr.reduce((prev, cur) => prev + cur, 0);
    return sum / arr.length;
  };

  const getAverageCustomerPointValue = () => {
    var arr = state.servedCustomers.map((c) => c.pointValue);
    var sum = arr.reduce((prev, cur) => prev + cur, 0);
    return sum / arr.length;
  };

  const getTotalTime = () => {
    var arr = state.roundTimers.filter((t) => !!t.end).map((t) => getTimeInSeconds(t));
    var sum = arr.reduce((prev, cur) => prev + cur, 0);
    return sum;
  };

  const [averageRound, setAverageRound] = useState(getAverageRoundTime());
  const [totalTime, setTotalTime] = useState(getTotalTime());
  const [averageCustomerPointValue, setAverageCustomerPointValue] = useState(getAverageCustomerPointValue());

  useEffect(() => {
    setAverageRound(getAverageRoundTime());
    setTotalTime(getTotalTime());
  }, [state.roundTimers]);

  useEffect(() => {
    setAverageCustomerPointValue(getAverageCustomerPointValue());
  }, [state.servedCustomers]);

  return (
    <div id="EndGame">
      <div className="stats-row">
        <label>Stars</label>
        <div className="value">{state.stars}</div>
      </div>

      {/* TODO */}
      <div className="stats-row">
        <label>Average Rating</label>
        <div className="value">{averageCustomerPointValue}</div>
      </div>

      {/* List each finished customer (round seated, round order taken, round served, color of order, star rating) */}

      <div className="stats-row">
        <label>Customers Served</label>
        <div className="value">{state.servedCustomers.length}</div>
      </div>

      <div className="stats-row">
        <label>Average Round Time</label>
        <div className="value">{formatSecondsToMinutes(averageRound)}</div>
      </div>

      {/* List each round: (time) */}

      <div className="stats-row">
        <label>Total Time</label>
        <div className="value">{formatSecondsToMinutes(totalTime)}</div>
      </div>

      <div className="stats-row">
        <label>Leftover Customers</label>
        <div className="value">{state.leftOverCustomers?.length}</div>
      </div>

      <div className="stats-row">
        <label>Rotations</label>
        <div className="value">{state.rotationCount}</div>
      </div>

      <button onClick={() => dispatch({ type: "ROUND_SETUP" })}>Play Again</button>
    </div>
  );
}

export default EndGame;
