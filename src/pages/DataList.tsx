import React, { useState } from "react";
import { Game } from "../models/game";
import { SaveFile } from "../Components/SaveFile";
import { RoundTimer } from "../models/game";
import Chart from "./Chart";
import { AverageActionRoundData, getActionPerTurnData } from "./dataTools";
import { ResourceAction } from "../constants";


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

type DataListProps = {
  games: SaveFile[];
};
export function DataList(props: DataListProps) {
  const [serveData, setServeData] = useState<AverageActionRoundData[]>([]);
  const [serveCarData, setServeCarData] = useState<AverageActionRoundData[]>([]);
  const [rotationData, setRotationData] = useState<AverageActionRoundData[]>([]);

  React.useEffect(() => {
    setServeData(getActionPerTurnData(props.games.map(g => g.game), ResourceAction.SERVE));
    setServeCarData(getActionPerTurnData(props.games.map(g => g.game), ResourceAction.SERVE_CAR));
    setRotationData(getActionPerTurnData(props.games.map(g => g.game), [ResourceAction.ROTATE_CLOCKWISE, ResourceAction.ROTATE_COUNTERCLOCKWISE]));
  }, [props.games]);

  const getAverageRoundTimes = (games: Game[]) => {
    var arr = games.flatMap(g => g.statistics.roundTimers)
      .filter(t => !!t.end)
      .map(t => getTimeInSeconds(t));
    var sum = arr.reduce((prev, cur) => prev + cur, 0);
    return sum / arr.length;
  };

  return <div className="data">
    <div className="data-item">
      <label>Average Points</label>
      <p>{Math.round(props.games.reduce((acc, save) => acc + save.game.stars, 0) / props.games.length)}</p>
    </div>

    <div className="data-item">
      <label>Average Round Time</label>
      <p>{formatSecondsToMinutes(getAverageRoundTimes(props.games.map(g => g.game)))}</p>
    </div>

    <div className="data-item chart">
      <label>Average Customers Served</label>
      <Chart data={serveData} xAxisKey="roundNumber" xAxisLabel="round #" yAxisLabel="avg. served" />
      {/* <hr /> */}
    </div>

    <div className="data-item chart">
      <label>Average Cars Served</label>
      <Chart data={serveCarData} xAxisKey="roundNumber" xAxisLabel="round #" yAxisLabel="avg. served" />
      {/* <hr /> */}
    </div>

    <div className="data-item chart">
      <label>Average Rotations / Turn</label>
      <Chart data={rotationData} xAxisKey="roundNumber" xAxisLabel="round #" yAxisLabel="avg. rotations" />
      {/* <hr /> */}
    </div>
  </div>;
}
