import React from "react";
import { TrackArrows } from "./TrackArrows";
import { TrackSquare } from "./TrackSquare";

function Track() {
  return (
    <svg viewBox='0 0 318 318'>
      <rect x="0" y="0" height="318" width="318" fill="white" />
      {/* transform="translate(7, 9)" */}
      <g >
        <g id="tables" fill='#d8d8d8' stroke='#000'>
          <circle cx='152' cy='85' r='53'></circle>
          <circle cx='78' cy='215' r='53'></circle>
          <circle cx='226' cy='215' r='53'></circle>
        </g>
        <g id="path-lines" stroke='#000'>
          <circle cx='152' cy='85' r='74.5' fill='none'></circle>
          <circle cx='78' cy='215' r='74.5' fill='none'></circle>
          <circle cx='226' cy='215' r='74.5' fill='none'></circle>
          <path
            fill='#d8d8d8'
            d='M 86 49.9 l -72.5 128 M 215 44.6 l 74 130.7 M 227.8 289.5 H 75.6'
            style={{
              // WebkitTransformBox: "fill-box",
              transformBox: "fill-box",
            }}
          />
          <circle
            cx='152'
            cy='174'
            r='11.5'
            fill='none'
            style={{
              // WebkitTransformBox: "fill-box",
              transformBox: "fill-box",
            }}
            transform='translate(0 -3)'
          ></circle>
        </g>
        <g id="squares" fill="#fff" stroke="#000">
          <TrackSquare rotate={0} xOrigin={152} yOrigin={85} />
          <TrackSquare rotate={-60} xOrigin={152} yOrigin={85} />
          <TrackSquare rotate={60} xOrigin={152} yOrigin={85} />
          <TrackSquare rotate={-150} xOrigin={152} yOrigin={85} />
          <TrackSquare rotate={150} xOrigin={152} yOrigin={85} />

          <TrackSquare rotate={-60} xOrigin={78} yOrigin={215} />
          <TrackSquare rotate={-120} xOrigin={78} yOrigin={215} />
          <TrackSquare rotate={180} xOrigin={78} yOrigin={215} />
          <TrackSquare rotate={90} xOrigin={78} yOrigin={215} />

          <TrackSquare rotate={180} xOrigin={226} yOrigin={215} />
          <TrackSquare rotate={120} xOrigin={226} yOrigin={215} />
          <TrackSquare rotate={60} xOrigin={226} yOrigin={215} />
          
          <TrackSquare rotate={-60} xOrigin={155} yOrigin={155} translate={{ x: -30, y: -23 }} color="blue"/>

            {/* <circle cx='152' cy='85' r='2' fill="blue"></circle> */}

          {/* <path id="track-step-1" d="M 56.735 116.463 l -8 13.857 l -13.857 -8 l 8 -13.857 z" />
          <path id="track-step-2" d="M 28.176 167.086 l -8 13.857 l -13.856 -8 l 8 -13.857 z" />
          <path id="track-step-3" d="M 34.14 263.771 l -11.313 11.314 l -11.314 -11.314 l 11.314 -11.314 z" />
          <path id="track-step-4" d="M 79.85 280.143 h 16 v 16 h -16 z" />
          <path id="track-step-5" d="M 144.991 280.143 h 16 v 16 h -16 z" />
          <path id="track-step-6" d="M 215.06 280.143 h 16 v 16 h -16 z" />
          <path id="track-step-7" d="M 288.29 268.916 l -11.313 11.314 l -11.314 -11.314 l 11.314 -11.313 z" />
          <path id="track-step-8" d="M 291.64 162.502 l 8 13.857 l -13.857 8 l -8 -13.857 z" />
          <path id="track-step-9" d="M 260.996 106.884 l 8 13.856 l -13.856 8 l -8 -13.856 z" />
          <path id="track-step-10" d="M 220.386 35.747 l 8 13.856 l -13.856 8 l -8 -13.856 z" />
          <path id="track-step-11" d="M 142.12 2.47 h 16 v 16 h -16 z" />          
          <path id="track-step-12" d="M 98.435 44.42 l -8 13.856 l -13.856 -8 l 8 -13.857 z" />
          <path id="track-step-13" d="M 112.218 138.355 l 14.317 7.143 l -7.144 14.317 l -14.317 -7.144 z" />
          <path id="track-step-15" d="M 193.526 137.964 l 8 13.856 l -13.857 8 l -8 -13.856 z" />
          <path id="track-step-14" d="M 144.991 207.602 h 16 v 16 h -16 z" /> */}
        </g>
        <TrackArrows />
      </g>
    </svg>
  );
}

export default Track;
