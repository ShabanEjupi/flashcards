import React, { useState } from 'react';

const FlashcardDeck = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Sample flashcards data - replace with your actual content
  const flashcards = [
    { 
      question: "What is Network Security?", 
      answer: "Network security consists of policies, processes, and practices adopted to prevent, detect, and monitor unauthorized access, misuse, modification, or denial of computer network and network-accessible resources." 
    },
    { 
      question: "What is a firewall?", 
      answer: "A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on an organization's previously established security policies." 
    },
    { 
      question: "What is encryption?", 
      answer: "Encryption is the process of converting information or data into a code to prevent unauthorized access." 
    }
  ];
  
  const handleNextCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => 
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrevCard = () => {
    setShowAnswer(false);
    setCurrentCardIndex((prevIndex) => 
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };
  
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };
  
  const currentCard = flashcards[currentCardIndex];
  
  return (
    <div className="flashcard-deck">
      <div className="flashcard" onClick={toggleAnswer}>
        <div className={showAnswer ? "flashcard-answer" : "flashcard-question"}>
          {showAnswer ? currentCard.answer : currentCard.question}
        </div>
      </div>
      
      <div className="navigation">
        <button onClick={handlePrevCard}>Previous</button>
        <button onClick={toggleAnswer}>
          {showAnswer ? "Show Question" : "Show Answer"}
        </button>
        <button onClick={handleNextCard}>Next</button>
      </div>
      
      <div className="card-counter">
        Card {currentCardIndex + 1} of {flashcards.length}
      </div>
    </div>
  );
};

export default FlashcardDeck;