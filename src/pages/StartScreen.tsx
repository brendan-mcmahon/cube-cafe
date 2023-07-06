import React from "react";
import SavedGamesModal from "../Components/SavedGamesModal";
import { GameAction } from "../constants";
import { useGame } from "../gameContext";
import "./StartScreen.scss";

type StartScreenProps = {
    loadModalOpen: boolean;
    setLoadModalOpen: (open: boolean) => void;
};

export function StartScreen(props: StartScreenProps) {

    const { dispatch } = useGame();

    return (<div id="StartScreen">
        <h1>Cube Café</h1>
        <div className="buttons">
            <button onClick={() => dispatch({
                type: GameAction.ROUND_SETUP
            })}>Start</button>
            <button onClick={() => props.setLoadModalOpen(true)}>Saved Games</button>
        </div>
        <SavedGamesModal show={props.loadModalOpen} setShow={props.setLoadModalOpen} />
    </div>);
}
