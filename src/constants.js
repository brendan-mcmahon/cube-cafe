const GamePhases = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  FINISHED: "Finished",
};

const RoundPhases = {
  SETUP: "Setup",
  PLAY: "Play",
  RESOLVE: "Resolve",
};

const PlayPhases = {
  SELECT_RESOURCE: "Select Resource",
  SELECT_ACTION: "Select Action",
  SELECT_PLATE: "Select Plate",
  SELECT_CUSTOMER: "Select Customer",
  SELECT_FOOD: "Select Food",
  SELECT_DIRECTION: "Select Direction",
  SELECT_COLOR: "Select Color",
  SELECT_DISHWASHER_SQUARE: "Select Dishwasher Square",
  END: "End",
  ROTATE_FREELY: "Rotate Freely",
};

const PlayerActions = {
  SEAT_CUSTOMER: "Seat Customer",
  MOVE_MANAGER: "Move Manager",
  ROTATE: "Rotate",
  COOK: "Cook",
  SERVE: "Serve",
  TAKE_ORDER: "Take Order",
  REFILL: "Refill",
  INCREASE_ONE_CUSTOMER: "Increase One Customer",
  LOAD_DISHWASHER: "Load Dishwasher",
};

const dishwasherActions = {
  INCREASE_ALL_CUSTOMERS: "Increase All Customers",
  INCREASE_ONE_CUSTOMER: "Increase One Customer",
  ADD_TABLE: "Add Table",
  PULL_PLATES: "Pull Plates",
  RESET_WHEEL: "Reset Wheel",
};

const managerActions = {};

export { GamePhases, RoundPhases, PlayPhases, PlayerActions, dishwasherActions };
