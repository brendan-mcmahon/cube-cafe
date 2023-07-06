export enum GamePhase {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  FINISHED = "Finished",
};

export enum RoundPhase {
  NONE = "None",
  SETUP = "Setup",
  PLAY = "Play",
  RESOLVE = "Resolve",
};

export enum PlayPhase {
  NONE = "None",
  SELECT_RESOURCE = "Select Resource",
  SELECT_ACTION = "Select Action",
  SELECT_PLATE = "Select Plate",
  SELECT_CUSTOMER = "Select Customer",
  SELECT_FOOD = "Select Food",
  SELECT_DIRECTION = "Select Direction",
  SELECT_COLOR = "Select Color",
  SELECT_DISHWASHER_SQUARE = "Select Dishwasher Square",
  END = "End",
  ROTATE_FREELY = "Rotate Freely",
};

export enum CustomerStatus {
  WAITING = "waiting",
  EATING = "eating",
  FINISHED = "finished",
}

export enum ResourceStatus {
  AVAILABLE = "available",
  EXHAUSTED = "exhausted",
}

export enum ResourceAction {
  SEAT_CUSTOMER = "Seat Customer",
  MOVE_MANAGER = "Move Manager",
  ROTATE_CLOCKWISE = "Rotate Clockwise",
  ROTATE_COUNTERCLOCKWISE = "Rotate Counterclockwise",
  COOK = "Cook",
  SERVE = "Serve",
  TAKE_ORDER = "Take Order",
  REFILL = "Refill",
}

export enum ManualAction {
  INCREASE_ONE_CUSTOMER = "Increase One Customer",
  LOAD_DISHWASHER = "Load Dishwasher",
  SELECT_RESOURCE = "Select Resource",
  SELECT_CUSTOMER = "Select Customer",
  SELECT_FOOD = "Select Food",
  UNDO = "Undo",
  FINISHED_ROTATING = "Finished Rotating",
};

export enum DishwasherAction {
  INCREASE_ALL_CUSTOMERS = "Increase All Customers",
  INCREASE_ONE_CUSTOMER = "Increase One Customer",
  ADD_TABLE = "Add Table",
  PULL_PLATES = "Pull Plates",
  RESET_WHEEL = "Reset Wheel",
};

export enum ManagerAction {
  EMPTY = "empty",
  WILD = "wild",
};

export enum GameAction {
  LOAD_GAME = "Load Game",
  QUIT_GAME = "Quit Game",
  SET_SETTINGS = "Set Settings",
  ROUND_SETUP = "Round Setup",
  ROUND_TEARDOWN = "Round Teardown",
}