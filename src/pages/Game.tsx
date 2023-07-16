import React, { useEffect, useState } from "react";
import { useGame } from "../gameContext";
import { GamePhase, PlayPhase } from "../constants";
import GameOverScreen from "./GameOverScreen";
import { StartScreen } from "./StartScreen";
import { GameScreen } from "./GameScreen";


export default function Game() {
  // const isMobile = useIsMobile();
  const isMobile = true;
  const { state } = useGame();
  const [alertOpen, setAlertOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [availablePlatesOpen, setAvailablePlatesOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [loadModalOpen, setLoadModalOpen] = useState(false);

  useEffect(() => {
    setAvailablePlatesOpen(state.playPhase === PlayPhase.SELECT_PLATE);
  }, [state.roundPhase, state.playPhase]);

  switch (state.gamePhase) {
    case GamePhase.NOT_STARTED:
      return (
        <StartScreen loadModalOpen={loadModalOpen} setLoadModalOpen={setLoadModalOpen} settingsModalOpen={settingsOpen} setSettingsModalOpen={setSettingsOpen}></StartScreen>
      );
    case GamePhase.IN_PROGRESS:
      return (
        <GameScreen isMobile={isMobile} alertOpen={alertOpen} setAlertOpen={setAlertOpen} settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} availablePlatesOpen={availablePlatesOpen} setAvailablePlatesOpen={setAvailablePlatesOpen} saveModalOpen={saveModalOpen} setSaveModalOpen={setSaveModalOpen} loadModalOpen={loadModalOpen} setLoadModalOpen={setLoadModalOpen}></GameScreen>
      );
    case GamePhase.FINISHED:
      return <GameOverScreen setSaveOpen={setSaveModalOpen} />;
  }
}
