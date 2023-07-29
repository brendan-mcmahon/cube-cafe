import React, { useEffect } from "react";
import Tables from "../Components/Tables";
import AvailablePlatesModal from "../Components/AvailablePlatesModal";
import SettingsModal from "../settings/SettingsModal";
import Console from "../Components/Console";
import Dishwasher from "../Components/Dishwasher";
import History from "../Components/History";
import Tableau from "../Components/Tableau";
import SaveModal from "../Components/SaveModal";
import SavedGamesModal from "../Components/SavedGamesModal";
import Kitchen from "../Components/Kitchen/Kitchen";
import Alert from "../Components/Alert";
import AlertModel from "../Components/AlertModel";
import "./GameScreen.scss";
import { useGame } from "../gameContext";
import DriveThru from "../Components/DriveThru";
import ManagerBonusModal from "../Components/ManagerBonusModal";

const emptyAlert = { 
    title: "", 
    text: "",
    confirm: () => {},
    cancel: () => {}
}


type GameScreenProps = {
    alertOpen: boolean;
    setAlertOpen: (open: boolean) => void;
    settingsOpen: boolean;
    setSettingsOpen: (open: boolean) => void;
    saveModalOpen: boolean;
    setSaveModalOpen: (open: boolean) => void;
    loadModalOpen: boolean;
    setLoadModalOpen: (open: boolean) => void;
    availablePlatesOpen: boolean;
    setAvailablePlatesOpen: (open: boolean) => void;
    managerBonusOpen: boolean;
    setManagerBonusOpen: (open: boolean) => void;
    isMobile: boolean;
};

export function GameScreen(props: GameScreenProps) {

    const { state } = useGame();

    // useEffect(() => {
    //     console.log('alert changed', state.alert);
    // }, [state.alert])

    return (<div id="GameScreen">
        <Console setSettingsOpen={props.setSettingsOpen} setSaveOpen={props.setSaveModalOpen} />
        <SettingsModal show={props.settingsOpen} setShow={props.setSettingsOpen} />
        <SaveModal show={props.saveModalOpen} setShow={props.setSaveModalOpen} />
        <SavedGamesModal show={props.loadModalOpen} setShow={props.setLoadModalOpen} />
        <Dishwasher />
        <Tableau />
        <DriveThru />
        <AvailablePlatesModal show={props.availablePlatesOpen} setShow={props.setAvailablePlatesOpen} />
        <ManagerBonusModal show={props.managerBonusOpen} setShow={props.setManagerBonusOpen} />
        {/* { state.alert !== null && <Alert /> } */}
        {/* use each property separately because show and setShow are in there */}
        <Alert show={props.alertOpen} setShow={props.setAlertOpen} />
        <Tables />
        <Kitchen />
        {/* {!props.isMobile && <History />} */}
    </div>);
}
