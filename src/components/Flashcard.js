import React, { useState } from 'react';

const Flashcard = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flashcard" onClick={handleFlip}>
            {isFlipped ? (
                <div className="flashcard-answer">{answer}</div>
            ) : (
                <div className="flashcard-question">{question}</div>
            )}
        </div>
    );
};

export default Flashcard;