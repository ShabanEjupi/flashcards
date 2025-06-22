import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import FileConverter from './FileConverter';
import ImageEditor from './ImageEditor';

const App = () => {
  const [activeTab, setActiveTab] = useState('fileconverter');
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
      <Header />      <main>
        <div className="tabs">
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
        </div>        
        {activeTab === 'fileconverter' && <FileConverter />}
        {activeTab === 'imageeditor' && <ImageEditor />}
      </main>
      <Footer />
    </div>
  );
};

export default App;