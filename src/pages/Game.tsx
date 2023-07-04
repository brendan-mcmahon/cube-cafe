import React, { useEffect, useState } from "react";
import { useGame } from "../gameContext";
import Tables from "../Components/Tables";
import Kitchen from "../Components/Kitchen";
import { GamePhase, PlayPhase } from "../constants";
import AvailablePlatesModal from "../Components/AvailablePlatesModal";
import SettingsModal from "../settings/SettingsModal";
import Console from "../Components/Console";
import Dishwasher from "../Components/Dishwasher";
import History from "../Components/History";
import Tableau from "../Tableau";
import DriveThru from "../Components/DriveThru";
import EndGame from "../EndGame";
import SaveModal from "../Components/SaveModal";
import SavedGamesModal from "../Components/SavedGamesModal";
import { GameAction } from "../constants";

export default function Game() {
  const { dispatch, state } = useGame();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [availablePlatesOpen, setAvailablePlatesOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [loadModalOpen, setLoadModalOpen] = useState(false);

  useEffect(() => {
    setAvailablePlatesOpen(state.playPhase === PlayPhase.SELECT_PLATE);
  }, [state.roundPhase, state.playPhase]);

  if (state.gamePhase === GamePhase.NOT_STARTED) {
    return (
      <div className="start-screen">
        <h1>Cube Café</h1>
        <div className="buttons">
          <button onClick={() => dispatch({ type: GameAction.ROUND_SETUP })}>Start</button>
          <button onClick={() => setLoadModalOpen(true)}>Saved Games</button>
        </div>
        <SavedGamesModal show={loadModalOpen} setShow={setLoadModalOpen} />
      </div>
    );
  }

  if (state.gamePhase === GamePhase.FINISHED) {
    return <EndGame />;
  }

  return (
    <div id="Game">
      <Console setSettingsOpen={setSettingsOpen} setSaveOpen={setSaveModalOpen} />
      <SettingsModal show={settingsOpen} setShow={setSettingsOpen} />
      <SaveModal show={saveModalOpen} setShow={setSaveModalOpen} />
      <SavedGamesModal show={loadModalOpen} setShow={setLoadModalOpen} />
      <Dishwasher />
      <Tableau />
      <DriveThru />
      <AvailablePlatesModal show={availablePlatesOpen} setShow={setAvailablePlatesOpen} />
      <Tables />
      <Kitchen />
      <History />
      <div id="Debug">
        {/* <pre>{JSON.stringify(state.statistics)}</pre> */}
        {/* <EndGame /> */}
      </div>
    </div>
  );
}
