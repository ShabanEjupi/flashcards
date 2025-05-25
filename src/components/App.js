import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FlashcardDeck from './FlashcardDeck';
import QuizMode from './QuizMode';
import DrawingCanvas from './DrawingCanvas';
import ConceptMap from './ConceptMap';
import MatchupGame from './MatchupGame';
import TablePracticeMode from './TablePracticeMode';
import IoTSecuritySimulator from './IoTSecuritySimulator';
import NetworkSecurityScanner from './NetworkSecurityScanner';

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
            Fletushkat & Vizatimi
          </button>
          <button 
            className={activeTab === 'quiz' ? 'active' : ''} 
            onClick={() => setActiveTab('quiz')}
          >
            Kuizi
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
          <button 
            className={activeTab === 'tables' ? 'active' : ''} 
            onClick={() => setActiveTab('tables')}
          >
            Tabelat Praktike
          </button>
          <button 
            className={activeTab === 'iotsecurity' ? 'active' : ''} 
            onClick={() => setActiveTab('iotsecurity')}
          >
            IoT Security
          </button>
          <button 
            className={activeTab === 'networkscan' ? 'active' : ''} 
            onClick={() => setActiveTab('networkscan')}
          >
            Network Scanner
          </button>
        </div>
        
        {activeTab === 'flashcards' && (
          <div className="flashcards-drawing-container">
            <div className="flashcards-section">
              <h2>Fletushkat</h2>
              <FlashcardDeck />
            </div>
            <div className="drawing-section">
              <DrawingCanvas />
            </div>
          </div>
        )}
        {activeTab === 'quiz' && <QuizMode />}
        {activeTab === 'concepts' && <ConceptMap />}
        {activeTab === 'game' && <MatchupGame />}
        {activeTab === 'tables' && <TablePracticeMode />}
        {activeTab === 'iotsecurity' && <IoTSecuritySimulator />}
        {activeTab === 'networkscan' && <NetworkSecurityScanner />}
      </main>
      <Footer />
    </div>
  );
};

export default App;