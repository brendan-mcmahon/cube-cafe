import { CustomerStatus, PlayPhase } from "../../constants";
import { Game, Statistics } from "../../models/game";
import Customer from "../../models/Customer";
import { resetAction } from "./resetAction";
import { cloneTables } from "../../cloners";

export default function selectFood(
  state: Game,
  foodIndex: number,
  counter: string
): Game {
  if (state.selectedTableIndex === null || !state.tables[state.selectedTableIndex].customer)
    return state;

  const statistics = { ...state.statistics };

  const { hotCounterItems, coldCounterItems } = moveFood(state, counter, foodIndex);

  const tables = handleCustomer(state, counter, statistics);

  return resetAction({
    ...state,
    hotCounterItems,
    coldCounterItems,
    tables,
    playPhase: PlayPhase.SELECT_CUSTOMER,
    statistics,
  });
}

function handleCustomer(state: Game, counter: string, statistics: Statistics) {
  
  const tables = cloneTables(state);
  const selectedCustomer: Customer = {
    ...tables[state.selectedTableIndex!].customer!,
    status: CustomerStatus.EATING,
  };

  if (counter === "hot") {
    selectedCustomer.pointValue = Math.min(selectedCustomer.pointValue + 1, 5);
    statistics.hotFoodServed++;
  } else {
    statistics.coldFoodServed++;
  }

  tables[state.selectedTableIndex!].customer = selectedCustomer;
  return tables;
}

function moveFood(state: Game, counter: string, foodIndex: number) {
  let hotCounterItems = [...state.hotCounterItems];
  let coldCounterItems = [...state.coldCounterItems];
  if (counter === "hot"){
    hotCounterItems.splice(foodIndex, 1);
  }
  else {
    coldCounterItems.splice(foodIndex, 1);
  }
  return { hotCounterItems, coldCounterItems };
}
