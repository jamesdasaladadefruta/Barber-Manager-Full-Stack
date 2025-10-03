// Modal.js
import React from "react";
import "./Modal.css"; // Import your CSS for styling

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null; // Don't render if the modal is not open
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;