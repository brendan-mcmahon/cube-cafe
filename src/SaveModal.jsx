import { Modal } from "./Modal";
import { useGame } from "./gameContext";
import "./SaveModal.scss";

export default function SaveDialog({ show, setShow }) {
  const { state } = useGame();
  const onSaveClicked = (e) => {
    e.preventDefault();

    const saveName = e.target.saveName.value;
    const savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];
    const newSavedGames = [...savedGames, { saveName, date: new Date(), state }];
    localStorage.setItem("savedGames", JSON.stringify(newSavedGames));

    setShow(false);
  };

  return (
    <Modal title="Save Game" show={show} setShow={setShow}>
      <form id="SaveDialog" onSubmit={onSaveClicked}>
        <label htmlFor="saveName">
          Name:
          <input type="text" id="saveName" name="saveName" />
        </label>
        <button type="submit">Save</button>
      </form>
    </Modal>
  );
}
