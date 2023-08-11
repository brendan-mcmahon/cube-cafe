import AlertModel from "../Components/AlertModel";
import {
  ManualAction,
  GamePhase,
  RoundPhase,
  PlayPhase,
  DishwasherAction,
  ManagerAction,
  ResourceAction,
} from "../constants";
import { Action } from "../Action";
import Customer from "./Customer";
import { Settings } from "./Settings";

export interface Resource {
  color: string;
  status: string;
}

export interface TableModel {
  customer: Customer | null;
  plate: string | null;
}

export interface ActionDisk {
  colors: string[];
  actions: ResourceAction[];
  rotation: number;
}

export interface DishwasherCellModel {
  plate: string | null;
  action: DishwasherAction;
  available: boolean;
  color: string | null;
}

export interface Car {
  color: string;
  status: string;
}

export interface RoundTimer {
  start: Date;
  end: Date | null;
}

export interface Statistics {
  lostCustomers: number;
  servedCustomers: Customer[];
  rotationCount: number;
  roundTimers: RoundTimer[];
  unfinishedTables: TableModel[];
  hotFoodServed: number;
  coldFoodServed: number;
  refillCount: number;
  foodCooked: number;
  managerActionsTaken: number;
  managerStepsMoved: number;
  itemsCookedWithNoOrder: number;
  dishwasherSelections: DishwasherAction[];
  carsFed: number;
}

export interface PlaybackHistory {
  settings: Settings;
  plateBag: string[];
  rounds: PlaybackRound[];
}

export interface PlaybackRound {
  actions: Action[];
  dice: string[] | null;
  cars: (Car | null)[];
}

export enum UpgradeKeys {
  Freezer = 'freezer',
  HeatLamp = 'heatlamp',
  DriveThru = "driveThru"
}

interface Upgrades {
  [UpgradeKeys.Freezer]: boolean;
  [UpgradeKeys.HeatLamp]: boolean;
  [UpgradeKeys.DriveThru]: boolean;
}

export interface Game {
  cars: (Car | null)[];
  bonusPoints: number;
  freezerItems: Resource[];
  upgrades: Upgrades;
  alert: AlertModel | null;
  id: string;
  settings: Settings;
  stars: number;
  round: number;
  gamePhase: GamePhase;
  roundPhase: RoundPhase;
  actionDisk: ActionDisk;
  currentAction: ResourceAction | ManualAction | DishwasherAction | ManagerAction | null;
  playPhase: PlayPhase;
  resources: Resource[];
  dice: string[];
  currentValue: number | null;
  availableActions: ResourceAction[];
  availablePlates: string[];
  managerPosition: number;
  tables: TableModel[];
  grillItems: string[];
  hotCounterItems: string[];
  coldCounterItems: string[];
  plateBag: string[];
  selectedPlate: string | null;
  selectedResource: Resource | null;
  selectedResourceIndex: number | null;
  selectedTableIndex: number | null;
  playbackHistory: PlaybackHistory;
  actionHistory: string[];
  history: Game | null;
  statistics: Statistics;
  dishwasher: DishwasherCellModel[];
}



