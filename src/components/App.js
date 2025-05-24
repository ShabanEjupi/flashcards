import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FlashcardDeck from './FlashcardDeck';
import questions from '../data/questions';

const App = () => {
    return (
        <div className="app">
            <Header />
            <main>
                <FlashcardDeck questions={questions} />
            </main>
            <Footer />
        </div>
    );
};

export default App;