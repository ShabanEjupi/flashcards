import React, { useRef, useEffect, useState } from 'react';

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
    { id: 1, name: 'Diagramë 4P', description: 'Shëno 4 elementet e Marketing Mix' },
    { id: 2, name: 'Matrica Ansoff', description: 'Vizato matricën me 4 kuadratat' },
    { id: 3, name: 'Segmentimi', description: 'Skico grupin tuaj të targetuar' },
    { id: 4, name: 'Marketing Holistik', description: 'Vizato komponentët e marketingut holistik' }
  ]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    
    // Check localStorage for saved images
    const saved = localStorage.getItem('savedDrawings');
    if (saved) {
      setSavedImages(JSON.parse(saved));
    }
  }, []);
  
  const loadTemplate = (template) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    clearCanvas();
    
    context.font = '16px Arial';
    context.fillStyle = '#888';
    
    if (template.id === 1) {
      // 4Ps Template
      context.strokeRect(50, 50, 500, 300);
      context.beginPath();
      context.moveTo(300, 50);
      context.lineTo(300, 350);
      context.moveTo(50, 200);
      context.lineTo(550, 200);
      context.stroke();
      
      context.fillText('Produkti', 150, 125);
      context.fillText('Çmimi', 425, 125);
      context.fillText('Vendi/Distribuimi', 150, 275);
      context.fillText('Promocioni', 425, 275);
    } else if (template.id === 2) {
      // Ansoff Matrix
      context.strokeRect(100, 50, 400, 300);
      context.beginPath();
      context.moveTo(300, 50);
      context.lineTo(300, 350);
      context.moveTo(100, 200);
      context.lineTo(500, 200);
      context.stroke();
      
      context.fillText('Pushtimi i Tregut', 150, 125);
      context.fillText('Zhvillimi i Tregut', 350, 125);
      context.fillText('Zhvillimi i Produktit', 150, 275);
      context.fillText('Diversifikimi', 350, 275);
      
      context.fillText('Produkte Ekzistuese', 120, 50);
      context.fillText('Produkte të Reja', 120, 350);
      context.fillText('Tregje Ekzistuese', 50, 180);
      context.fillText('Tregje të Reja', 50, 220);
    } else if (template.id === 3) {
      // Segmentation
      context.beginPath();
      context.arc(300, 200, 150, 0, 2 * Math.PI);
      context.stroke();
      
      // Draw segments
      context.beginPath();
      context.moveTo(300, 200);
      context.lineTo(450, 200);
      context.moveTo(300, 200);
      context.lineTo(300, 50);
      context.moveTo(300, 200);
      context.lineTo(150, 200);
      context.moveTo(300, 200);
      context.lineTo(300, 350);
      context.stroke();
      
      context.fillText('Gjeografike', 370, 150);
      context.fillText('Demografike', 230, 150);
      context.fillText('Psikografike', 230, 250);
      context.fillText('Bihevioristike', 370, 250);
    } else if (template.id === 4) {
      // Holistic Marketing
      context.beginPath();
      context.arc(300, 200, 100, 0, 2 * Math.PI);
      context.stroke();
      
      context.fillText('Marketingu Holistik', 250, 200);
      
      // Draw connections
      context.beginPath();
      context.moveTo(300, 100);
      context.lineTo(300, 50);
      context.moveTo(400, 200);
      context.lineTo(450, 200);
      context.moveTo(300, 300);
      context.lineTo(300, 350);
      context.moveTo(200, 200);
      context.lineTo(150, 200);
      context.stroke();
      
      context.fillText('Marketingu i Marrëdhënieve', 230, 40);
      context.fillText('Marketingu i Integruar', 460, 200);
      context.fillText('Marketingu i Brendshëm', 40, 200);
      context.fillText('Marketingu Përgjegjës Social', 230, 360);
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
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const title = prompt('Emërto vizatimin:', `Vizatimi ${savedImages.length + 1}`);
    
    if (title) {
      const newImage = { title, dataURL, date: new Date().toLocaleString() };
      const updatedImages = [...savedImages, newImage];
      setSavedImages(updatedImages);
      localStorage.setItem('savedDrawings', JSON.stringify(updatedImages));
      alert('Vizatimi u ruajt me sukses!');
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
    a.download = 'vizatimi-im.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="drawing-container">
      <div className="drawing-header">
        <h3>Vizato Konceptet e Marketingut</h3>
        <p>Përdor templatet për të vizatuar koncepte të ndryshme ose krijo diçka tënden.</p>
      </div>
      
      <div className="template-section">
        <h4>Zgjidhni një template:</h4>
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
          <label>Ngjyra:</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        
        <div className="tool-group">
          <label>Trashësia:</label>
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
            Lapsi
          </button>
          <button 
            className={`mode-button ${mode === 'text' ? 'active' : ''}`}
            onClick={() => setMode('text')}
          >
            Teksti
          </button>
        </div>
        
        <button onClick={clearCanvas}>Pastro</button>
        <button onClick={saveDrawing}>Ruaj</button>
        <button onClick={downloadDrawing}>Shkarko</button>
      </div>
      
      {mode === 'text' && (
        <div className="text-input">
          <input 
            type="text" 
            placeholder="Shkruaj shënimin..." 
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNote()}
          />
          <button onClick={addNote}>Shto</button>
          <p className="text-help">Kliko në canvas për të vendosur tekstin, pastaj shkruaje tekstin.</p>
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
          <h4>Vizatimet e Ruajtura:</h4>
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
        <h4>Këshilla për Vizatime Efektive:</h4>
        <ul>
          <li>Përdor ngjyra të ndryshme për të dalluar kategoritë.</li>
          <li>Shto tekst për të shpjeguar konceptet.</li>
          <li>Ruaj vizatimet tuaja për t'i përdorur më vonë.</li>
          <li>Shkarko vizatimet për t'i përdorur në prezantime.</li>
        </ul>
      </div>
    </div>
  );
};

export default DrawingCanvas;