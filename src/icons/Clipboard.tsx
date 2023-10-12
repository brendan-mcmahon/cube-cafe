import React from "react";

type ClipboardProps = {
  number: number;
};

function Clipboard(props: ClipboardProps) {
  return (
    <svg x="0px" y="0px" className="Clipboard" width="40" height="50" viewBox="0 0 100 125">
      <g transform="translate(0,-952.36218)">
        <path
          d="m 36.372929,958.36442 c -0.691601,0.0675 -1.335247,0.51008 -1.646875,1.13233 l -2.034374,4.04401 -11.624997,0 c -0.06453,-0.003 -0.129214,-0.003 -0.19375,0 -1.01594,0.0959 -1.877317,1.04819 -1.872916,2.07054 l 0,78.6803 c 1.08e-4,1.0841 0.984592,2.0705 2.066666,2.0706 l 57.866651,0 c 1.082074,-10e-5 2.066557,-0.9865 2.066666,-2.0706 l 0,-78.6803 c -1.09e-4,-1.08411 -0.984592,-2.07043 -2.066666,-2.07054 l -11.624997,0 -2.034374,-4.04401 c -0.343313,-0.67658 -1.083059,-1.13166 -1.840624,-1.13233 l -26.866661,0 c -0.06453,-0.003 -0.129214,-0.003 -0.193749,0 z m 1.453125,4.14107 24.34791,0 0.516666,0 -25.381243,0 z m -14.692705,5.17634 7.491664,0 -1.065624,2.16759 c -0.636626,1.25531 0.435208,3.00736 1.840624,3.00875 l 5.166665,0 5.166666,0 16.533329,0 5.166666,0 5.166665,0 c 1.405415,-10e-4 2.47725,-1.75344 1.840624,-3.00875 l -1.065625,-2.16759 7.491665,0 0,74.53927 -53.733319,0 z m 12.109372,2.07054 29.514575,0 0.516667,-1.03527 -1.840624,0 -5.166666,0 -16.533329,0 -5.166666,0 -1.840624,0 z"
          fill="#000000" stroke="none"
          overflow="visible" />

      </g>
      <text x="50" y="75" textAnchor="middle" fill="black" fontSize="60px" fontFamily="sans-serif">
        {props.number}
      </text>
    </svg>
  );
}
export default Clipboard;