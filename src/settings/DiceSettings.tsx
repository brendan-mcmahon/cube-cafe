import React, { useEffect, useState } from "react";
import { Die } from "../Components/Die";
import { ColorSelectModal } from "./ColorSelectModal";
import Plus from "../icons/Plus";
import { colors } from "../colors";
import Trash from "../icons/Trash";

type DiceSettingsProps = {
  dice: string[][],
  setDice: (dice: string[][]) => void,
}

export function DiceSettings(props: DiceSettingsProps) {
  const [showColorSelect, setShowColorSelect] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ die: number, index: number } | null>(null);

  const onDieClick = (die: number, index: number) => {
    setSelectedCoordinates({ die, index });
    setShowColorSelect(true);
  }

  const onNewColor = (color: string) => {
    if (selectedCoordinates !== null && selectedCoordinates?.die !== null && selectedCoordinates?.index !== null) {
      const newDice = [...props.dice];
      newDice[selectedCoordinates.die][selectedCoordinates.index] = color;
      props.setDice(newDice);
    }
    setShowColorSelect(false);
  }

  const addDie = () => {
    const newDice = [...props.dice, [...colors]];
    props.setDice(newDice);
  }

  const deleteDie = (index: number) => {
    const newDice = [...props.dice];
    newDice.splice(index, 1);
    props.setDice(newDice);
  }
  

  return (<div className="dice-settings">
    <label>Dice:</label>
    {props.dice.map((die, dieIndex) =>
      <div key={dieIndex} className="dice-settings-list">
        <label>{dieIndex + 1}:</label>
        {die.map((color, sideIndex) => <Die onClick={() => onDieClick(dieIndex, sideIndex)} key={sideIndex} color={color} />)}
        <button onClick={() => deleteDie(dieIndex)} className="delete-die">
          <Trash />
        </button>

      </div>)}
    <Plus onClick={addDie} />
    <ColorSelectModal show={showColorSelect} setShow={setShowColorSelect} onSelect={onNewColor} />
  </div>);
}
