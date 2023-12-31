import React from "react";

type PanProps = {
  number: number;
};

function Pan(props: PanProps) {
  return (
    <svg width="60" height="75" x="0px" y="0px" viewBox="0 0 100 125">
      <g transform="translate(0,-952.36218)">
        <path
          d="m 75.844377,958.34767 a 2.0005836,1.9994265 0 0 0 -0.90625,0.3125 l -17.84375,11.03125 a 2.0005836,1.9994265 0 0 0 -0.875,1.125 l -1.1875,4.1875 -31.031253,0 a 2.0005836,1.9994265 0 0 0 -2,2.21875 l 7.21875,67.37503 a 2.0005836,1.9994265 0 0 0 2,1.7812 l 35.437503,0 a 2.0005836,1.9994265 0 0 0 2,-1.7812 l 7.21875,-67.37503 a 2.0005836,1.9994265 0 0 0 -2,-2.21875 l -14.6875,0 0.65625,-2.34375 17.1875,-10.59375 a 2.0005836,1.9994265 0 0 0 -1,-3.71875 2.0005836,1.9994265 0 0 0 -0.1875,0 z m -49.625003,20.65625 27.656253,0 -4.718754,16.59374 c -2.94805,-0.8628 -6.24933,-1.6277 -10.40625,-1.6562 -3.07767,-0.021 -6.62044,0.3696 -10.781249,1.4375 l -1.75,-16.37504 z m 31.812503,0 13.625,0 -1.84375,17.09374 c -7.82098,2.9101 -12.11119,2.1131 -16.84375,0.6875 l 5.0625,-17.78124 z"
          stroke="none" visibility="visible"
          display="inline" overflow="visible" />

      </g>
      <text x="50" y="80" textAnchor="middle" fill="white" fontSize="40px" fontFamily="sans-serif">
        {props.number}
      </text>
    </svg>
  );
}
export default Pan;
