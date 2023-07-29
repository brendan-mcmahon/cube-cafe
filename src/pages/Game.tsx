import React, { useEffect, useState } from "react";
import { useGame } from "../gameContext";
import { GamePhase, PlayPhase } from "../constants";
import GameOverScreen from "./GameOverScreen";
import { StartScreen } from "./StartScreen";
import { GameScreen } from "./GameScreen";
import Track from "../ManagerTrack/Track";
import Cube from "../icons/Cube";


export default function Game() {
  // const isMobile = useIsMobile();
  const isMobile = false;
  const { state } = useGame();
  const [alertOpen, setAlertOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [availablePlatesOpen, setAvailablePlatesOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [managerBonusOpen, setManagerBonusOpen] = useState(false);

  useEffect(() => {
    setAvailablePlatesOpen(state.playPhase === PlayPhase.PLATE_SELECTION_PHASE);
    setManagerBonusOpen(state.playPhase === PlayPhase.MANAGER_BONUS_PHASE);
  }, [state.roundPhase, state.playPhase]);

  // return <Cube />;

  switch (state.gamePhase) {
    case GamePhase.NOT_STARTED:
      return (
        <StartScreen loadModalOpen={loadModalOpen} setLoadModalOpen={setLoadModalOpen} settingsModalOpen={settingsOpen} setSettingsModalOpen={setSettingsOpen}></StartScreen>
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
