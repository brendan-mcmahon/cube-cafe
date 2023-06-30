import { PlayPhases } from "../constants";
import { useGame } from "../gameContext";
import "./styles/Resources.scss";

function Resources() {
  const { state, dispatch } = useGame();

  return (
    <div id="Resources">
      {state.resources.map((value, i) => (
        <button
          disabled={value.status === "exhausted"}
          key={i}
          className={`resource ${value.color} ${value.status} ${
            state.playPhase === PlayPhases.SELECT_RESOURCE ? "selectable" : ""
          } ${state.selectedResourceIndex === i ? "selected" : ""}`}
          onClick={() => dispatch({ type: "SELECT_RESOURCE", resource: value, resourceIndex: i })}
        ></button>
      ))}
    </div>
  );
}

export default Resources;
