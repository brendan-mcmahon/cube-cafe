import React from "react";

type SimpleCarProps = {
  number: number;
};

function SimpleCar(props: SimpleCarProps) {
  return (
    <svg width="60" height="75" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 322 222.5" x="0px" y="0px">
      <path
        d="M 13 64 l 15 0 l 23 -51 c 3 -6 6 -13 14 -13 l 135 0 c 8 0 10 7 14 13 l 23 51 l 44 0 c 22 0 41 18 41 41 l 0 28 c 0 7 -6 13 -13 13 l -33 0 c -5 -45 -70 -45 -75 0 l -90 0 c -5 -45 -70 -45 -75 0 l -23 0 c -7 0 -13 -6 -13 -13 l 0 -57 c 0 -7 6 -12 13 -12 z" />
      <path d="M 74 122 c 15 0 27 12 27 28 c 0 15 -12 28 -27 28 c -16 0 -28 -13 -28 -28 c 0 -16 12 -28 28 -28 z" />
      <path d="M 238 122 c 16 0 28 12 28 28 c 0 15 -12 28 -28 28 c -15 0 -28 -13 -28 -28 c 0 -16 13 -28 28 -28 z" />
      <text x="140" y="110" textAnchor="middle" fill="white" fontSize="120px" fontFamily="sans-serif">
        {props.number}
      </text>
    </svg>
  );
}
export default SimpleCar;
