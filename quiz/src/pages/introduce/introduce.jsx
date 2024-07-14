import React, { useState } from 'react';
import './introduce.css';
import Dropdown from '../../components/dropdown/Dropdown';
import { useNavigate } from 'react-router-dom';

const Introduce = () => {
  const difficulty = ["easy", "medium", "hard"];
  const [difficultyChange, setDifficultyChange] = useState('');
  const navigate = useNavigate();
  const TOTAL_QUESTIONS = 10;

  const startQuiz = () => {
    if (difficultyChange) {
      navigate(`/quiz/${difficultyChange}/${TOTAL_QUESTIONS}`);
    }
  };

  return (
    <div className='introduce'>
      <div className='introduce-container'>
        <img src="https://st2.depositphotos.com/1800192/44988/v/450/depositphotos_449880388-stock-illustration-quiz-logo-in-liquid-bubble.jpg" alt="Quiz Logo" />
        <Dropdown data={difficulty} setDifficultyChange={setDifficultyChange} />
        <div onClick={startQuiz} className='introduce-btn'>Quiz'e Başla</div>
      </div>
    </div>
  );
};

export default Introduce;
