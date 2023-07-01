import { Game } from "../game";
import { SaveFile } from "./SaveFile";

const saveFileReviver = (key: string, value: any): any => {
  if (key === 'date' && typeof value === 'string') {
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
}

const getSavedGames = (): SaveFile[] => {
    const savedGames = getItem("savedGames");
    if (savedGames && isSaveFileArray(savedGames)) {
      return savedGames;
    }
    return [];
  }

const saveGame = (saveName: string, game: Game) => {
    const savedGames = getSavedGames();
    const newSave: SaveFile = {
        saveName: saveName,
        date: new Date(),
        game: game
    }
    savedGames.push(newSave);
    setItem("savedGames", savedGames);
}

const deleteSave = (saveName: string) => {
    const savedGames = getSavedGames();
    const newSavedGames = savedGames.filter(save => save.saveName !== saveName);
    setItem("savedGames", newSavedGames);
    return newSavedGames;
}

const setItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
}

function isSaveFileArray(array: any): array is SaveFile[] {
    return Array.isArray(array) && array.every(item => {
        return typeof item === 'object' && 
        'saveName' in item && typeof item.saveName === 'string' &&
        'date' in item && item.date instanceof Date &&
        'game' in item && typeof item.game === 'object'
      }
    );
  }

export default {
    getSavedGames,
    saveGame,
    deleteSave,
}