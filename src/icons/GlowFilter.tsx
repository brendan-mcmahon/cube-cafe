import React from "react";

export function GlowFilter() {
  return (<filter id="glow">
    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
    <feFlood floodColor="yellow" result="yellowColor" />
    <feComposite in="yellowColor" in2="coloredBlur" operator="in" result="yellowBlur" />
    <feMerge>
      <feMergeNode in="yellowBlur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>);
}
