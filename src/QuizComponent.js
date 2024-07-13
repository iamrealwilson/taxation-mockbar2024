import React, { useState } from 'react';

const QuizComponent = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 13;
  
  const goToPreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleAnswerChange = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  return (
    <div>
      <h1>Question {currentQuestion}</h1>
      <input
        type="text"
        value={answers[currentQuestion] || ''}
        onChange={(e) => handleAnswerChange(e.target.value)}
      />
      <button onClick={goToPreviousQuestion} disabled={currentQuestion === 1}>
        Previous
      </button>
      <button onClick={goToNextQuestion} disabled={currentQuestion === totalQuestions}>
        Next
      </button>
    </div>
  );
};

export default QuizComponent;