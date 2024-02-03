
import React from 'react';
import './ResultModal.css';

import rules from '../images/image-rules.svg';
import closeIcon from '../images/icon-close.svg';

const ResultModal = ({ result, closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="header">
          <div className="title">
            <span>RULES</span>
          </div>
          <button className="close-button" onClick={closeModal}>
            <img src={closeIcon} alt="Close Icon" />
          </button>
        </div>
        <div className="image-container">
          <img src={rules} alt="Rules" className="rules-image" />
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
