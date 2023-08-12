import React, { useEffect, useState } from "react";
import Tables from "../Components/Tables";
import AvailablePlatesModal from "../Components/AvailablePlatesModal";
import SettingsModal from "../settings/SettingsModal";
import Console from "../Components/Console";
import Dishwasher from "../Components/Dishwasher";
import Tableau from "../Components/Tableau";
import SaveModal from "../Components/SaveModal";
import SavedGamesModal from "../Components/SavedGamesModal";
import Kitchen from "../Components/Kitchen/Kitchen";
import Alert from "../Components/Alert";
import "./GameScreen.scss";
import { useGame } from "../gameContext";
import DriveThru from "../Components/DriveThru";
import ManagerBonusModal from "../Components/ManagerBonusModal";
import RulesModal from "../Components/RulesModal";
import Joyride, { STATUS, Step as JoyrideStep } from 'react-joyride';
import { tutorialSteps } from "./tutorialSteps";

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
    tourOpen: boolean;
    setTourOpen: (open: boolean) => void;
    isMobile: boolean;
};

export function GameScreen(props: GameScreenProps) {
    const { state } = useGame();

    const [giveTour, setGiveTour] = useState(state.tutorialMode);

    const handleJoyrideCallback = (data: { status: any; }) => {
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
            setGiveTour(false);
        };
    }

    const [joyrideSteps] = useState<JoyrideStep[]>(tutorialSteps);

    return (<div id="GameScreen">
        <Joyride callback={handleJoyrideCallback}
            run={giveTour}
            steps={joyrideSteps}
            showSkipButton={true}
            continuous={true}
            showProgress={true}
            locale={{
                back: 'Back',
                close: 'Close',
                last: 'Finish',
                next: 'Next',
                skip: 'Skip'
            }}
        />
        <Console
            setSettingsOpen={props.setSettingsOpen}
            setSaveOpen={props.setSaveModalOpen} />
        <SettingsModal show={props.settingsOpen} setShow={props.setSettingsOpen} />
        <SaveModal show={props.saveModalOpen} setShow={props.setSaveModalOpen} />
        <SavedGamesModal show={props.loadModalOpen} setShow={props.setLoadModalOpen} />
        <Dishwasher />
        <Tableau />
        <DriveThru />
        <AvailablePlatesModal show={props.availablePlatesOpen} setShow={props.setAvailablePlatesOpen} />
        <ManagerBonusModal show={props.managerBonusOpen} setShow={props.setManagerBonusOpen} />
        <RulesModal show={props.tourOpen} setShow={props.setTourOpen} />
        <Alert show={props.alertOpen} setShow={props.setAlertOpen} />
        <Tables />
        <Kitchen />
    </div>);
}
