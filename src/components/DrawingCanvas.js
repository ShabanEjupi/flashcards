import React, { useRef, useEffect, useState } from 'react';
import { logger } from '../utils/logger';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [mode, setMode] = useState('pen'); // 'pen', 'text'
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [notePosition, setNotePosition] = useState({ x: 0, y: 0 });
  const [savedImages, setSavedImages] = useState([]);
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Network Diagram', description: 'Draw a basic network topology' },
    { id: 2, name: 'Firewall Setup', description: 'Illustrate firewall configuration' },
    { id: 3, name: 'Threat Model', description: 'Map potential security threats' }
  ]);
  
  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.lineWidth = lineWidth;
      context.lineCap = 'round';
      
      // Check localStorage for saved images
      const saved = localStorage.getItem('savedDrawings');
      if (saved) {
        setSavedImages(JSON.parse(saved));
      }
    } catch (error) {
      logger.error('DrawingCanvas initialization failed', { error: error.message });
    }
  }, []);
  
  const loadTemplate = (template) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    clearCanvas();
    
    context.font = '16px Arial';
    context.fillStyle = '#888';
    
    if (template.id === 1) {
      // Network Diagram Template
      // Draw a simple network layout with router, switch, and endpoints
      context.beginPath();
      
      // Router (top center)
      context.rect(250, 50, 100, 50);
      context.fillText("Router", 275, 75);
      
      // Switch (middle)
      context.rect(250, 175, 100, 50);
      context.fillText("Switch", 275, 200);
      
      // Connection line
      context.moveTo(300, 100);
      context.lineTo(300, 175);
      
      // Endpoints (computers, servers)
      // Left endpoint
      context.rect(100, 275, 75, 50);
      context.fillText("PC", 125, 300);
      context.moveTo(175, 300);
      context.lineTo(250, 200);
      
      // Middle endpoint
      context.rect(262, 275, 75, 50);
      context.fillText("Server", 275, 300);
      context.moveTo(300, 275);
      context.lineTo(300, 225);
      
      // Right endpoint
      context.rect(425, 275, 75, 50);
      context.fillText("PC", 450, 300);
      context.moveTo(425, 300);
      context.lineTo(350, 200);
      
      context.stroke();
    } else if (template.id === 2) {
      // Firewall Setup Template
      context.beginPath();
      
      // Internet cloud
      context.ellipse(300, 75, 100, 50, 0, 0, 2 * Math.PI);
      context.fillText("Internet", 275, 75);
      
      // Firewall
      context.rect(250, 150, 100, 50);
      context.fillText("Firewall", 275, 175);
      
      // Internal network
      context.rect(150, 250, 300, 100);
      context.fillText("Protected Network", 240, 300);
      
      // Connections
      context.moveTo(300, 125);
      context.lineTo(300, 150);
      context.moveTo(300, 200);
      context.lineTo(300, 250);
      
      context.stroke();
    } else if (template.id === 3) {
      // Threat Model Template
      context.beginPath();
      
      // Central asset
      context.rect(250, 150, 100, 100);
      context.fillText("Protected", 270, 190);
      context.fillText("Asset", 280, 210);
      
      // Threat vectors (arrows pointing to asset)
      // Top threat
      context.moveTo(300, 100);
      context.lineTo(300, 150);
      context.fillText("Malware", 310, 125);
      
      // Right threat
      context.moveTo(400, 200);
      context.lineTo(350, 200);
      context.fillText("Data Theft", 360, 180);
      
      // Bottom threat
      context.moveTo(300, 300);
      context.lineTo(300, 250);
      context.fillText("Unauthorized", 310, 275);
      context.fillText("Access", 310, 290);
      
      // Left threat
      context.moveTo(200, 200);
      context.lineTo(250, 200);
      context.fillText("DoS Attack", 160, 180);
      
      context.stroke();
    }
  };
  
  const startDrawing = (e) => {
    if (mode === 'text') {
      const rect = canvasRef.current.getBoundingClientRect();
      setNotePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      return;
    }
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };
  
  const draw = (e) => {
    if (!isDrawing || mode === 'text') return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.lineTo(x, y);
    context.stroke();
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setNotes([]);
  };
  
  const addNote = () => {
    if (!currentNote.trim()) return;
    
    const newNote = {
      text: currentNote,
      x: notePosition.x,
      y: notePosition.y,
      color: color
    };
    
    setNotes([...notes, newNote]);
    setCurrentNote('');
    setMode('pen');
    
    // Draw the note on canvas
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.font = '16px Arial';
    context.fillStyle = color;
    context.fillText(currentNote, notePosition.x, notePosition.y);
  };
  
  const saveDrawing = () => {
    try {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL('image/png');
      const title = prompt('Name your drawing:', `Drawing ${savedImages.length + 1}`);
      
      if (title) {
        const newImage = { title, dataURL, date: new Date().toLocaleString() };
        const updatedImages = [...savedImages, newImage];
        setSavedImages(updatedImages);
        localStorage.setItem('savedDrawings', JSON.stringify(updatedImages));
        alert('Drawing saved successfully!');
      }
    } catch (error) {
      logger.error('Failed to save drawing', { error: error.message });
      alert('Could not save drawing. Please try again.');
    }
  };
  
  const loadDrawing = (dataURL) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    const img = new Image();
    img.onload = () => {
      clearCanvas();
      context.drawImage(img, 0, 0);
    };
    img.src = dataURL;
  };
  
  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'network-diagram.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="drawing-container">
      <div className="drawing-header">
        <h3>Draw While You Learn</h3>
        <p>Use drawings to visualize network security concepts.</p>
      </div>
      
      <div className="template-section">
        <h4>Choose a template:</h4>
        <div className="template-buttons">
          {templates.map(template => (
            <button 
              key={template.id} 
              onClick={() => loadTemplate(template)}
              className="template-button"
            >
              {template.name}
              <span className="template-tooltip">{template.description}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="tools">
        <div className="tool-group">
          <label>Color:</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        
        <div className="tool-group">
          <label>Width:</label>
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={lineWidth} 
            onChange={(e) => setLineWidth(parseInt(e.target.value))} 
          />
        </div>
        
        <div className="tool-group">
          <button 
            className={`mode-button ${mode === 'pen' ? 'active' : ''}`}
            onClick={() => setMode('pen')}
          >
            Pen
          </button>
          <button 
            className={`mode-button ${mode === 'text' ? 'active' : ''}`}
            onClick={() => setMode('text')}
          >
            Text
          </button>
        </div>
        
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={saveDrawing}>Save</button>
        <button onClick={downloadDrawing}>Download</button>
      </div>
      
      {mode === 'text' && (
        <div className="text-input">
          <input 
            type="text" 
            placeholder="Type your note..." 
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNote()}
          />
          <button onClick={addNote}>Add</button>
          <p className="text-help">Click on canvas to place text, then type your note.</p>
        </div>
      )}
      
      <canvas 
        ref={canvasRef}
        width={600}
        height={400}
        onClick={mode === 'text' ? startDrawing : null}
        onMouseDown={mode !== 'text' ? startDrawing : null}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="drawing-canvas"
      />
      
      {savedImages.length > 0 && (
        <div className="saved-drawings">
          <h4>Saved Drawings:</h4>
          <div className="saved-thumbnails">
            {savedImages.map((img, index) => (
              <div key={index} className="saved-thumbnail" onClick={() => loadDrawing(img.dataURL)}>
                <img src={img.dataURL} alt={img.title} width="100" />
                <span>{img.title}</span>
                <small>{img.date}</small>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="drawing-tips">
        <h4>Tips for Effective Network Diagrams:</h4>
        <ul>
          <li>Use different colors to distinguish between network zones.</li>
          <li>Add text labels to identify components.</li>
          <li>Save your drawings for later reference.</li>
          <li>Download diagrams for use in documentation.</li>
        </ul>
      </div>
    </div>
  );
};

export default DrawingCanvas;