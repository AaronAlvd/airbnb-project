// ConfirmationModal.jsx

import './ConfirmModal.css'; // Add styles as needed

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirmation-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <div className="modal-buttons">
        <button className="delete-button" onClick={onConfirm}>Yes (Delete Review)</button>
        <button className="cancel-button" onClick={onCancel}>No (Keep Review)</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
