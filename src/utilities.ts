import { Game } from "./models/game";

export function fillTo(n: number, t: any[]): any[] {
  return [...t, ...new Array(Math.max(0, n - t.length)).fill(null)];
}
