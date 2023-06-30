import "./Modal.scss";
import X from "./icons/X";

export function Modal({ show, setShow, title, children }) {
  if (!show) return null;

  const handleClose = () => setShow(false);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1>{title}</h1>
          <span className="close" onClick={handleClose}>
            <X />
          </span>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
