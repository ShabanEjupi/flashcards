import React, { useState } from 'react';
import Flashcard from './Flashcard';
import questions from '../data/questions';

const FlashcardDeck = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
    };

    return (
        <div className="flashcard-deck">
            <Flashcard 
                question={questions[currentIndex].question} 
                answer={questions[currentIndex].answer} 
            />
            <div className="navigation">
                <button onClick={handlePrevious}>
                    Previous
                </button>
                <button onClick={handleNext}>
                    Next
                </button>
            </div>
            <div className="counter">
                Card {currentIndex + 1} of {questions.length}
            </div>
        </div>
    );
};

export default FlashcardDeck;