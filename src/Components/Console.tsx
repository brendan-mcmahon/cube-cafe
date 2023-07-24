import React from "react";
import { useGame } from "../gameContext";
import { GameAction, ManualAction, PlayPhase, RoundPhase } from "../constants";
import Star from "../icons/Star";
import Gear from "../icons/Gear";
import "./styles/Console.scss";
import Save from "../icons/Save";
import Undo from "../icons/Undo";
import storage from "../storage";

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
    <h1>{state.settings.gameName}</h1>
      <div className="game-info">
        <div className="info">
          <p className="round">
            Round {state.round} / {state.settings.totalRounds}
          </p>
          <Star text={state.stars + state.bonusPoints} />
        </div>
      </div>

      <p className="instructions">{playPhase}</p>
      {state.roundPhase === RoundPhase.RESOLVE && (
        <button className="instructions" onClick={() => dispatch({ type: GameAction.ROUND_TEARDOWN })}>End Turn</button>
      )}

      <div className="buttons">

        {/* <Save onClick={() => setSaveOpen(true)} /> */}
        <Save onClick={() => storage.saveGame(state)} />

        <Gear onClick={() => setSettingsOpen(true)} />

        <button onClick={() => quitGame()}>Quit</button>

        <Undo onClick={() => dispatch({ type: ManualAction.UNDO })} disabled={state.actionHistory?.length === 0} />

      </div>
    </div>
  );
}

export default Console;
