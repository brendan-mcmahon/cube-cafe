import { ManagerAction, PlayPhase, ResourceStatus } from "../../constants";
import { Game } from "../../models/game";
import { resetAction } from "./resetAction";

type ManagerResolver = (state: Game) => Game;

// const managerActionMap: { [key in ManagerAction]: ManagerResolver } = {
//   [ManagerAction.EMPTY]: empty,
//   [ManagerAction.WILD]: wild,
//   [ManagerAction.BOOST_ONE]: (s) => boost(s, 0),
//   [ManagerAction.BOOST_TWO]: (s) => boost(s, 1),
//   [ManagerAction.BOOST_THREE]: (s) => boost(s, 2),
// };

// function boost(state: Game, table: number): Game {
//   const customers = [...state.customers];

//   if (customers !== null && customers[table] !== null) {
//     customers[table]!.pointValue++;
//   }

//   return {
//     ...state,
//     customers,
//   };
// }

// function empty(state: Game): Game {
//   return state;
// }

// function wild(state: Game): Game {
//   return {
//     ...state,
//     resources: [
//       ...state.resources,
//       {
//         color: "wild",
//         status: ResourceStatus.AVAILABLE,
//       },
//     ],
//   };
// }

// function getTarget(state: Game, max: number) {
//   const newPosition = state.managerPosition + (state.currentValue || 0);
//   return newPosition > max ? newPosition - (max + 1) : newPosition;
// }

export default function resolveManagerActions(state: Game, spaces?: number): Game {
  spaces = spaces || state.currentValue || 0;
  if (spaces === 0) return state;

  const max = state.settings.managerTrack.length - 1;
  const newPosition = state.managerPosition + spaces;

  const newState = {
    ...state,
    managerPosition: newPosition > max ? newPosition - (max + 1) : newPosition,
    statistics: {
      ...state.statistics,
      managerActionsTaken: state.statistics.managerActionsTaken + 1,
      managerStepsMoved:
        state.statistics.managerStepsMoved + spaces,
    },
  };

  if (newPosition >= max && state.managerPosition !== max) {
    return {
      ...newState,
      playPhase: PlayPhase.MANAGER_BONUS_PHASE
    }
  } else {
    return resetAction(newState);
  }
}

// export default function resolveManagerActions(state: Game): Game {
//   if (state.currentValue === 0) return state;

//   const max = state.settings.managerTrack.length - 1;
//   const target = getTarget(state, max);
//   let workingState = { ...state };
//   let current = state.managerPosition;

//   do {
//     current = current === max ? 0 : current + 1;
//     const action = state.settings.managerTrack[current];
//     if (managerActionMap[action]) workingState = managerActionMap[action](workingState);
//   } while (current !== target);
//   return {
//     ...workingState,
//     managerPosition: target,
//     statistics: {
//       ...workingState.statistics,
//       managerActionsTaken: workingState.statistics.managerActionsTaken + 1,
//       managerStepsMoved: workingState.statistics.managerStepsMoved + (state.currentValue || 0),
//     },
//   };
// }
