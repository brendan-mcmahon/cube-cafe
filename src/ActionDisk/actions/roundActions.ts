import { PlayPhase, RoundPhase, GamePhase, ResourceStatus } from "../../constants";
import dishwasherResolver from "./dishwasherActions";
import { Game, Resource, RoundTimer } from "../../models/game";
import { generateRestaurantName } from "../../nameGenerator";
import playPhaseActions from "./playPhaseActions";
import { colors } from "../../colors";
import { roundTearDown } from "./roundTearDown";
import { cloneCars, cloneTables } from "../../cloners";

function gameSetup(state: Game) {
  const gameName = generateRestaurantName();

  let rotateCount = Math.floor(Math.random() * 6);
  rotateCount = 0;
  console.log('do we have a drive thru yet?', state.upgrades.driveThru, state.settings.driveThruRound, state.round)
  let newState = {...state};
  for (let i = 0; i < rotateCount; i++) {
    newState = playPhaseActions.rotate(newState, "clockwise");
  }

  const plateBag = shuffle([...state.plateBag]);

  return roundSetup({
    ...newState,
    actionDisk: {
      ...newState.actionDisk,

    },
    plateBag,
    settings: {
      ...newState.settings,
      gameName,
    },
    upgrades: {
      ...newState.upgrades,
      driveThru: newState.upgrades.driveThru || state.round >= (state.settings.driveThruRound - 1),
    },
    playbackHistory: {
      settings: newState.settings,
      plateBag,
      rounds: [],
    },
  });
}

function roundSetup(state: Game): Game {
  const dice = rollDice(state);

  const color = colors[Math.floor(Math.random() * (colors.length - 1))];

  const cars = cloneCars(state);
  console.log(state.upgrades.driveThru, state.settings.driveThruRound, state.round);
  if (state.upgrades.driveThru || state.settings.driveThruRound <= state.round)
    cars[0] = { color, status: 'waiting'};

  return {
    ...state,
    cars,
    dice,
    resources: pullResources(dice),
    roundPhase: RoundPhase.PLAY,
    playPhase: PlayPhase.SELECT_RESOURCE,
    gamePhase: GamePhase.IN_PROGRESS,
    statistics: {
      ...state.statistics,
      roundTimers: addRoundTimer(state)
    },
  };
}

function addRoundTimer(state: Game): RoundTimer[] {
  return [...state.statistics.roundTimers, { start: new Date(), end: null }];
}

function pullResources(dice: string[]): Resource[] {
  return dice.map((die) => {
    return { color: die, status: ResourceStatus.AVAILABLE };
  });
}

function rollDice(state: Game): string[] {
  const diceCount = state.settings.dice.length;

  return Array
    .from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1)
    .map((die, index) => state.settings.dice[index][die - 1]);
}

function finishRotating(state: Game): Game {
  return roundTearDown({
    ...state,
  });
}

function loadDishwasher(state: Game, squareIndex: number): Game {
  if (!state.selectedPlate) {
    throw new Error("No plate selected");
  }

  const dishwasher = [...state.dishwasher];
  dishwasher[squareIndex] = {
    ...dishwasher[squareIndex],
    plate: state.selectedPlate,
    available: false,
  };

  const tables = cloneTables(state);
  tables[state.selectedTableIndex!].plate = null;

  return dishwasherResolver(
    {
      ...state,
      selectedPlate: null,
      tables,
      dishwasher,
    },
    dishwasher[squareIndex].action,
    dishwasher[squareIndex].color
  );
}

export { gameSetup, roundSetup, loadDishwasher, finishRotating };
  function shuffle(items: string[]): string[] {
    let currentIndex = items.length;
    let temporaryValue: string;
    let randomIndex: number;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = items[currentIndex];
      items[currentIndex] = items[randomIndex];
      items[randomIndex] = temporaryValue;
    }
  
    return items;

  }

