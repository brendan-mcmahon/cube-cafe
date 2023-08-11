import React from "react";
import SavedGamesModal from "../Components/SavedGamesModal";
import { GameAction } from "../constants";
import { useGame } from "../gameContext";
import "./StartScreen.scss";
import Gear from "../icons/Gear";
import SettingsModal from "../settings/SettingsModal";
import DataModal from "../Components/DataModal";
import storage from "../storage";

const version = "8.2.23.0"

type StartScreenProps = {
    loadModalOpen: boolean;
    setLoadModalOpen: (open: boolean) => void;
    settingsModalOpen: boolean;
    setSettingsModalOpen: (open: boolean) => void;
    setShowDataScreen: (open: boolean) => void;
};

export function StartScreen(props: StartScreenProps) {
    const [showDataModal, setShowDataModal] = React.useState(!storage.isDataWarningAcknowledged());

    const { dispatch } = useGame();

    return (<div id="StartScreen">
        <Gear onClick={() => props.setSettingsModalOpen(true)} />
        <div id="title">
            <h1>Cube Café</h1><p>v{version}</p>
        </div>
        <div className="buttons">
            <button onClick={() => dispatch({
                type: GameAction.GAME_SETUP,
            })}>Start</button>
            
            <button onClick={() => props.setLoadModalOpen(true)}>Saved Games</button>
            <button onClick={() => props.setShowDataScreen(true)}>Data</button>
        </div>
        <SettingsModal show={props.settingsModalOpen} setShow={props.setSettingsModalOpen} />
        <SavedGamesModal show={props.loadModalOpen} setShow={props.setLoadModalOpen} />
        <DataModal show={showDataModal} setShow={setShowDataModal} />
    </div>);
}
