import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { useGame } from "../gameContext";
import "./styles/SavedGamesModal.scss";
import Trash from "../icons/Trash";
import { GameAction } from "../constants";
import { IModalProps } from "./IModalProps";
import storage from "./localStorageUtils";

const dateFormat: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

export default function SavedGamesModal(props: IModalProps) {
  const { dispatch } = useGame();
  const [savedGames, setSavedGames] = useState(storage.getSavedGames());

  useEffect(() => {
    if (props.show) {
      setSavedGames(storage.getSavedGames());
    }
  }, [props.show]);

  const loadGame = (index: number) => {
    dispatch({ type: GameAction.LOAD_GAME, game: savedGames[index].game });
    props.setShow(false);
  };

  const deleteGame = (index: number) => {
    setSavedGames(storage.deleteSave(savedGames[index].saveName));
  };

  let body = null;

  if (savedGames.length === 0) {
    body = <p>No saved games</p>;
  } else {
    body = (
      <ul className="load-save-state">
        {savedGames?.map((save, index: number) => {
          return (
            <li key={index}>
              <p className="saved-game-name" onClick={() => loadGame(index)}>
                {save.saveName}
              </p>
              <p>{new Date(save.date).toLocaleString("en-US", dateFormat)}</p>
              <button onClick={() => deleteGame(index)} className="delete-game">
                <Trash />
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <Modal title="Saved Games" show={props.show} setShow={props.setShow}>
      {body}
    </Modal>
  );
}
