import React from 'react';
import './FinishMessage.css';

const FinishMessage = ({ onClose }) => {
  return (
    <div className="finish-message-overlay">
      <div className="finish-message-content">
        <h2>Thank you for taking the exam.</h2>
        <p>We will come back for the review of your answer.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default FinishMessage;