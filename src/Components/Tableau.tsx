import React from "react";
import Dice from "../Components/Dice";
import Resources from "../Components/Resources";
import ActionDisk from "../ActionDisk/ActionDisk";
import "./styles/Tableau.scss";

export default function Tableau() {
  return (
    <div id="Tableau" className="game-area">
      {/* <Dice /> */}
      <Resources />
      <ActionDisk />
    </div>
  );
}
