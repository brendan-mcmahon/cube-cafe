import React from "react";

type TrackArrowProps = {
  rotate: number,
  xOrigin: number,
  yOrigin: number,
  radius?: number,
  color?: string,
  translate?: { x: number, y: number } | null,
  scale?: number,
};
export function TrackArrow({ rotate, xOrigin, yOrigin, radius = 74.5, color, translate, scale }: TrackArrowProps) {
  const moveToX = xOrigin + 14;
  const moveToY = yOrigin - radius + 7;
  const rotation = `rotate(${rotate}, ${xOrigin}, ${yOrigin})`;
  const translation = translate ? `translate(${translate.x}, ${translate.y})` : "";
  const _scale = scale ? `scale(${scale})` : "";
  return (
    <>
    <path
      stroke='white'
      strokeWidth='1'
      stroke-location='outside'
      fill={color ?? 'black'}
      transform={`${translation} ${_scale} ${rotation}`}
      d={`m ${moveToX} ${moveToY} l -14 -7 l 14 -7 `} />
      {/* <rect x={moveToX - 18} y={moveToY - 9} height="4" width="4" transform={`${translation} ${rotation}`} stroke="none" fill="white" /> */}
      {/* <circle cx={moveToX - 16} cy={moveToY - 7} transform={`${translation} ${_scale} ${rotation}`} r='2' fill="white"></circle> */}
    </>
  );
}
