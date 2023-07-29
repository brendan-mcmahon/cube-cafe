import React from "react";
import { ManualAction, PlayPhase } from "../constants";
import { useGame } from "../gameContext";
import { Modal } from "../Modal";
import { IModalProps } from "./IModalProps";
import "./styles/ManagerBonus.scss";
import { colors } from "../colors";
import Star from "../icons/Star";
import Cube from "../icons/Cube";

const bonuses = [
    ...colors.filter(c => c !== "wild"),
    "point",
]

function ManagerBonusModal(props: IModalProps) {
    const { dispatch } = useGame();

    const selectBonus = (bonus: string) => {
        dispatch({ type: ManualAction.SELECT_MANAGER_BONUS, bonus });
    };

    const undo = () => {
        dispatch({ type: ManualAction.UNDO });
    };

    return (
        <Modal title="Select a Bonus" show={props.show} setShow={props.setShow} onCancel={undo}>
            <div id="ManagerBonuses">
                <ul>
                    {bonuses?.map((bonus, i) => {
                        if (bonus === "point") {
                            return (
                                <li key={i} className={`bonus point`} onClick={() => selectBonus(bonus)}>
                                    <Star />
                                </li>
                            )
                        }
                        return (
                            <li key={i} className={`bonus cube ${bonus}`} onClick={() => selectBonus(bonus)}>
                                <Cube color={bonus} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Modal>
    );
}

export default ManagerBonusModal;
