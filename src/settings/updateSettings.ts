import { Game } from "../models/game";
import { cloneCars, cloneTables } from "../cloners";
import { Settings } from "../models/Settings";

function updateSettings(state: Game, newSettings: Settings): Game {
  // const newCustomers = handleTableCountChange(state, newSettings);

  return {
    ...state,
    settings: newSettings,
    tables: cloneTables(state),
    cars: cloneCars(state),
  };
}

// function handleTableCountChange(state, newSettings) {
//   let newCustomers = [...state.customers];
//   if (state.settings.tableCount !== newSettings.tableCount) {
//     const difference = newSettings.tableCount - state.settings.tableCount;

//     if (difference > 0) {
//       for (let i = 0; i < difference; i++) {
//         newCustomers.push(null);
//       }
//     } else {
//       for (let i = 0; i < Math.abs(difference); i++) {
//         newCustomers.pop();
//       }
//     }
//   }
//   return newCustomers;
// }

export { updateSettings };
