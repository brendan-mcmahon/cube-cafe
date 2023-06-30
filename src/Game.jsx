import { useGame } from "./gameContext";
import Tables from "./Components/Tables";
import Kitchen from "./Components/Kitchen";
import { GamePhases, PlayPhases } from "./constants";
import AvailablePlates from "./Components/AvailablePlates";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import SettingsModal from "./settings/SettingsModal";
import Console from "./Components/Console";
import Dishwasher from "./Components/Dishwasher";
import History from "./Components/History";
import Tableau from "./Tableau";
import DriveThru from "./Components/DriveThru";
import EndGame from "./EndGame";
import SaveModal from "./SaveModal";
import SavedGamesModal from "./SavedGamesModal";

function Game() {
  const { dispatch, state } = useGame();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [availablePlatesOpen, setAvailablePlatesOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [loadModalOpen, setLoadModalOpen] = useState(false);

  useEffect(() => {
    setAvailablePlatesOpen(state.playPhase === PlayPhases.SELECT_PLATE);
  }, [state.roundPhase, state.playPhase]);

  if (state.gamePhase === GamePhases.NOT_STARTED) {
    return (
      <div className="start-screen">
        <h1>Cube Cafe</h1>
        <div className="buttons">
          <button onClick={() => dispatch({ type: "ROUND_SETUP" })}>Start</button>
          <button onClick={() => setLoadModalOpen(true)}>Saved Games</button>
        </div>
        <SavedGamesModal show={loadModalOpen} setShow={setLoadModalOpen} />
      </div>
    );
  }

  if (state.gamePhase === GamePhases.FINISHED) {
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
      <Modal show={availablePlatesOpen} setShow={setAvailablePlatesOpen}>
        <AvailablePlates />
      </Modal>
      <Tables />
      <Kitchen />
      <History />
      <EndGame />
    </div>
  );
}

export default Game;
