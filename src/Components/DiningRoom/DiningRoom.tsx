import React, { useEffect, useState } from "react";
import { PlayPhase } from "../../constants";
import { useGame } from "../../gameContext";
import "./DiningRoom.scss";

function DiningRoom() {
    const { state } = useGame();
    const [disabled, setDisabled] = useState(state.playPhase !== PlayPhase.SELECT_FOOD);
    const [selectedCustomerOrder, setSelectedCustomerOrder] = useState<string | null>(null);

    return (
        <div id="DiningRoom" className={`game-area`}>
<svg viewBox="0 0 600 600" width="200px">
    {/* <rect x="0" y="0" width="600" height="600" fill="white" /> */}

    <circle id="track" cx="300" cy="300" r="270" fill="none" stroke="#DDD" strokeDasharray="7.06858" strokeDashoffset="7.06858" strokeWidth="1" />

    <circle id="center" cx="300" cy="300" r="100" stroke="white" fill="none" transform="rotate(0, 300, 300) translate(0, -130)" />
    <circle id="center" cx="300" cy="300" r="100" stroke="white" fill="none" transform="rotate(120, 300, 300) translate(0, -130)" />
    <circle id="center" cx="300" cy="300" r="100" stroke="white" fill="none" transform="rotate(240, 300, 300) translate(0, -130)" />
    
    <g id="squares" stroke="grey" fill="white">
        <rect x="285" y="285" width="30" height="30" transform="rotate(0, 300, 300) translate(0, -270) " />
        <rect x="285" y="285" width="30" height="30" transform="rotate(24, 300, 300) translate(0, -270) " />
        <rect x="285" y="285" width="30" height="30" transform="rotate(48, 300, 300) translate(0, -270) " />
        <rect x="285" y="285" width="30" height="30" transform="rotate(72, 300, 300) translate(0, -270) " />
        <rect x="285" y="285" width="30" height="30" transform="rotate(96, 300, 300) translate(0, -270) " />
        <rect x="285" y="285" width="30" height="30" transform="rotate(120, 300, 300) translate(0, -270) " />
        <rect x="285" y="285" width="30" height="30" transform="rotate(144, 300, 300) translate(0, -270) " />
        <rect x="285" y="285" width="30" height="30" transform="rotate(168, 300, 300) translate(0, -270) " />
        <rect x="285" y="285" width="30" height="30" transform="rotate(192, 300, 300) translate(0, -270) " />
        <rect x="285" y="285" width="30" height="30" transform="rotate(216, 300, 300) translate(0, -270) " />
        <rect x="285" y="285" width="30" height="30" transform="rotate(240, 300, 300) translate(0, -270) " />
        <rect x="285" y="285" width="30" height="30" transform="rotate(264, 300, 300) translate(0, -270) " />
        <rect x="285" y="285" width="30" height="30" transform="rotate(288, 300, 300) translate(0, -270) " />
        <rect x="285" y="285" width="30" height="30" transform="rotate(312, 300, 300) translate(0, -270) " />
        <rect x="285" y="285" width="30" height="30" transform="rotate(336, 300, 300) translate(0, -270) " />
    </g>

    <g id="arrows" stroke="grey" fill="none">
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(13, 300, 300) translate(0, -270)" />
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(37, 300, 300) translate(0, -270)" />
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(61, 300, 300) translate(0, -270)" />
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(85, 300, 300) translate(0, -270)" />
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(109, 300, 300) translate(0, -270)" />
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(133, 300, 300) translate(0, -270)" />
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(157, 300, 300) translate(0, -270)" />
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(181, 300, 300) translate(0, -270)" />
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(205, 300, 300) translate(0, -270)" />
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(229, 300, 300) translate(0, -270)" />
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(253, 300, 300) translate(0, -270)" />
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(277, 300, 300) translate(0, -270)" />
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(301, 300, 300) translate(0, -270)" />
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(325, 300, 300) translate(0, -270)" />
        <path d="M 293 307 l 7 -7 l -7 -7 " transform="rotate(349, 300, 300) translate(0, -270)" />
    </g>

</svg>
           
        </div>
    );
}

export default DiningRoom;
