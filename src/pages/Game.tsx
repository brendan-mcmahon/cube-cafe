import React, { useEffect, useState } from "react";
import { useGame } from "../gameContext";
import { GameAction, GamePhase, PlayPhase } from "../constants";
import GameOverScreen from "./GameOverScreen";
import { StartScreen } from "./StartScreen";
import { GameScreen } from "./GameScreen";
import Track from "../ManagerTrack/Track";
import Cube from "../icons/Cube";
import storage from "../storage";
import DataScreen from "./DataScreen";

export default function Game() {
  // const isMobile = useIsMobile();
  const isMobile = true;
  const { state, dispatch } = useGame();
  const [alertOpen, setAlertOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [availablePlatesOpen, setAvailablePlatesOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [managerBonusOpen, setManagerBonusOpen] = useState(false);
  const [showDataScreen, setShowDataScreen] = useState(false);

  useEffect(() => {
    // check if the user has a saved game in local storage
    const autoSave = storage.loadAutosave();
    if (autoSave) {
      dispatch({ type: GameAction.LOAD_GAME, game: autoSave });
    }
  }, []);

  useEffect(() => {
    setAvailablePlatesOpen(state.playPhase === PlayPhase.PLATE_SELECTION_PHASE);
    setManagerBonusOpen(state.playPhase === PlayPhase.MANAGER_BONUS_PHASE);
  }, [state.roundPhase, state.playPhase]);

  switch (state.gamePhase) {
    case GamePhase.NOT_STARTED:
      return showDataScreen ? <DataScreen setShowDataScreen={setShowDataScreen}  /> : (
        <StartScreen loadModalOpen={loadModalOpen} setLoadModalOpen={setLoadModalOpen} settingsModalOpen={settingsOpen} setSettingsModalOpen={setSettingsOpen} setShowDataScreen={setShowDataScreen}></StartScreen>
      );
    case GamePhase.IN_PROGRESS:
      return (
        <GameScreen 
          isMobile={isMobile}
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          settingsOpen={settingsOpen}
          setSettingsOpen={setSettingsOpen}
          availablePlatesOpen={availablePlatesOpen}
          setAvailablePlatesOpen={setAvailablePlatesOpen}
          saveModalOpen={saveModalOpen}
          setSaveModalOpen={setSaveModalOpen}
          loadModalOpen={loadModalOpen}
          setLoadModalOpen={setLoadModalOpen} 
          managerBonusOpen={managerBonusOpen}
          setManagerBonusOpen={setManagerBonusOpen}
          />
      );
    case GamePhase.FINISHED:
      return <GameOverScreen setSaveOpen={setSaveModalOpen} />;
  }
}
