import { ManagerAction } from "../constants";

export interface Settings {
  refillMode: string;
  driveThruRewards: any;
  driveThruRound: number;
  user: string;
  dice: string[][];
  gameName: string;
  platesPerColor: number;
  startingMood: number;
  numPlates: number;
  hotFoodReward: number;
  coldFoodPenalty: number;
  diceCount: number;
  totalRounds: number;
  managerTrack: ManagerAction[];
  cookWildsAsWild: boolean;
  angryCustomersLeave: boolean;
}
