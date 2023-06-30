import { Modal } from "./Modal";
import { useEffect, useState } from "react";
import { useGame } from "./gameContext";
import "./SavedGamesModal.scss";
import Trash from "./icons/Trash";

const dateFormat = {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export default function SavedGamesModal({ show, setShow }) {
  const { dispatch } = useGame();
  const [savedGames, setSavedGames] = useState(JSON.parse(localStorage.getItem("savedGames")) || []);

  useEffect(() => {
    if (show) {
      setSavedGames(JSON.parse(localStorage.getItem("savedGames")) || []);
    }
  }, [show]);

  const loadGame = (index) => {
    dispatch({ type: "LOAD_GAME", gameFile: savedGames[index].state });
    setShow(false);
  };

  const deleteGame = (index) => {
    const newSavedGames = savedGames.filter((_, i) => i !== index);
    setSavedGames(newSavedGames);
    localStorage.setItem("savedGames", JSON.stringify(newSavedGames));
  };

  let body = null;

  if (savedGames.length === 0) {
    body = <p>No saved games</p>;
  } else {
    body = (
      <ul className="load-save-state">
        {savedGames?.map((save, i) => {
          return (
            <li key={i}>
              <p className="saved-game-name" onClick={() => loadGame(i)}>
                {save.saveName}
              </p>
              <p>{new Date(save.date).toLocaleString("en-US", dateFormat)}</p>
              <button onClick={() => deleteGame(i)} className="delete-game">
                <Trash />
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <Modal title="Saved Games" show={show} setShow={setShow}>
      {body}
    </Modal>
  );
}
