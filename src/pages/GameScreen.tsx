import React, { useEffect, useState } from "react";
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
import RulesModal from "../Components/RulesModal";
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

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

    // tell user to select the purple resource
    // tell user to click the Seat action
    // point out the customer seated with a 3
    // tell user to select red resource
    // tell user to select "take order" action
    // tell user to select the meeple at the table
    // point out the plate
    // tell user to select the yellow resource
    // tell user to select the cook action
    // point out the cube on the grill now. Explain how it's the same color as the resource used
    // tell user we have to wait a round for the food to be cooked
    // Tell user to seat another person blah blah blah

    const [joyrideSteps] = useState([
        // {
        //     content: ( <div className="tutorial-modal">
        //         <h2>Welcome to Cube Café</h2>
        //         <p>Meeples spend their days tilling fields, collecting resources, constructing buildings, and blocking action locations. When it’s time to relax, these professional “workers” need a place to wind down and enjoy their favorite food… cubes! You run a restaurant in the heart of Meeple City.</p>
        //         <p>From your delicious Cube Casserole (your mother’s recipe) to your famous Cube’n Sandwich, meeples come from all over to feast on your culinary cubes. But rival restaurants have just entered the market. Do you have what it takes to face the fierce competition and prove you have the best restaurant in town?</p>
        //         <p>It’s time to get to work and… feed your people!</p>
        //     </div>),
        //     placement: 'center',
        //     target: 'body',
        // },
        // {
        //     content: <div className="tutorial-modal"><h2>Gameplay</h2>
        //         <p>A game of Cube Café is played over the course of 8 rounds.</p>
        //         <p>Your goal is to provide the most efficient and pleasant service to your customers in that time.</p>
        //         </div>,
        //     placement: 'center',
        //     target: 'body',
        // },
        // {
        //     target: '#Resources',
        //     disableBeacon: true,
        //     content: "These are your resources. You'll get new ones each round. You can spend them on a few things, most of which are on the action wheel!",
        // },
        // {
        //     target: '#ActionDisk .disk',
        //     disableBeacon: true,
        //     content: "This is the action disk. On the outside are your actions. On the inside - corresponding colors that match your resources!",
        // },
        // {
        //     target: '#Tables',
        //     disableBeacon: true,
        //     content: "These are the tables where your meeples will sit, order, and eat."

        // },
        // {
        //     target: '.grill',
        //     disableBeacon: true,
        //     content: "This is where the food goes to cook."

        // },
        // {
        //     target: '.hot-counter',
        //     disableBeacon: true,
        //     content: "After one round, the food cooks and goes to the counter tops. First this side to represent food that is hot and fresh!"

        // },
        // {
        //     target: '.cold-counter',
        //     disableBeacon: true,
        //     content: "And after another round, the food starts to get cold and less appetizing. After another round here, the food is inedible and must be thrown out."

        // },
        // {
        //     target: "#Dishwasher",
        //     disableBeacon: true,
        //     content: "After your meeples have eaten and left, they'll leave behind their dirty plates. You'll need to clean them up to make room for more customers, and when you do, you'll place them here, in the dishwasher where you'll earn bonuses!"
        // },
        // {
        //     target: "#DriveThru",
        //     disableBeacon: true,
        //     content: "After round 4, another type of customer will start to show up in your drive thru!"
        // },
        // {
        //     target: "#DriveThru .car",
        //     disableBeacon: true,
        //     content: "The cars come in on the left. While they're in the first spot, they're worth 3 points, then go down to 2 points. After two rounds, they leave, probably pretty annoyed!"
        // },
        // {
        //     target: "#DriveThru .car",
        //     disableBeacon: true,
        //     content: "The color of the car represents the food that the car wants to eat, so keep that in mind!"
        // },


        {
            content: "Okay, let's get started!",
            placement: 'center',
            target: 'body',
        },

        // 
        {
            content: "Select this purple resource",
            target: '#Resources button:first-of-type',
            spotlightClicks: true
        },

        {
            target: '#ActionDisk .disk',
            disableBeacon: true,
            content: "Now look at the action disk again. You can see what actions are available with your purple resource! Go ahead and click on the Seat action",
        },

        // {
        //     target: "#Seat.action-icon",
        //     disableBeacon: true,
        //     spotlightClicks: true,
        //     content: "Great! Now we can choose the Seat action! Go ahead and click it!"
        // },
        {
            target: "#Seat.action-icon",
            disableBeacon: true,
                spotlightClicks: true,
            content: ``
        },
        {
            target: "#Clipboard.action-icon",
            disableBeacon: true,
            content: `Selecting this action prompts you to `
        },
        {
            target: "#Pan.action-icon",
            disableBeacon: true,
            content: `Selecing this action will bring a new customer into your restaurant and seat them at the first available table. Right now, you can see it would take a ${state.actionDisk.colors[0]} resource to seat a customer.`
        },
        {
            target: "#Cloche.action-icon",
            disableBeacon: true,
            content: `Selecing this action will bring a new customer into your restaurant and seat them at the first available table. Right now, you can see it would take a ${state.actionDisk.colors[0]} resource to seat a customer.`
        },
        {
            target: "#Refill.action-icon",
            disableBeacon: true,
            content: `Selecing this action will bring a new customer into your restaurant and seat them at the first available table. Right now, you can see it would take a ${state.actionDisk.colors[0]} resource to seat a customer.`
        },
    ]);

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
