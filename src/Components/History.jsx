import "./styles/History.scss";
import { useGame } from "../gameContext";
import Undo from "../icons/Undo";

export default function History() {
  const { state, dispatch } = useGame();

  return (
    <div id="History">
      <div className="header">
        <h2>History</h2>
        <Undo onClick={() => dispatch({ type: "UNDO" })} disabled={state.actionHistory?.length === 0} />
      </div>
      <ul>
        {state.actionHistory?.map((action, i) => (
          <li key={i}>{action}</li>
        ))}
      </ul>
    </div>
  );
}
