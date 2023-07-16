import React from "react";
import SavedGamesModal from "../Components/SavedGamesModal";
import { GameAction } from "../constants";
import { useGame } from "../gameContext";
import "./StartScreen.scss";
import Gear from "../icons/Gear";
import SettingsModal from "../settings/SettingsModal";

type StartScreenProps = {
    loadModalOpen: boolean;
    setLoadModalOpen: (open: boolean) => void;
    settingsModalOpen: boolean;
    setSettingsModalOpen: (open: boolean) => void;
};

export function StartScreen(props: StartScreenProps) {

    const { dispatch } = useGame();

    return (<div id="StartScreen">
        <Gear onClick={() => props.setSettingsModalOpen(true)} />
        <h1 id="title">Cube Café</h1>
        <div className="buttons">
            <button onClick={() => dispatch({
                type: GameAction.GAME_SETUP,
            })}>Start</button>
            
            <button onClick={() => props.setLoadModalOpen(true)}>Saved Games</button>
        </div>
        <SettingsModal show={props.settingsModalOpen} setShow={props.setSettingsModalOpen} />
        <SavedGamesModal show={props.loadModalOpen} setShow={props.setLoadModalOpen} />
    </div>);
}
