import Trash from "../icons/Trash";

export function ManagerTrackStep({ index, step, updateStep, deleteStep }) {
  return (
    <li className="manager-track-step">
      <label>{index + 1}:</label>
      <select name="manager-track-step" value={step} onChange={(e) => updateStep(index, e)}>
        <option value="empty"></option>
        <option value="wild">+1 Wild</option>
      </select>

      <button onClick={(e) => deleteStep(index, e)} className="delete-manager-track-step">
        <Trash />
      </button>
    </li>
  );
}
