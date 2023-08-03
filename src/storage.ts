import ApiClient from "./apiClient";
import { Game } from "./models/game";
import { SaveFile, SaveFileData } from "./Components/SaveFile";

const apiClient = new ApiClient("https://op9jkjzc92.execute-api.us-east-2.amazonaws.com/prod");

const autosave = (game: Game) => {
  const newSave: SaveFileData = {
    id: game.id,
    user: localStorage.getItem("user") || "",
    name: game.settings.gameName,
    date: new Date(),
    game: JSON.stringify(game),
  };

  localStorage.setItem("autosave", JSON.stringify(newSave));
};

const loadAutosave = (): Game | null => {
  const autosave = localStorage.getItem("autosave");

  if (autosave) {
    console.log("Autosave found")
    return JSON.parse(autosave) as Game;

  }

  return null;
};

const clearAutoSave = () => {
  localStorage.removeItem("autosave");
};

const saveGame = (game: Game, callBack?: (_: any) => void) => {
  const newSave: SaveFileData = {
    id: game.id,
    user: localStorage.getItem("user") || "",
    name: game.settings.gameName,
    date: new Date(),
    game: JSON.stringify(game),
  };

  apiClient
    .post("/", newSave)
    .then((response) => {
      if (callBack) callBack(response);
    })
    .catch((error) => console.error(error));
};

async function getSavedGames(): Promise<SaveFile[]> {
  const response = await apiClient.get<SaveFileData[]>("/");

  const stuff = response.map((saveFileData) => {
    return {
      ...saveFileData,
      game: JSON.parse(saveFileData.game),
    } as SaveFile;
  });
  
  console.log(stuff);

  return stuff;

}

const deleteSave = (save: SaveFile, callBack: (_: any) => void) => {
  const deleteParams = {
    name: save.name,
    date: save.date,
  };

  apiClient
    .delete("/", deleteParams)
    .then((response) => {
      console.log(response);
      callBack(response);
    })
    .catch((error) => console.error(error));
};

const acknowledgeDataWarning = () => {
  localStorage.setItem("acknowledgeDataWarning", "true");
};

const isDataWarningAcknowledged = (): boolean => {
  const acknowledged = localStorage.getItem("acknowledgeDataWarning");

  if (acknowledged) {
    return true;
  }

  return false;
};

export default {
  getSavedGames,
  saveGame,
  deleteSave,
  autosave,
  loadAutosave,
  clearAutoSave,
  acknowledgeDataWarning,
  isDataWarningAcknowledged,
};
