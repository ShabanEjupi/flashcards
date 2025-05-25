import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FlashcardDeck from './FlashcardDeck';
import DrawingCanvas from './DrawingCanvas';
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
            Flashcards & Drawing
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
              <h2>Flashcards</h2>
              <FlashcardDeck />
            </div>
            <div className="drawing-section">
              <DrawingCanvas />
            </div>
          </div>
        )}
        {activeTab === 'iotsecurity' && <IoTSecuritySimulator />}
        {activeTab === 'networkscan' && <NetworkSecurityScanner />}
      </main>
      <Footer />
    </div>
  );
};

export default App;