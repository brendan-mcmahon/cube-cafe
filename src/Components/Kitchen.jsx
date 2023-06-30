import { PlayPhases } from "../constants";
import { useGame } from "../gameContext";
import "./styles/Kitchen.scss";

function Kitchen() {
  const { state, dispatch } = useGame();

  const disabled = state.playPhase !== PlayPhases.SELECT_FOOD;
  const selectedCustomerOrder = state.customers[state.selectedCustomerIndex]?.order;

  return (
    <div id="Kitchen">
      <div className="grill">
        <div className={`burner ${state.grillItems?.[0] || ""}`}></div>
        <div className={`burner ${state.grillItems?.[1] || ""}`}></div>
      </div>

      <div className="counter hot-counter">
        <label>+{state.settings.hotFoodReward}</label>
        {state.hotCounterItems?.map((value, i) => (
          <button
            disabled={disabled || value !== selectedCustomerOrder}
            onClick={() => dispatch({ type: "SELECT_FOOD", foodIndex: i, counter: "hot" })}
            key={i}
            className={`food cube ${value} ${disabled || value !== selectedCustomerOrder ? "disabled" : ""}`}
          ></button>
        ))}
      </div>
      <div className="counter cold-counter">
        <label>+{state.settings.coldFoodPenalty}</label>
        {state.coldCounterItems?.map((value, i) => (
          <button
            disabled={disabled || value !== selectedCustomerOrder}
            onClick={() => dispatch({ type: "SELECT_FOOD", foodIndex: i, counter: "cold" })}
            key={i}
            className={`food cube ${value} ${disabled || value !== selectedCustomerOrder ? "disabled" : ""}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Kitchen;
