import React from "react";
import { Modal } from "../Modal";
import { IModalProps } from "./IModalProps";
import "./styles/DataModal.scss";
import storage from "../storage";

export default function DataModal(props: IModalProps) {

    const acknowledge = () => {
        storage.acknowledgeDataWarning();

        props.setShow(false);
    }

    return <Modal title="Your Data" show={props.show} setShow={props.setShow}>
        <div id="DataModal">
            <h3>This app saves your data in two ways:</h3>
            <ul>
                <li>
                    <h4>Local Storage</h4>
                    <p>As you play the game, your progress is stored in your local storage.</p>
                    <p>You can see exactly what's being saved if you look in the Dev Tools {">"} Application {">"} Local Storage section in your browser.</p>
                    <p>I only do this in case you close the window or get disconnected for some reason. You can clear this by finishing or quitting your current game.</p>
                </li>

                <li>
                    <h4>AWS</h4>
                    <p>When you finish your game, the whole thing is sent to a datastore in AWS. I'm doing this to collect data about how people play the game. It doesn't track any of your personal information or anything like that. It is <em>just</em> the game data!</p>
                    <p>Though it doesn't <em>specifically</em> identify you, it assigns a random goofy name to your device (browser) and uses that so I can see trends in a person's play style and tactics.</p>
                    <p>You can see the name assigned to you in the settings, and even change it if you want!</p>
                    <p>Saving the games this way also lets us replay the same exact game multiple times with the same dice rolls, cars, and plate draws!</p>
                </li>
            </ul>

            <button onClick={acknowledge}>Don't show this again</button>
        </div>
    </Modal>
}
