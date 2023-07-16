import AlertModel from "./Components/AlertModel";
import {
  ManualAction,
  GamePhase,
  RoundPhase,
  PlayPhase,
  DishwasherAction,
  ManagerAction,
  CustomerStatus,
  ResourceAction,
} from "./constants";

export interface Settings {
  user: string;
  dice: string[][];
  gameName: string;
  platesPerColor: number;
  startingMood: number;
  startingTableCount: number;
  numPlates: number;
  hotFoodReward: number;
  coldFoodPenalty: number;
  diceCount: number;
  totalRounds: number;
  driveThruLength: number;
  managerTrack: ManagerAction[];
}

export interface Resource {
  color: string;
  status: string;
}

export interface Customer {
  pointValue: number;
  status: CustomerStatus;
  order: string | null;
}

export interface ActionDisk {
  colors: string[];
  actions: ResourceAction[];
  rotation: number;
}

export interface DishwasherSquare {
  plate: string | null;
  action: DishwasherAction;
  activated: boolean;
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
  servedCustomers: Customer[];
  rotationCount: number;
  roundTimers: RoundTimer[];
  leftOverCustomers: Customer[];
  hotFoodServed: number;
  coldFoodServed: number;
  refillCount: number;
  foodCooked: number;
  managerActionsTaken: number;
  managerStepsMoved: number;
  itemsCookedWithNoOrder: number;
  dishwasherSelections: DishwasherAction[];
}

export enum UpgradeKeys {
  Freezer = 'freezer',
  HeatLamp = 'heatlamp'
}

interface Upgrades {
  [UpgradeKeys.Freezer]: boolean;
  [UpgradeKeys.HeatLamp]: boolean;
}

export interface Game {
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
  customers: (Customer | null)[];
  grillItems: string[];
  hotCounterItems: string[];
  coldCounterItems: string[];
  plateBag: string[];
  dishwasher: DishwasherSquare[];
  selectedPlate: string | null;
  selectedResource: Resource | null;
  selectedResourceIndex: number | null;
  selectedCustomerIndex: number | null;
  actionHistory: string[];
  history: Game | null;
  statistics: Statistics;
}


export const defaultGame: Game = {
  alert: null,
  id: "",
  freezerItems: [],
  upgrades: {
    freezer: false,
    heatlamp: false
  },
  settings: {
    user: "",
    dice: [
      ["red", "red", "blue", "yellow", "white", "purple"],
      ["red", "blue", "yellow", "yellow", "white", "purple"],
      ["red", "blue", "blue", "yellow", "white", "purple"],
      ["red", "blue", "yellow", "purple", "white", "white"],
      ["red", "blue", "yellow", "white", "purple", "purple"],
      ["red", "blue", "yellow", "white", "purple", "wild"],
    ],
    gameName: "",
    platesPerColor: 5,
    startingMood: 3,
    startingTableCount: 2,
    numPlates: 1,
    hotFoodReward: 1,
    coldFoodPenalty: 0,
    diceCount: 6,
    totalRounds: 8,
    driveThruLength: 3,
    managerTrack: [
      ManagerAction.EMPTY,
      ManagerAction.EMPTY,
      ManagerAction.EMPTY,
      ManagerAction.EMPTY,
      ManagerAction.WILD,
    ],
  },
  stars: 0,
  round: 1,
  selectedResource: null,
  selectedResourceIndex: null,
  selectedCustomerIndex: null,
  availablePlates: [],
  currentAction: null,
  gamePhase: GamePhase.NOT_STARTED,
  roundPhase: RoundPhase.SETUP,
  actionDisk: {
    rotation: 0,
    colors: ["red", "blue", "yellow", "white", "purple"],
    actions: [
      ResourceAction.SEAT_CUSTOMER,
      ResourceAction.TAKE_ORDER,
      ResourceAction.COOK,
      ResourceAction.SERVE,
      ResourceAction.REFILL,
    ],
  },
  playPhase: PlayPhase.NONE,
  resources: [],
  dice: [],
  currentValue: null,
  availableActions: [],
  managerPosition: 0,
  customers: [null, null],
  grillItems: [],
  hotCounterItems: [],
  coldCounterItems: [],
  plateBag: [
    ...Array.from({ length: 5 }, () => "red"),
    ...Array.from({ length: 5 }, () => "blue"),
    ...Array.from({ length: 5 }, () => "yellow"),
    ...Array.from({ length: 5 }, () => "white"),
    ...Array.from({ length: 5 }, () => "purple"),
  ],
  dishwasher: [
    { plate: null, action: DishwasherAction.INCREASE_ONE_CUSTOMER, activated: false },
    { plate: null, action: DishwasherAction.INCREASE_ONE_CUSTOMER, activated: false },
    { plate: null, action: DishwasherAction.CUSTOMER_START_UPGRADE, activated: false },
    { plate: null, action: DishwasherAction.PULL_PLATES, activated: false },
    { plate: null, action: DishwasherAction.RESET_WHEEL, activated: false },
    { plate: null, action: DishwasherAction.ADD_TABLE, activated: false },
    { plate: null, action: DishwasherAction.FREEZER_UPGRADE, activated: false },
    { plate: null, action: DishwasherAction.HEATLAMP_UPGRADE, activated: false },
    { plate: null, action: DishwasherAction.INCREASE_ALL_CUSTOMERS, activated: false },
  ],
  selectedPlate: null,
  actionHistory: [],
  history: null,
  statistics: {
    servedCustomers: [],
    rotationCount: 0,
    roundTimers: [],
    leftOverCustomers: [],
    hotFoodServed: 0,
    coldFoodServed: 0,
    refillCount: 0,
    foodCooked: 0,
    managerActionsTaken: 0,
    managerStepsMoved: 0,
    itemsCookedWithNoOrder: 0,
    dishwasherSelections: [],
  },
};
