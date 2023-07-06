import React from "react";
import Tables from "../Components/Tables";
import AvailablePlatesModal from "../Components/AvailablePlatesModal";
import SettingsModal from "../settings/SettingsModal";
import Console from "../Components/Console";
import Dishwasher from "../Components/Dishwasher";
import History from "../Components/History";
import Tableau from "../Components/Tableau";
import SaveModal from "../Components/SaveModal";
import SavedGamesModal from "../Components/SavedGamesModal";
import NewKitchen from "../Components/NewKitchen";
import "./GameScreen.scss";

type GameScreenProps = {
    settingsOpen: boolean;
    setSettingsOpen: (open: boolean) => void;
    saveModalOpen: boolean;
    setSaveModalOpen: (open: boolean) => void;
    loadModalOpen: boolean;
    setLoadModalOpen: (open: boolean) => void;
    availablePlatesOpen: boolean;
    setAvailablePlatesOpen: (open: boolean) => void;
    isMobile: boolean;
};

export function GameScreen(props: GameScreenProps) {
    return (<div id="GameScreen">
        <Console setSettingsOpen={props.setSettingsOpen} setSaveOpen={props.setSaveModalOpen} />
        <SettingsModal show={props.settingsOpen} setShow={props.setSettingsOpen} />
        <SaveModal show={props.saveModalOpen} setShow={props.setSaveModalOpen} />
        <SavedGamesModal show={props.loadModalOpen} setShow={props.setLoadModalOpen} />
        <Dishwasher />
        <Tableau />
        <AvailablePlatesModal show={props.availablePlatesOpen} setShow={props.setAvailablePlatesOpen} />
        <Tables />
        <NewKitchen />
        {!props.isMobile && <History />}
    </div>);
}
