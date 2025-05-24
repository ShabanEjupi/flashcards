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
                <button onClick={handlePrevious} disabled={currentIndex === 0}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default FlashcardDeck;