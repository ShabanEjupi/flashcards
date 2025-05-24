import React, { useState } from 'react';
import questions from '../data/questions';
import { shuffleArray } from '../utils/helpers';

const QuizMode = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState(shuffleArray([...questions]).slice(0, 10));
  
  const handleAnswer = (isCorrect) => {
    if(isCorrect) setScore(score + 1);
    setShowAnswer(true);
  };
  
  const nextQuestion = () => {
    setShowAnswer(false);
    setCurrentQuestion(currentQuestion + 1);
  };
  
  return (
    <div className="quiz-container">
      {currentQuestion < quizQuestions.length ? (
        <>
          <h2>Pyetja {currentQuestion + 1} nga {quizQuestions.length}</h2>
          <div className="question">{quizQuestions[currentQuestion].question}</div>
          
          {!showAnswer ? (
            <div className="options">
              <button onClick={() => handleAnswer(true)}>E di</button>
              <button onClick={() => handleAnswer(false)}>Nuk e di</button>
            </div>
          ) : (
            <div className="answer-container">
              <div className="answer">{quizQuestions[currentQuestion].answer}</div>
              <button onClick={nextQuestion}>Pyetja tjetër</button>
            </div>
          )}
        </>
      ) : (
        <div className="quiz-completion">
          <h2>Rezultati: {score} / {quizQuestions.length}</h2>
          <button onClick={() => window.location.reload()}>Filloni përsëri</button>
        </div>
      )}
    </div>
  );
};

export default QuizMode;