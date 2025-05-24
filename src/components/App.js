import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FlashcardDeck from './FlashcardDeck';
import QuizMode from './QuizMode';
import DrawingCanvas from './DrawingCanvas';
import ConceptMap from './ConceptMap';
import MatchupGame from './MatchupGame';

const App = () => {
  const [activeTab, setActiveTab] = useState('flashcards');

  return (
    <div className="app">
      <Header />
      <main>
        <div className="tabs">
          <button 
            className={activeTab === 'flashcards' ? 'active' : ''} 
            onClick={() => setActiveTab('flashcards')}
          >
            Fletushkat
          </button>
          <button 
            className={activeTab === 'quiz' ? 'active' : ''} 
            onClick={() => setActiveTab('quiz')}
          >
            Kuizi
          </button>
          <button 
            className={activeTab === 'draw' ? 'active' : ''} 
            onClick={() => setActiveTab('draw')}
          >
            Vizato
          </button>
          <button 
            className={activeTab === 'concepts' ? 'active' : ''} 
            onClick={() => setActiveTab('concepts')}
          >
            Harta e Koncepteve
          </button>
          <button 
            className={activeTab === 'game' ? 'active' : ''} 
            onClick={() => setActiveTab('game')}
          >
            Loja
          </button>
        </div>
        
        {activeTab === 'flashcards' && <FlashcardDeck />}
        {activeTab === 'quiz' && <QuizMode />}
        {activeTab === 'draw' && <DrawingCanvas />}
        {activeTab === 'concepts' && <ConceptMap />}
        {activeTab === 'game' && <MatchupGame />}
      </main>
      <Footer />
    </div>
  );
};

export default App;