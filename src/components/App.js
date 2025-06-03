import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import FlashcardDeck from './FlashcardDeck';
import DrawingCanvas from './DrawingCanvas';
import IoTSecuritySimulator from './IoTSecuritySimulator';
import NetworkSecurityScanner from './NetworkSecurityScanner';
import FileConverter from './FileConverter';
import ImageEditor from './ImageEditor';
import MathModule from './MathModule';
// Importoni komponentin e ri
import MatrixExercises from './MatrixExercises';
import MatrixExercisesMobile from './MatrixExercisesMobile';

const App = () => {
  const [activeTab, setActiveTab] = useState('flashcards');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Shtoni një efekt për të detektuar ndryshimin e madhësisë së dritares
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          {/* Shtoni butonin e ri në navigimin me tabs */}
          <button 
            className={activeTab === 'matrixexercises' ? 'active' : ''} 
            onClick={() => setActiveTab('matrixexercises')}
          >
            Detyra Matricash
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
        {/* Shtoni seksionin për të shfaqur përmbajtjen */}
        {activeTab === 'matrixexercises' && (
          isMobile ? <MatrixExercisesMobile /> : <MatrixExercises />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;