import React, { useEffect, useState } from "react";
import { GamePhase } from "../constants";
import "./GameOverScreen.scss";
import storage from "../storage";
import { SaveFile } from "../Components/SaveFile";
import "./DataScreen.scss";
import { DataList } from "./DataList";

function DataScreen({ setShowDataScreen }: { setShowDataScreen: (show: boolean) => void }) {
  const [savedGames, setSavedGames] = useState<SaveFile[]>([]);
  const [displayGames, setDisplayGames] = useState<SaveFile[]>([]);
  const [progressFilter, setProgressFilter] = useState<string>("all");
  const [userFilter, setUserFilter] = useState<string>("all");
  const [doneLoading, setDoneLoading] = useState<boolean>(false);

  useEffect(() => {
    setDoneLoading(false);
    storage.getSavedGames().then((games) => {
      setSavedGames(games);
      setDisplayGames(games);
      setDoneLoading(true);
    });
  }, []);

  useEffect(() => {
    let games = [...savedGames];
    if (progressFilter === "inProgress") {
      games = games.filter((g) => g.game.gamePhase === GamePhase.IN_PROGRESS);
    }
    if (progressFilter === "completed") {
      games = games.filter((g) => g.game.gamePhase === GamePhase.FINISHED);
    }
    if (userFilter !== "all") {
      games = games.filter((g) => g.user === userFilter);
    }
    setDisplayGames(games);
  }, [progressFilter, userFilter, savedGames]);


  if (!doneLoading) {
    return <div>Loading...</div>;
  }

  const uniqueUsers = savedGames
    .reduce<string[]>((unique, save) => {
      return unique.includes(save.user) ? unique : [...unique, save.user];
    }, [])
    .map((user, index: number) => {
      return (
        <option value={user} key={index}>{user}</option>
      );
    });

  return (
    <div id="AggregateData">
      <div className="title">
        <h1>Aggregate Data</h1>
        <div className="buttons">
          <button onClick={() => setShowDataScreen(false)}>Home</button>
        </div>
      </div>

      {/* Add filters for each of the different settings */}
      <div className="filters">
        <div className="filter">
          <label htmlFor="progress-filter">Progress</label>
          <select id="progress-filter" onChange={e => setProgressFilter(e.target.value)} >
            <option value="all">All</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filter">
          <label htmlFor="player-filter">Player</label>
          <select id="player-filter" onChange={e => setUserFilter(e.target.value)} >
            <option value="all">All</option>
            {/* get unique users */}

            {uniqueUsers}
          </select>
        </div>
      </div>

      <p className="results-count">Results: {displayGames.length}</p>

      {/* <div className="game-list">
          {displayGames?.map((save, index: number) => {
            return (
              <div className="game" key={index}>
                <div className="info">
                  <p className="saved-game-name">
                    {save.name}
                  </p>
                  <p className="saved-game-date">{new Date(save.date).toLocaleString("en-US")}</p>
                  <p className="saved-game-stars">{save.game.stars}</p>
                  <p className={`saved-game-phase ${save.game.gamePhase}`}>{save.game.gamePhase}</p>
                  <p className="saved-game-player">{save.user}</p>
                  <hr />
                </div>
              </div>
            )
          })}
        </div> */}

      {displayGames.length > 0 ? <DataList games={displayGames} /> : <div>No games found</div>}
    </div>
  );
}

export default DataScreen;
