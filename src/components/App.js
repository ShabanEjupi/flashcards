import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import FlashcardDeck from './FlashcardDeck';
import DrawingCanvas from './DrawingCanvas';
import IoTSecuritySimulator from './IoTSecuritySimulator';
import NetworkSecurityScanner from './NetworkSecurityScanner';
import FileConverter from './FileConverter';
import ImageEditor from './ImageEditor';
import MathModule from './MathModule';

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
          <button 
            className={activeTab === 'fileconverter' ? 'active' : ''} 
            onClick={() => setActiveTab('fileconverter')}
          >
            File Converter
          </button>
          <button 
            className={activeTab === 'imageeditor' ? 'active' : ''} 
            onClick={() => setActiveTab('imageeditor')}
          >
            Image Editor
          </button>
          <button 
            className={activeTab === 'mathmodule' ? 'active' : ''} 
            onClick={() => setActiveTab('mathmodule')}
          >
            Math Module
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
        {activeTab === 'fileconverter' && <FileConverter />}
        {activeTab === 'imageeditor' && <ImageEditor />}
        {activeTab === 'mathmodule' && <MathModule />}
      </main>
      <Footer />
    </div>
  );
};

export default App;