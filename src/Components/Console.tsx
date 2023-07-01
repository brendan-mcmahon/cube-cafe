import React from "react";
import { useGame } from "../gameContext";
import { GameAction, PlayPhase, RoundPhase } from "../constants";
import Star from "../icons/Star";
import Gear from "../icons/Gear";
import "./styles/Console.scss";
import Save from "../icons/Save";

const instructionsMap: { [key in PlayPhase]?: string } = {
  [PlayPhase.SELECT_RESOURCE]: "Select a resource",
  [PlayPhase.SELECT_ACTION]: "Select an action",
  [PlayPhase.SELECT_PLATE]: "Select a plate",
  [PlayPhase.SELECT_CUSTOMER]: "Select a customer",
  [PlayPhase.SELECT_FOOD]: "Select a food",
};

type ConsoleProps = {
  setSettingsOpen: (open: boolean) => void;
  setSaveOpen: (open: boolean) => void;
};

function Console({ setSettingsOpen, setSaveOpen }: ConsoleProps) {
  const { state, dispatch } = useGame();
  let playPhase = "";

  if (state.roundPhase === RoundPhase.PLAY) {
    playPhase = instructionsMap[state.playPhase] || "";
  }

  const quitGame = () => {
    dispatch({ type: GameAction.QUIT_GAME });
  };

  return (
    <div id="Console">
      <p className="round">
        Round {state.round} / {state.settings.totalRounds}
      </p>
      <p className="instructions">{playPhase}</p>

      <Star text={state.stars} />

      <div className="buttons">
        {state.roundPhase === RoundPhase.RESOLVE && (
          <button onClick={() => dispatch({ type: GameAction.ROUND_TEARDOWN })}>End Turn</button>
        )}
        <Save onClick={() => setSaveOpen(true)} />

        <Gear onClick={() => setSettingsOpen(true)} />

        <button onClick={() => quitGame()}>Quit</button>
      </div>
    </div>
  );
}

export default Console;
