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
import RulesModal from "../Components/TangibleRulesModal";
import Joyride, { STATUS, Step as JoyrideStep } from 'react-joyride';
import { tutorialSteps } from "./tutorialSteps";
import DiningRoom from "../Components/DiningRoom/DiningRoom";

function getTrack() {
    const radius = 100
    const height1 = 125
    const height2 = 250
    const center = 300
    const deltaWidth = 150

    const center1 = {x: center, y: -height1}
    const center2 = {x: center - deltaWidth, y: height2}
    const center3 = {x: center + deltaWidth, y: height2}

    // to find the start, we need to find the start of the first arc
    // start by imagining a point on circle1  that's right at the top center (12:00), so x: center, y: height1-radius
    // rotate by the angle between the center of circle 1 and the center of circle 3

    //a = deltaWidth
    //b = height2 - height1
    //c = hypotenuse
    //angle = asin(b/c)
                             
    const distance = Math.sqrt(Math.pow(deltaWidth, 2) + Math.pow(height2 - height1, 2))
    // const i = {x: center, y: height1 - radius}

    const slope = (center3.y - center1.y) / (center3.x - center1.x)
    
    const angle = Math.atan(deltaWidth/(height2 - height1));

    const p1 = {
        x: parseFloat((center - (Math.cos(angle) * radius)).toFixed(3)),
        y: parseFloat((height1 - (Math.sin(angle) * radius)).toFixed(3))
    }

    const p2 = {
        x: parseFloat((center + (Math.cos(angle) * radius)).toFixed(3)),
        y: parseFloat((height1 - (Math.sin(angle) * radius)).toFixed(3))
    }

    const p3 = {
        x: parseFloat(((center + deltaWidth) + (Math.cos(angle) * radius)).toFixed(3)),
        y: parseFloat((height2 - (Math.sin(angle) * radius)).toFixed(3))
    }

    const p4 = {
        x: parseFloat(((center + deltaWidth)).toFixed(3)),
        y: parseFloat((height2).toFixed(3))
    }

    const p5 = {
        x: parseFloat(((center - deltaWidth)).toFixed(3)),
        y: parseFloat((height2).toFixed(3))
    }

    const p6 = {
        x: parseFloat(((center - deltaWidth) - (Math.cos(angle) * radius)).toFixed(3)),
        y: parseFloat((height2 - (Math.sin(angle) * radius)).toFixed(3))
    }

    // point 1, arc to point 2, line to point 3, arc to point 4, line to point 5, arc to point 6, z
    const d = `M ${p1.x} ${p1.y} A ${radius} ${radius} 90 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${radius} ${radius} 90 0 1 ${p4.x} ${p4.y} H ${p5.x} A ${radius} ${radius} 90 0 1 ${p6.x} ${p6.y} Z`
    console.log("path", d);
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

    getTrack();

    return (<div id="GameScreen">
        {/* <Joyride callback={handleJoyrideCallback}
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
        /> */}
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
        {/* <DiningRoom /> */}
        <Kitchen />
    </div>);
}
