import ApiClient from "./apiClient";
import { Game } from "./game";
import { SaveFile, SaveFileData } from "./Components/SaveFile";

const apiClient = new ApiClient("https://op9jkjzc92.execute-api.us-east-2.amazonaws.com/prod");

const saveGame = (game: Game, callBack?: (_: any) => void) => {
  const newSave: SaveFileData = {
    id: game.id,
    user: game.settings.user,
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

  return response.map((saveFileData) => {
    return {
      ...saveFileData,
      game: JSON.parse(saveFileData.game),
    } as SaveFile;
  });
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

export default {
  getSavedGames,
  saveGame,
  deleteSave,
};
