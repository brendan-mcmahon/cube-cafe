import { useGame } from "../gameContext";
import { useState } from "react";
import "./Settings.scss";
import { SettingsInput } from "./SettingsInput";
import { ManagerTrackStep } from "./ManagerTrackStep";
import { Modal } from "../Modal";
import { GameAction } from "../constants";
import Plus from "../icons/Plus";

export default function SettingsModal({ show, setShow }) {
  const { state, dispatch } = useGame();
  const [startingMood, setStartingMood] = useState(state?.settings?.startingMood || 3);
  const [numTables, setNumTables] = useState(state?.settings?.numTables || 3);
  const [numPlates, setNumPlates] = useState(state?.settings?.numPlates || 1);
  const [hotFoodReward, setHotFoodReward] = useState(state?.settings?.hotFoodReward || 1);
  const [coldFoodPenalty, setColdFoodPenalty] = useState(state?.settings?.coldFoodPenalty || 0);
  const [totalRounds, setTotalRounds] = useState(state?.settings?.totalRounds || 8);
  const [managerTrack, setManagerTrack] = useState(
    state?.settings?.managerTrack || ["empty", "empty", "empty", "empty", "wild"]
  );
  // TODO: Move dishwasher to settings?
  const [dishwasher, setDishwasher] = useState(
    state?.dishwasher || [...Array.from({ length: 9 }, () => ({ plate: null, action: "do nothing", activated: false }))]
  );

  const onSaveClicked = (e) => {
    e.preventDefault();
    dispatch({
      type: GameAction.SET_SETTINGS,
      settings: {
        startingMood,
        numTables,
        hotFoodReward,
        coldFoodPenalty,
        numPlates,
        managerTrack,
        totalRounds,
      },
    });
    setShow(false);
  };

  const updateManagerStep = (index, e) => {
    e.preventDefault();
    const newManagerTrack = [...managerTrack];
    newManagerTrack[index] = e.target.value;
    setManagerTrack(newManagerTrack);
  };

  const deleteManagerStep = (index, e) => {
    e.preventDefault();
    const newManagerTrack = [...managerTrack];
    newManagerTrack.splice(index, 1);
    setManagerTrack(newManagerTrack);
  };

  return (
    <Modal title="Settings" show={show} setShow={setShow}>
      <form id="Settings" onSubmit={onSaveClicked}>
        <SettingsInput label="Starting Mood:" name="startingMood" value={startingMood} setValue={setStartingMood} />

        <SettingsInput label="Number of Tables:" name="numTables" value={numTables} setValue={setNumTables} />

        <SettingsInput
          label="Number of Default Plates:"
          name="numPlates"
          value={numPlates}
          setValue={setNumPlates}
          max={10}
        />
        <SettingsInput
          label="Hot Food Reward:"
          name="hotFoodReward"
          value={hotFoodReward}
          setValue={setHotFoodReward}
          max={10}
        />

        <SettingsInput
          label="Cold Food Penalty:"
          name="coldFoodPenalty"
          value={coldFoodPenalty}
          setValue={setColdFoodPenalty}
          min={-5}
          max={5}
        />

        <SettingsInput
          label="Total Rounds:"
          name="totalRounds"
          value={totalRounds}
          setValue={setTotalRounds}
          min={1}
          max={12}
        />

        <div className="manager-track-settings">
          <label>Manager Track:</label>
          <div className="manager-track-input">
            <ul>
              {managerTrack.map((step, index) => (
                <ManagerTrackStep
                  key={index}
                  updateStep={updateManagerStep}
                  deleteStep={deleteManagerStep}
                  step={step}
                  index={index}
                />
              ))}
            </ul>
            <Plus class={"add-manager-track-step"} onClick={() => setManagerTrack([...managerTrack, "empty"])} />
          </div>
        </div>

        <input type="submit" value="Save" />
      </form>
    </Modal>
  );
}
