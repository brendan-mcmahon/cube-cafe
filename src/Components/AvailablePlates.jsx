import { useGame } from "../gameContext";
import "./styles/AvailablePlates.scss";

function AvailablePlates() {
  const { state, dispatch } = useGame();

  const selectPlate = (plate) => {
    dispatch({ type: "SELECT_PLATE", plate });
  };
  return (
    <div id="AvailablePlates">
      <h2>Select a plate:</h2>
      <ul>
        {state.availablePlates?.map((plate, i) => (
          <li key={i} className={`plate ${plate}`} onClick={() => selectPlate(plate)}></li>
        ))}
      </ul>
    </div>
  );
}

export default AvailablePlates;
