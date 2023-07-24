import React from "react";

function Car({ color = "white" }: { color?: string }) {
    return (
        <svg viewBox="0 0 322 222.5" x="0px" y="0px">
            <path fill={color}
                d="M 13 64 l 15 0 l 23 -51 c 3 -6 6 -13 14 -13 l 135 0 c 8 0 10 7 14 13 l 23 51 l 44 0 c 22 0 41 18 41 41 l 0 28 c 0 7 -6 13 -13 13 l -33 0 c -5 -45 -70 -45 -75 0 l -90 0 c -5 -45 -70 -45 -75 0 l -23 0 c -7 0 -13 -6 -13 -13 l 0 -57 c 0 -7 6 -12 13 -12 z" />
            <circle cx="74" cy="150" r="28" fill="black" />
            <circle cx="238" cy="150" r="28" fill="black" />
        </svg>
    );
}

export default Car;