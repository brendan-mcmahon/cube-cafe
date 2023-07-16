import React, { ChangeEvent, FormEventHandler, MouseEvent } from "react";
import { useGame } from "../gameContext";
import { useState } from "react";
import "./Settings.scss";
import { NumericSettingsInput } from "./NumericSettingsInput";
import { Modal } from "../Modal";
import { GameAction, ManagerAction } from "../constants";
import { IModalProps } from "../Components/IModalProps";
import { DiceSettings } from "./DiceSettings";
import { ManagerTrackSettings } from "./ManagerTrackSettings";


export default function SettingsModal({ show, setShow }: IModalProps) {
  const { state, dispatch } = useGame();
  const [user, setUser] = useState(state?.settings?.user || localStorage.getItem("user") || "");
  const [startingMood, setStartingMood] = useState<number>(state?.settings?.startingMood || 3);
  const [tableCount, setTableCount] = useState(state?.settings?.startingTableCount || 3);
  const [numPlates, setNumPlates] = useState(state?.settings?.numPlates || 1);
  const [hotFoodReward, setHotFoodReward] = useState(state?.settings?.hotFoodReward || 1);
  const [coldFoodPenalty, setColdFoodPenalty] = useState(state?.settings?.coldFoodPenalty || 0);
  const [totalRounds, setTotalRounds] = useState(state?.settings?.totalRounds || 8);
  const [dice, setDice] = useState(state?.settings?.dice || []);
  const [managerTrack, setManagerTrack] = useState(
    state?.settings?.managerTrack || [ManagerAction.EMPTY, ManagerAction.EMPTY, ManagerAction.EMPTY, ManagerAction.EMPTY, ManagerAction.WILD]
  );
  // TODO: Move dishwasher to settings?
  const [dishwasher, setDishwasher] = useState(
    state?.dishwasher || [...Array.from({ length: 9 }, () => ({ plate: null, action: "do nothing", activated: false }))]
  );

  const onSaveClicked: FormEventHandler = (e: ChangeEvent) => {
    e.preventDefault();

    // if user is different than the one in local storage, update local storage
    if (user !== localStorage.getItem("user")) {
      localStorage.setItem("user", user);
    }

    dispatch({
      type: GameAction.SET_SETTINGS,
      settings: {
        user,
        startingMood,
        startingTableCount: tableCount,
        hotFoodReward,
        coldFoodPenalty,
        numPlates,
        managerTrack,
        totalRounds,
        platesPerColor: state.settings.platesPerColor,
        diceCount: state.settings.diceCount,
        driveThruLength: state.settings.driveThruLength,
        gameName: state.settings.gameName,
        dice
      },
    });
    setShow(false);
  };

  const updateManagerStep = (index: number, event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const newManagerTrack = [...managerTrack];
    newManagerTrack[index] = (event.target.value as ManagerAction);
    setManagerTrack(newManagerTrack);
  };

  const deleteManagerStep = (index: number, event: MouseEvent) => {
    event.preventDefault();
    const newManagerTrack = [...managerTrack];
    newManagerTrack.splice(index, 1);
    setManagerTrack(newManagerTrack);
  };

  return (
    <Modal title="Settings" show={show} setShow={setShow}>
      <form id="Settings" onSubmit={onSaveClicked}>

        <div className="form-input">
          <label htmlFor="user">Username:</label>
          <input type="text" id="user" name="user" value={user} onChange={(e) => setUser(e.target.value)} />
        </div>

        <NumericSettingsInput label="Starting Mood:" name="startingMood" value={startingMood} setValue={setStartingMood} />

        <NumericSettingsInput label="Number of Tables:" name="numTables" min={2} max={3} value={tableCount} setValue={setTableCount} />

        <NumericSettingsInput
          label="Number of Default Plates:"
          name="numPlates"
          value={numPlates}
          setValue={setNumPlates}
          max={10}
        />

        <NumericSettingsInput
          label="Hot Food Reward:"
          name="hotFoodReward"
          value={hotFoodReward}
          setValue={setHotFoodReward}
          max={10}
        />

        <NumericSettingsInput
          label="Cold Food Penalty:"
          name="coldFoodPenalty"
          value={coldFoodPenalty}
          setValue={setColdFoodPenalty}
          min={-5}
          max={5}
        />

        <NumericSettingsInput
          label="Total Rounds:"
          name="totalRounds"
          value={totalRounds}
          setValue={setTotalRounds}
          min={1}
          max={12}
        />

        <DiceSettings dice={dice} setDice={setDice} />

        <ManagerTrackSettings
          managerTrack={managerTrack}
          setManagerTrack={setManagerTrack}
          updateManagerStep={updateManagerStep}
          deleteManagerStep={deleteManagerStep} />

        <input type="submit" value="Save" />
      </form>
    </Modal>
  );
}
