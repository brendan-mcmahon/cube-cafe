import React, { Fragment, useEffect } from "react";
import { useGame } from "../gameContext";
import Manager from "../icons/Manager";
import Arrow from "../icons/Plus";
import Table from "./Table";

export default function Tables() {
    const { state } = useGame();

    const ThreeTables = '"table1 table1 table1 table2 table2 table2" ". . table3 table3 . ." "track track track track track track"';
    const TwoTables = '"table1 table1 table1 table2 table2 table2" "track track track track track track"';
    const tableGrid = {
        gridTemplateRows: state.customers.length === 3 ? "repeat(2, 1fr) 0.5fr" : "1fr 0.5fr",
        gridTemplateAreas: state.customers.length === 3 ? ThreeTables : TwoTables,
    };
    return (
        // if customers count is 3, grid-template-rows: repeat(2, 1fr) 0.5fr; otherwise, grid-template-rows: 1fr 0.5fr;
        <div id="Tables" style={tableGrid}>
            <Table customer={state.customers[0]} index={0}></Table>
            <Table customer={state.customers[1]} index={1}></Table>
            {state.customers.length === 3 && <Table customer={state.customers[2]} index={2}></Table>}
            <div className="manager-track">
                {state.settings.managerTrack?.map((stop, index) => (
                    <Fragment key={index}>
                        <div className="stop-container">
                            <div className="stop">{state.managerPosition === index && <Manager />}</div>
                            <p>{stop === "empty" ? "" : stop}</p>
                        </div>
                        {index < state.settings.managerTrack.length - 1 && <Arrow />}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
