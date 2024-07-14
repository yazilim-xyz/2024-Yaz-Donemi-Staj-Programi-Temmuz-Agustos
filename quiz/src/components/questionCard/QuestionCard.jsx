import React, { useEffect, useState, useCallback } from 'react';
import './QuestionCard.css';

const QuestionCard = ({ questionsData, score, setScore, count, setCount, setModalOpen }) => {
  const [timer, setTimer] = useState(30);

  const approvedChoice = useCallback((e) => {
    const selectedAnswer = e.currentTarget.value;
    const correctAnswer = questionsData[count].correct_answer;
    const checkAnswer = selectedAnswer === correctAnswer;

    if (checkAnswer) {
      setScore(score + 100);
    }
    setCount(count + 1);
    if (count === 9) {
      setModalOpen(true);
    }
    setTimer(30);
  }, [count, questionsData, score, setCount, setModalOpen, setScore]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else if (count < 10) {
        setCount(count + 1);
        setTimer(30);
      } else if (count >= 10) {
        setModalOpen(true);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer, count, setCount, setModalOpen]);

  return (
    <div className='questionCard'>
      <div className='questionCard-timer'>{timer}</div>
      <div className='questionCard-title'>
        {count + 1}/10 - {questionsData[count]?.question}
      </div>
      {questionsData[count]?.answers.map((answer, i) => (
        <button onClick={approvedChoice} key={i} value={answer}>
          {answer}
        </button>
      ))}
    </div>
  );
};

export default QuestionCard;
