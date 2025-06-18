import React, { useState, useRef, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const LiveEditor = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [textContent, setTextContent] = useState('');
  const [mathContent, setMathContent] = useState('');
  const [drawingColor, setDrawingColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [savedNotes, setSavedNotes] = useState([]);
  
  // Load saved content from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('liveEditorContent');
    if (saved) {
      const parsed = JSON.parse(saved);
      setTextContent(parsed.text || '');
      setMathContent(parsed.math || '');
      setSavedNotes(parsed.notes || []);
    }
  }, []);

  // Save content to localStorage
  const saveContent = () => {
    const content = {
      text: textContent,
      math: mathContent,
      notes: savedNotes,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('liveEditorContent', JSON.stringify(content));
    alert('Content saved successfully!');
  };

  // Drawing functions
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const context = canvas.getContext('2d');
    context.strokeStyle = drawingColor;
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
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
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const title = prompt('Name your drawing:', `Drawing ${savedNotes.length + 1}`);
    
    if (title) {
      const newNote = {
        id: Date.now(),
        title,
        type: 'drawing',
        content: dataURL,
        timestamp: new Date().toLocaleString()
      };
      setSavedNotes([...savedNotes, newNote]);
    }
  };

  const addTextNote = () => {
    if (!textContent.trim()) return;
    
    const newNote = {
      id: Date.now(),
      title: `Note ${savedNotes.length + 1}`,
      type: 'text',
      content: textContent,
      timestamp: new Date().toLocaleString()
    };
    setSavedNotes([...savedNotes, newNote]);
    setTextContent('');
  };

  const deleteNote = (id) => {
    setSavedNotes(savedNotes.filter(note => note.id !== id));
  };

  return (
    <div className="live-editor-container">
      <div className="editor-header">
        <h2>🚀 Live Editor & Notebook</h2>
        <p>Write, draw, and take notes while learning!</p>
        <button onClick={saveContent} className="save-btn">💾 Save All</button>
      </div>

      <div className="editor-tabs">
        <button 
          className={activeTab === 'text' ? 'active' : ''} 
          onClick={() => setActiveTab('text')}
        >
          📝 Text Editor
        </button>
        <button 
          className={activeTab === 'math' ? 'active' : ''} 
          onClick={() => setActiveTab('math')}
        >
          🧮 Math Editor
        </button>
        <button 
          className={activeTab === 'drawing' ? 'active' : ''} 
          onClick={() => setActiveTab('drawing')}
        >
          🎨 Drawing Canvas
        </button>
        <button 
          className={activeTab === 'notes' ? 'active' : ''} 
          onClick={() => setActiveTab('notes')}
        >
          📚 My Notes
        </button>
      </div>

      {activeTab === 'text' && (
        <div className="text-editor-section">
          <div className="editor-controls">
            <h3>Text Editor</h3>
            <button onClick={addTextNote} disabled={!textContent.trim()}>
              Add to Notes
            </button>
          </div>
          
          <textarea
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Write your notes here... You can write about machine learning concepts, solutions to problems, or any other thoughts."
            className="text-editor"
            rows={15}
          />
          
          <div className="text-preview">
            <h4>Preview:</h4>
            <div className="preview-content">
              {textContent.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'math' && (
        <div className="math-editor-section">
          <div className="editor-controls">
            <h3>Math Editor (LaTeX)</h3>
            <div className="math-examples">
              <p>Examples:</p>
              <code>\frac{1}{2}</code> • <code>x^2</code> • <code>\sum_{i=1}^n</code> • <code>\alpha \beta \gamma</code>
            </div>
          </div>
          
          <textarea
            value={mathContent}
            onChange={(e) => setMathContent(e.target.value)}
            placeholder="Enter LaTeX math expressions here...
Example: \frac{d}{dx}f(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}"
            className="math-editor"
            rows={8}
          />
          
          <div className="math-preview">
            <h4>Rendered Math:</h4>
            <div className="math-display">
              {mathContent && (
                <BlockMath math={mathContent} />
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'drawing' && (
        <div className="drawing-editor-section">
          <div className="drawing-controls">
            <h3>Drawing Canvas</h3>
            <div className="drawing-tools">
              <label>Color:</label>
              <input 
                type="color" 
                value={drawingColor} 
                onChange={(e) => setDrawingColor(e.target.value)} 
              />
              
              <label>Width:</label>
              <input 
                type="range" 
                min="1" 
                max="20" 
                value={lineWidth} 
                onChange={(e) => setLineWidth(e.target.value)} 
              />
              
              <button onClick={clearCanvas}>Clear</button>
              <button onClick={saveDrawing}>Save Drawing</button>
            </div>
          </div>
          
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="drawing-canvas"
            style={{border: '1px solid #ddd', cursor: 'crosshair'}}
          />
          
          <div className="drawing-tips">
            <h4>Drawing Tips:</h4>
            <ul>
              <li>Draw diagrams to visualize machine learning concepts</li>
              <li>Sketch decision trees, neural networks, or data flow</li>
              <li>Use different colors to highlight important parts</li>
              <li>Save your drawings to review later</li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="notes-section">
          <h3>My Saved Notes ({savedNotes.length})</h3>
          
          {savedNotes.length === 0 ? (
            <div className="no-notes">
              <p>No notes saved yet. Start taking notes in other tabs!</p>
            </div>
          ) : (
            <div className="notes-grid">
              {savedNotes.map(note => (
                <div key={note.id} className="note-card">
                  <div className="note-header">
                    <h4>{note.title}</h4>
                    <div className="note-actions">
                      <span className="note-time">{note.timestamp}</span>
                      <button onClick={() => deleteNote(note.id)} className="delete-btn">🗑️</button>
                    </div>
                  </div>
                  
                  <div className="note-content">
                    {note.type === 'text' ? (
                      <div className="text-note">
                        {note.content.split('\n').slice(0, 3).map((line, i) => (
                          <p key={i}>{line}</p>
                        ))}
                        {note.content.split('\n').length > 3 && <p>...</p>}
                      </div>
                    ) : (
                      <div className="drawing-note">
                        <img src={note.content} alt={note.title} className="note-drawing" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveEditor;