import { colors } from "../colors";
import {
  GamePhase,
  RoundPhase,
  PlayPhase,
  DishwasherAction,
  ManagerAction, ResourceAction
} from "../constants";
import { defaultTable } from "./defaultGame";
import { Game } from "./game";

const tutorialSettings = {
  user: "tutorial",
  refillMode: "once",
  cookWildsAsWild: true,
  angryCustomersLeave: true,
  dice: [
    [colors[0], colors[1], colors[2], colors[3], colors[4], colors[0]],
    [colors[0], colors[1], colors[2], colors[3], colors[4], colors[1]],
    [colors[0], colors[1], colors[2], colors[3], colors[4], colors[2]],
    [colors[0], colors[1], colors[2], colors[3], colors[4], colors[3]],
    [colors[0], colors[1], colors[2], colors[3], colors[4], colors[4]],
    [colors[0], colors[1], colors[2], colors[3], colors[4], colors[5]],
  ],
  driveThruRound: 5,
  driveThruRewards: [3, 2],
  gameName: "Tutorial",
  platesPerColor: 5,
  startingMood: 3,
  numPlates: 1,
  hotFoodReward: 1,
  coldFoodPenalty: 0,
  diceCount: 6,
  totalRounds: 8,
  managerTrack: [
    ManagerAction.EMPTY,
    ManagerAction.EMPTY,
    ManagerAction.EMPTY,
    ManagerAction.EMPTY,
    ManagerAction.CUBE_OR_POINT,
  ],
};

export const tutorial: Game = {
  tutorialMode: true,
  cars: [null, null],
  carPulls: ["red", "blue", "green", "yellow", "red", "yellow", "yellow"],
  bonusPoints: 0,
  alert: null,
  id: "",
  freezerItems: [],
  upgrades: {
    freezer: false,
    heatlamp: false,
    driveThru: true
  },
  settings: tutorialSettings,
  stars: 0,
  round: 1,
  selectedResource: null,
  selectedResourceIndex: null,
  selectedTableIndex: null,
  availablePlates: [],
  currentAction: null,
  gamePhase: GamePhase.IN_PROGRESS,
  roundPhase: RoundPhase.SETUP,
  actionDisk: {
    rotation: 0,
    // colors: ["red", "blue", "yellow", "purple", "green"],
    colors: [...colors.slice(0, 5)],
    actions: [
      ResourceAction.SEAT_CUSTOMER,
      ResourceAction.TAKE_ORDER,
      ResourceAction.COOK,
      ResourceAction.SERVE,
      ResourceAction.REFILL,
      ResourceAction.SERVE_CAR,
    ],
  },
  playPhase: PlayPhase.NONE,
  resources: [],
  dice: [],
  rolls: [
    ["purple", "red", "yellow", "yellow", "red", "red"],
    ["purple", "red", "yellow", "yellow", "red", "red"],
    ["purple", "red", "yellow", "yellow", "red", "red"],
    ["purple", "red", "yellow", "yellow", "red", "red"],
    ["purple", "red", "yellow", "yellow", "red", "red"],
    ["purple", "red", "yellow", "yellow", "red", "red"],
    ["purple", "red", "yellow", "yellow", "red", "red"],
    ["purple", "red", "yellow", "yellow", "red", "red"],
  ], // need to populate this
  currentValue: null,
  availableActions: [],
  managerPosition: 0,
  tables: [{...defaultTable}, {...defaultTable}, {...defaultTable}],
  grillItems: [],
  hotCounterItems: [],
  coldCounterItems: [],
  plateBag: [
    "yellow", "yellow", "yellow", "red"
  ],
  selectedPlate: null,
  actionHistory: [],
  playbackHistory: {
    settings: tutorialSettings,
    plateBag: [],
    rounds: [],
  },
  history: null,
  statistics: {
    servedCustomers: [],
    customerPoints: 0,
    managerPoints: 0,
    carPoints: 0,
    rotationCount: 0,
    roundTimers: [],
    unfinishedTables: [],
    hotFoodServed: 0,
    coldFoodServed: 0,
    refillCount: 0,
    foodCooked: 0,
    managerActionsTaken: 0,
    managerStepsMoved: 0,
    itemsCookedWithNoOrder: 0,
    dishwasherSelections: [],
    lostCustomers: 0,
    carsFed: 0,
  },
  dishwasher: [
    { action: DishwasherAction.MOVE_MANAGER, color: null, plate: null, available: true },
    { action: DishwasherAction.COLLECT_RESOURCE, color: colors[0], plate: null, available: true },
    { action: DishwasherAction.COPY_RESOURCE, color: null, plate: null, available: true },
    { action: DishwasherAction.COLLECT_RESOURCE, color: colors[1], plate: null, available: true },
    { action: DishwasherAction.COLLECT_RESOURCE, color: colors[2], plate: null, available: true },
    { action: DishwasherAction.COLLECT_RESOURCE, color: colors[3], plate: null, available: true },
    { action: DishwasherAction.COPY_RESOURCE, color: null, plate: null, available: true },
    { action: DishwasherAction.COLLECT_RESOURCE, color: colors[4], plate: null, available: true },
    { action: DishwasherAction.MOVE_MANAGER, color: null, plate: null, available: true },
  ],
};
