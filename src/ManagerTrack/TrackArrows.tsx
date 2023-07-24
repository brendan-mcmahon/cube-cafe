import React from "react";
import { TrackArrow } from "./TrackArrow";

export function TrackArrows() {
  return (
    <>
      <TrackArrow rotate={-36} xOrigin={152} yOrigin={85} />
      <TrackArrow rotate={24} xOrigin={152} yOrigin={85} />
      <TrackArrow rotate={-121} xOrigin={152} yOrigin={85} />
      <TrackArrow rotate={109} xOrigin={152} yOrigin={85} />

      <TrackArrow rotate={-156} xOrigin={78} yOrigin={215} />
      <TrackArrow rotate={-96} xOrigin={78} yOrigin={215} />
      <TrackArrow rotate={119} xOrigin={78} yOrigin={215} />
      <TrackArrow rotate={-11} xOrigin={78} yOrigin={215} />

      <TrackArrow rotate={84} xOrigin={226} yOrigin={215} />
      <TrackArrow rotate={144} xOrigin={226} yOrigin={215} />
      <TrackArrow rotate={-1} xOrigin={226} yOrigin={215} />
      <TrackArrow rotate={229} xOrigin={226} yOrigin={215} />

      <TrackArrow rotate={240} xOrigin={152} yOrigin={174} radius={11.5} scale={0.5} translate={{ x: 92.5, y: 78.5 }} />
      <TrackArrow rotate={0} xOrigin={152} yOrigin={174} radius={11.5} scale={0.5} translate={{ x: 72, y: 100.5 }} />
      <TrackArrow rotate={120} xOrigin={152} yOrigin={174} radius={11.5} scale={0.5} translate={{ x: 63.5, y: 72 }} />

      <TrackArrow rotate={-60} xOrigin={155} yOrigin={155} translate={{ x: -30, y: -23 }} />
      <TrackArrow rotate={-60} xOrigin={155} yOrigin={155} translate={{ x: -58.5, y: 27.5 }} />


      <TrackArrow rotate={180} xOrigin={155} yOrigin={155} translate={{ x: -25, y: 60 }} />
      <TrackArrow rotate={180} xOrigin={155} yOrigin={155} translate={{ x: 40, y: 60 }} />

      <TrackArrow rotate={60} xOrigin={155} yOrigin={155} translate={{ x: 14, y: -40 }} />
      <TrackArrow rotate={60} xOrigin={155} yOrigin={155} translate={{ x: 42.5, y: 10 }} />
    </>
  );
}
