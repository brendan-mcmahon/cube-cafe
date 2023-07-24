import React from "react";

type TrackSquareProps = {
  rotate: number, 
  xOrigin: number, 
  yOrigin: number,
  radius?: number,
  color?: string,
  translate?: { x: number, y: number } | null,
};
export function TrackSquare({ rotate, xOrigin, yOrigin, radius = 74.5, color, translate }: TrackSquareProps) {
  const moveToX = xOrigin - 8;
  const moveToY = yOrigin - radius - 8;
  const rotation = `rotate(${rotate}, ${xOrigin}, ${yOrigin})`;
  const translation = `translate(${translate?.x || 0}, ${translate?.y || 0})`;

  return (
  <>
    <rect x={moveToX} y={moveToY} height="16" width="16" transform={`${rotation}`} />
    {/* <rect x={moveToX + 16.5} y={moveToY} height="16" width="4" transform={`${translation} ${rotation}`} stroke="none" fill="white" /> */}
  </>
  );
}
