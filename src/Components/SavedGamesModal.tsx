import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { useGame } from "../gameContext";
import "./styles/SavedGamesModal.scss";
import Trash from "../icons/Trash";
import { GameAction, GamePhase } from "../constants";
import { IModalProps } from "./IModalProps";
import storage from "../storage";
import { SaveFile } from "./SaveFile";
import { dateFormat } from "./dateFormat";

export default function SavedGamesModal(props: IModalProps) {
  const { dispatch } = useGame();
  const [savedGames, setSavedGames] = useState<SaveFile[]>([]);
  const [doneLoading, setDoneLoading] = useState<boolean>(false);

  useEffect(() => {
    if (props.show) {
      setDoneLoading(false);
      storage.getSavedGames().then((games) => {
        setSavedGames(games);
        setDoneLoading(true);
      });
    }
  }, [props.show]);

  const loadGame = (index: number) => {
    dispatch({ type: GameAction.LOAD_GAME, game: savedGames[index].game });
    props.setShow(false);
  };

  const deleteGame = async (index: number) => {
    setDoneLoading(false);
    storage.deleteSave(savedGames[index], () => {
      storage.getSavedGames().then((games) => {
        setSavedGames(games);
        setDoneLoading(true);
      });
    });
  };

  let body = null;

  if (!doneLoading) {
    body = <p>Loading...</p>;
  }
  else if (savedGames.length === 0) {
    body = <p>No saved games</p>;
  } else {
    body = (
      <ul className="load-save-state">
        {savedGames?.map((save, index: number) => {
          return (
            <li key={index}>
              <div className="info" onClick={() => loadGame(index)}>
                <p className="saved-game-name">
                  {save.name}
                </p>
                <p className="saved-game-date">{new Date(save.date).toLocaleString("en-US", dateFormat)}</p>
                <p className={`saved-game-phase ${save.game.gamePhase}`}>{save.game.gamePhase }</p>
              </div>

              <button onClick={() => deleteGame(index)} className="delete-game">
                <Trash />
              </button>
            </li>
          );
        })
        }
      </ul >
    );
  }
  return (
    <Modal title="Saved Games" show={props.show} setShow={props.setShow}>
      {body}
    </Modal>
  );
}
