import { useGame } from "../gameContext";
import { PlayPhases, RoundPhases } from "../constants";
import Star from "../icons/Star";
import Gear from "../icons/Gear";
import "./styles/Console.scss";
import Save from "../icons/Save";

const instructionsMap = {
  [PlayPhases.SELECT_RESOURCE]: "Select a resource",
  [PlayPhases.SELECT_ACTION]: "Select an action",
  [PlayPhases.SELECT_PLATE]: "Select a plate",
  [PlayPhases.SELECT_CUSTOMER]: "Select a customer",
  [PlayPhases.SELECT_FOOD]: "Select a food",
};

function Console({ setSettingsOpen, setSaveOpen }) {
  const { state, dispatch } = useGame();
  let playPhase = "";

  if (state.roundPhase === RoundPhases.PLAY) {
    playPhase = instructionsMap[state.playPhase];
  }

  const quitGame = () => {
    dispatch({ type: "QUIT_GAME" });
  };

  return (
    <div id="Console">
      <p className="round">
        Round {state.round} / {state.settings.totalRounds}
      </p>
      <p className="instructions">{playPhase}</p>

      <Star text={state.stars} />

      <div className="buttons">
        {state.roundPhase === RoundPhases.RESOLVE && (
          <button onClick={() => dispatch({ type: "ROUND_TEARDOWN" })}>End Turn</button>
        )}
        <Save onClick={() => setSaveOpen(true)} />

        <Gear onClick={() => setSettingsOpen(true)} />

        <button onClick={() => quitGame()}>Quit</button>
      </div>
    </div>
  );
}

export default Console;
