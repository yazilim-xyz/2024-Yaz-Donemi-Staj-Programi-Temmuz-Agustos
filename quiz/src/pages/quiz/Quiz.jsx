import React, { useEffect, useState } from 'react';
import './Quiz.css';
import { useParams } from 'react-router-dom';
import * as api from '../../api/api';
import QuestionCard from '../../components/questionCard/QuestionCard';
import Modal from '../../components/modal/Modal'; // Modal component dosyanıza göre path'i ayarlayın

const Quiz = () => {
  const { difficulty, amount } = useParams();
  const [questionsData, setQuestionsData] = useState([]);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await api.fetchQuizData(difficulty, amount);
        setQuestionsData(data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
    getData();
  }, [difficulty, amount]);

  const handleQuizFinish = () => {
    setModalOpen(true);
    // Doğru ve yanlış sayılarınızı set etmek için gerekli state güncellemeleri
    // Örneğin:
    // setCorrectAnswers(correctAnswersState);
    // setIncorrectAnswers(incorrectAnswersState);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    // Yeniden başlama işlemleri veya diğer gerekli resetlemeler
  };

  return (
    <div className='quiz'>
      {modalOpen ? (
        <Modal
          score={score}
          correctAnswers={0} // Doğru cevap sayısını buraya gönderin
          incorrectAnswers={10 - score} // Yanlış cevap sayısını buraya gönderin
          onClose={handleModalClose}
        />
      ) : (
        <QuestionCard
          questionsData={questionsData}
          score={score}
          setScore={setScore}
          count={count}
          setCount={setCount}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  );
};

export default Quiz;
