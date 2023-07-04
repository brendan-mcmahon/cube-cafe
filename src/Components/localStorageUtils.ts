import ApiClient from "../apiClient";
import { Game } from "../game";
import { SaveFile, SaveFileData } from "./SaveFile";

const apiClient = new ApiClient("https://op9jkjzc92.execute-api.us-east-2.amazonaws.com/prod");

const saveFileReviver = (key: string, value: any): any => {
  if (key === "date" && typeof value === "string") {
    return new Date(value);
  }
  return value;
};

const getItem = (key: string) => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item, saveFileReviver);
  }
  return null;
};

const saveGame = (name: string, game: Game, callBack: (_: any) => void) => {
  const newSave: SaveFileData = {
    name: name,
    date: new Date(),
    game: JSON.stringify(game),
  };

  apiClient
    .post("/", newSave)
    .then((response) => {
      callBack(response);
    })
    .catch((error) => console.error(error));
};

async function getSavedGames(): Promise<SaveFile[]> {
  const response = await apiClient.get<SaveFileData[]>("/");

  // convert the response to a SaveFile[]
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

const setItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

function isSaveFileArray(array: any): array is SaveFile[] {
  return (
    Array.isArray(array) &&
    array.every((item) => {
      return (
        typeof item === "object" &&
        "saveName" in item &&
        typeof item.saveName === "string" &&
        "date" in item &&
        item.date instanceof Date &&
        "game" in item &&
        typeof item.game === "object"
      );
    })
  );
}

export default {
  getSavedGames,
  saveGame,
  deleteSave,
};
