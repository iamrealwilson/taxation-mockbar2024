import React, { useState, useEffect } from 'react';
import './styles.css';
import FinishMessage from './FinishMessage';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import './RichTextEditor.css'; // for custom styles
import questions from './Taxation.js';

const QuizInterface = () => {

const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'script',
    'indent',
    'direction',
    'color', 'background',
    'font',
    'align',
    'link', 'image', 'video'
  ];
  
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showFinishMessage, setShowFinishMessage] = useState(false);
  const [questionText, setQuestionText] = useState('');

  const totalQuestions = 345;

	const getQuestionById = (data, id) => {
	  const filtered = data.filter(item => item.questionId == id);
	  return filtered.length > 0 ? filtered[0].text : null;
	}

  const fetchQuestion = async (questionId) => {
    try {
	  const question = getQuestionById(questions, questionId);
      setQuestionText(question);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  useEffect(() => {
    fetchQuestion(currentQuestion);
  }, [currentQuestion]);
  
  const handleAnswerChange = (value) => {
	if (value.trim() !== '<p><br></p>'){
			setAnswers(prev => ({
		  ...prev,
		  [currentQuestion]: value
		}));
	}
	
  };
 
  const toggleFlagQuestion = () => {
    setFlaggedQuestions(prev => {
      if (prev.includes(currentQuestion)) {
        return prev.filter(q => q !== currentQuestion);
      } else {
        return [...prev, currentQuestion];
      }
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
	
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSelectQuestion = (event) => {
    const selectedQuestion = parseInt(event.target.value);
    setCurrentQuestion(selectedQuestion);
  };
  
  const isExamComplete = () => {
    return Object.keys(answers).length === totalQuestions &&
           Object.values(answers).every(answer => answer.trim() !== '');
  };
  
  
  const handleFinish = async () => {
    if (isExamComplete()) {
      try {
        await axios.post('http://localhost:5000/api/questions/submit', { answers: Object.values(answers) });
        setShowFinishMessage(true);
      } catch (error) {
        console.error('Error submitting answers:', error);
        alert('Failed to submit answers. Please try again.');
      }
    } else {
      alert('Please answer all questions before finishing the exam.');
    }
  };
 

  const closeFinishMessage = () => {
    setShowFinishMessage(false);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        {[...Array(totalQuestions)].map((_, index) => (
          <div 
            key={index} 
            className={`question-circle ${index + 1 === currentQuestion ? 'current' : ''} ${flaggedQuestions.includes(index + 1) ? 'flagged' : ''} ${answers[index+1] && answers[index+1].trim() !== '' ? 'answered' : ''}`}
            onClick={() => setCurrentQuestion(index + 1)}
          >
            {index + 1}
            {flaggedQuestions.includes(index + 1) && <span className="flag-indicator">⚑</span>}
          </div>
        ))}
      </div>
      <div className="main-content">
        <div className="question-header">
          <select value={currentQuestion} onChange={handleSelectQuestion}>
            {[...Array(totalQuestions)].map((_, index) => (
              <option key={index} value={index + 1}>Question {index + 1}</option>
            ))}
          </select>
          <button 
            className={`flag-button ${flaggedQuestions.includes(currentQuestion) ? 'flagged' : ''}`}
            onClick={toggleFlagQuestion}
          >
            {flaggedQuestions.includes(currentQuestion) ? 'UNFLAG QUESTION' : 'FLAG QUESTION'}
          </button>
        </div>
        <div className="question-text">
          {questionText}
        </div>
        <div className="answer-area">
		    <div className="rich-text-editor">
			  <ReactQuill 
				theme="snow"
				className="ql-container"
				value={answers[currentQuestion] || ''}
				onChange={handleAnswerChange}
				modules={modules}
				formats={formats}
			  />
			  
			  </div>
        </div>
		
		<div className="footer">
        <span>{currentQuestion} OF {totalQuestions} QUESTIONS {flaggedQuestions.length} Question(s) Flagged</span>
        <button 
          className={`button previous-button ${currentQuestion === 1 ? 'disabled' : ''}`}
          onClick={goToPreviousQuestion}
          disabled={currentQuestion === 1}
        >
         Back
        </button>
		
        {currentQuestion < totalQuestions && (
          <button 
            className="button next-button"
            onClick={goToNextQuestion}
          >
            Next
          </button>
        )}
        
		{currentQuestion === totalQuestions && (
          <button 
            className="button finish-button" 
            onClick={handleFinish}
            disabled={!isExamComplete()}
          >
            Finish
          </button>
        )}
				
        <button className="button finish-button" onClick={handleFinish}>Finish</button>
      </div>

	  {showFinishMessage && <FinishMessage onClose={closeFinishMessage} />}
	  
      </div>
      
	</div>
  );
};

export default QuizInterface;