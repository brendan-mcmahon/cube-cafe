import React, { Fragment } from "react";
import { useGame } from "../gameContext";
import Manager from "../icons/Manager";
import Arrow from "../icons/Arrow";
import Table from "./Table";
import { PlayPhase } from "../constants";

export default function Tables() {
    const { state } = useGame();

    return (
        <div id="Tables" className="game-area">
            <Table table={state.tables[0]} index={0}></Table>
            <Table table={state.tables[1]} index={1}></Table>
            <Table table={state.tables[2]} index={2}></Table>
            <div className="manager-track">
                {state.settings.managerTrack?.map((stop, index) => (
                    <Fragment key={index}>
                        <div className="stop-container">
                            <div className="stop">
                                {state.managerPosition === index &&
                                    <Manager enabled={state.playPhase === PlayPhase.SELECT_ACTION && !!state.currentValue && state.currentValue >= 0} />}
                            </div>
                            <p className="stop-action">{stop === "empty" ? "" : stop}</p>
                        </div>
                        {index < state.settings.managerTrack.length - 1 && <Arrow />}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
