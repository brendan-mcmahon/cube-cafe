import React from "react";
import { darken, lighten } from "color2k";
import { colorValues, colors } from "../colors";

function Cube({ color = "black" }: { color?: string }) {

    const isWild = color === "wild";
    const _color = colorValues[color];

    const stroke = isWild ? "black" : darken(_color, 0.2);

    const _colors = colors.filter(c => c!== "wild").map(c => colorValues[c]);
    const _darkColors = _colors.map(c => darken(c, 0.1));
    const _lightColors = _colors.map(c => lighten(c, 0.2));

    return (
        <svg id="Cube" viewBox="0 0 120 120">
            <defs>
                <filter id="blur-me">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                </filter>

                <linearGradient id="rainbow" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="50" spreadMethod="repeat">
                    { _colors.map((c, i) => <stop key={i} offset={`${i * 100 / _colors.length}%`} stopColor={c} />) }
                </linearGradient>

                <linearGradient id="dark_rainbow" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="50" spreadMethod="repeat">
                    { _darkColors.map((c, i) => <stop key={i} offset={`${i * 100 / _colors.length}%`} stopColor={c} />) }
                </linearGradient>

                <linearGradient id="light_rainbow" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="50" spreadMethod="repeat">
                    { _lightColors.map((c, i) => <stop key={i} offset={`${i * 100 / _colors.length}%`} stopColor={c} />) }
                </linearGradient>
            </defs>

            <g>
                {/* left */}
                <path stroke="none" fill={isWild ? "url(#rainbow)" : _color}
                    d="m 10 25 l 0 60 l 50 15 l 0 -60 z" />

                {/* right */}
                <path stroke="none" fill={isWild ? "url(#dark_rainbow)" : darken(_color, 0.1)}
                    d="m 60 40 l 50 -15 l 0 60 l -50 15 z" />
                <path stroke="none" fill="rgba(0,0,0,0.25)"
                    d="m 60 40 l 50 -15 l 0 60 l -50 15 z" />

                {/* top */}
                <path stroke="none" fill={isWild ? "url(#light_rainbow)" : lighten(_color, 0.2)}
                    d="m 10 25 l 50 -15 l 50 15 l -50 15 z" />

                {/* outline */}
                <path strokeWidth="4" fill="none" strokeLinejoin="round" stroke={stroke}
                    d="m 10 25 l 0 60 l 50 15 l 50 -15 l 0 -60 l -50 15 l -50 -15 l 50 -15 l 50 15 m -50 15 l 0 60" />
            </g>
        </svg>
    );
}

export default Cube;