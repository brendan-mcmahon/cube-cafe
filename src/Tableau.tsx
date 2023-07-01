import React from "react";
import Dice from "./Components/Dice";
import Resources from "./Components/Resources";
import ActionDisk from "./ActionDisk/ActionDisk";
import "./Tableau.scss";

export default function Tableau() {
  return (
    <div id="Tableau">
      <Dice />
      <Resources />
      <ActionDisk />
    </div>
  );
}
