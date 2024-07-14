import React from 'react';
import './Modal.css';

const Modal = ({ score, correctAnswers, incorrectAnswers, onClose }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <h2>Quiz Bitti!</h2>
        <p>Skor: {score}</p>
        <p>Doğru Cevaplar: {correctAnswers}</p>
        <p>Yanlış Cevaplar: {incorrectAnswers}</p>
        <button onClick={onClose}>Kapat</button>
      </div>
    </div>
  );
};

export default Modal;
