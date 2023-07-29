import React from "react";
import { useGame } from "../gameContext";
import { colorValues, colors } from "../colors";
import colorWheel from "../assets/chalkboard/icons/color_wheel.png";


function DiskSquare({ index, rotation }: { index: number, rotation: number }) {
  const colorName = colors[index];
  const color = colorValues[colorName];

  return (<path fill={color} d="M-10 -40H10V-20H-10z" transform={`rotate(${rotation})`} />);
}


const Colors: React.FC = () => {
  const { state } = useGame();

  return (
    <svg id="ColorDisk" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 210">
      {/* <circle cx="105" cy="105" r="50" fill="#fff" stroke="#000"></circle>
      <g className="rotatable" stroke="#000" transform={`translate(105, 105) rotate(${state.actionDisk.rotation})`}>
        <DiskSquare index={0} rotation={0}></DiskSquare>
        <DiskSquare index={1} rotation={72}></DiskSquare>
        <DiskSquare index={2} rotation={144}></DiskSquare>
        <DiskSquare index={3} rotation={216}></DiskSquare>
        <DiskSquare index={4} rotation={288}></DiskSquare>
      </g> */}

      <image className="rotatable"
        href={colorWheel} x="55" y="55" width="100" height="100"
        style={{ transformOrigin: "105px 105px" }}
        transform={`rotate(${state.actionDisk.rotation})`} />
    </svg>
  );
}

export default Colors;
