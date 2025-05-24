import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FlashcardDeck from './FlashcardDeck';

const App = () => {
    return (
        <div className="app">
            <Header />
            <main>
                <FlashcardDeck />
            </main>
            <Footer />
        </div>
    );
};

export default App;