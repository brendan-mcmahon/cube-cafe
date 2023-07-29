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

export enum DishwasherAction {
  MOVE_MANAGER = "Move Manager",
  COLLECT_RESOURCE = "Collect Resource",
  COPY_RESOURCE = "Copy Resource",
};

export enum PlayPhase {
  NONE = "None",
  SELECT_RESOURCE = "Select Resource",
  SELECT_ACTION = "Select Action",
  PLATE_SELECTION_PHASE = "Select Plate",
  SELECT_CUSTOMER = "Select Customer",
  SELECT_FOOD = "Select Food",
  SELECT_DIRECTION = "Select Direction",
  SELECT_COLOR = "Select Color",
  SELECT_DISHWASHER_SQUARE = "Select Dishwasher Square",
  END = "End",
  ROTATE_FREELY = "Rotate Freely",
  SELECT_CAR = "Select Car",
  MANAGER_BONUS_PHASE = "Select Manager Bonus",
  LOAD_DISHWASHER = "Load Dishwasher",
  SELECT_RESOURCE_TO_COPY = "Select a Resource to Copy",
};

export enum CustomerStatus {
  WAITING = "waiting",
  EATING = "eating",
  FINISHED = "finished",
}

export enum RefillStatus {
  EMPTY = "empty",
  FULL = "full",
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
  SERVE_CAR = "Serve Car",
}

export enum ManualAction {
  INCREASE_ONE_CUSTOMER = "Increase One Customer",
  LOAD_DISHWASHER = "Load Dishwasher",
  SELECT_RESOURCE = "Select Resource",
  SELECT_TABLE = "Select Table",
  SELECT_CAR = "Select Car",
  SELECT_FOOD = "Select Food",
  UNDO = "Undo",
  FINISHED_ROTATING = "Finished Rotating",
  FREEZE_RESOURCE = "Freeze Resource",
  THAW_RESOURCE = "Thaw Resource",
  SELECT_MANAGER_BONUS = "Select Manager Bonus",
  CLEAR_TABLE = "Clear Table",
  SELECT_RESOURCE_TO_COPY = "Select Resource to Copy",
};

export enum ManagerAction {
  EMPTY = "empty",
  WILD = "wild",
  BOOST_ONE = "+1 (1)",
  BOOST_TWO = "+1 (2)",
  BOOST_THREE = "+1 (3)"
};

export enum GameAction {
  LOAD_GAME = "Load Game",
  QUIT_GAME = "Quit Game",
  SET_SETTINGS = "Set Settings",
  ROUND_SETUP = "Round Setup",
  ROUND_TEARDOWN = "Round Teardown",
  GAME_SETUP = "Game Setup"
}