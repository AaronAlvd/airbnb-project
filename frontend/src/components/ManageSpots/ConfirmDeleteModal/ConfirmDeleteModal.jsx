
import './ConfirmDeleteModal.css'; // Include your CSS here

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null; // Don't render if the modal isn't open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot?</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>Yes (Delete Spot)</button>
          <button className="cancel-button" onClick={onClose}>No (Keep Spot)</button>
        </div>
      </div>
    </div>
  );
}
