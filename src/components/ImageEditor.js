import React, { useState, useRef, useEffect } from 'react';
import { logger } from '../utils/logger';

const ImageEditor = () => {
  const [image, setImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [currentTool, setCurrentTool] = useState('basic');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Basic adjustments
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [hue, setHue] = useState(0);
  const [exposure, setExposure] = useState(0);
  const [highlights, setHighlights] = useState(0);
  const [shadows, setShadows] = useState(0);
  const [vibrance, setVibrance] = useState(0);
  const [warmth, setWarmth] = useState(0);
  const [tint, setTint] = useState(0);
  
  // Filters
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [filterIntensity, setFilterIntensity] = useState(100);
  
  // Effects
  const [blur, setBlur] = useState(0);
  const [sharpen, setSharpen] = useState(0);
  const [noise, setNoise] = useState(0);
  const [vignette, setVignette] = useState(0);
  
  // Drawing/Annotation
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#ff0000');
  const [brushOpacity, setBrushOpacity] = useState(100);
  
  // Text
  const [textElements, setTextElements] = useState([]);
  const [selectedText, setSelectedText] = useState(null);
  const [newText, setNewText] = useState('');
  const [textStyle, setTextStyle] = useState({
    fontSize: 24,
    fontFamily: 'Arial',
    color: '#000000',
    bold: false,
    italic: false,
    shadow: false
  });
  
  // Crop
  const [cropMode, setCropMode] = useState(false);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  
  // Stickers/Elements
  const [stickers, setStickers] = useState([]);
  
  // History
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const canvasRef = useRef(null);
  const originalCanvasRef = useRef(null);
  const imageRef = useRef(null);
  
  // Predefined filters like PicsArt
  const filters = {
    none: { name: 'Original', css: '' },
    vintage: { name: 'Vintage', css: 'sepia(0.5) contrast(1.2) brightness(1.1)' },
    bw: { name: 'Black & White', css: 'grayscale(1)' },
    dramatic: { name: 'Dramatic', css: 'contrast(1.5) brightness(0.9) saturate(1.2)' },
    warm: { name: 'Warm', css: 'sepia(0.3) brightness(1.1) saturate(1.3)' },
    cool: { name: 'Cool', css: 'hue-rotate(180deg) saturate(1.2)' },
    fade: { name: 'Fade', css: 'brightness(1.2) contrast(0.8) saturate(0.8)' },
    cinema: { name: 'Cinema', css: 'contrast(1.3) brightness(0.9) sepia(0.2)' },
    retro: { name: 'Retro', css: 'sepia(0.4) saturate(1.4) contrast(1.1)' },
    sunset: { name: 'Sunset', css: 'sepia(0.6) hue-rotate(20deg) saturate(1.3)' },
    arctic: { name: 'Arctic', css: 'hue-rotate(200deg) brightness(1.1) contrast(1.2)' },
    lomo: { name: 'Lomo', css: 'contrast(1.5) brightness(0.8) saturate(1.4)' }
  };
  
  // Load image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        setImage(event.target.result);
        resetAllSettings();
        drawImageToCanvas(img);
        addToHistory();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };
  
  const resetAllSettings = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setHue(0);
    setExposure(0);
    setHighlights(0);
    setShadows(0);
    setVibrance(0);
    setWarmth(0);
    setTint(0);
    setSelectedFilter('none');
    setFilterIntensity(100);
    setBlur(0);
    setSharpen(0);
    setNoise(0);
    setVignette(0);
    setTextElements([]);
    setStickers([]);
  };
  
  const drawImageToCanvas = (img = imageRef.current) => {
    if (!img || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Calculate canvas size while maintaining aspect ratio
    const maxWidth = 800;
    const maxHeight = 600;
    let { width, height } = img;
    
    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width *= ratio;
      height *= ratio;
    }
    
    canvas.width = width;
    canvas.height = height;
    
    // Apply all effects
    ctx.filter = buildCSSFilter();
    ctx.drawImage(img, 0, 0, width, height);
    ctx.filter = 'none';
    
    // Apply canvas-based effects
    applyCanvasEffects(ctx, width, height);
    
    // Draw text elements
    drawTextElements(ctx);
    
    // Draw stickers
    drawStickers(ctx);
    
    setEditedImage(canvas.toDataURL('image/jpeg', 0.9));
  };
  
  const buildCSSFilter = () => {
    let filter = '';
    
    // Basic adjustments
    if (brightness !== 100) filter += `brightness(${brightness / 100}) `;
    if (contrast !== 100) filter += `contrast(${contrast / 100}) `;
    if (saturation !== 100) filter += `saturate(${saturation / 100}) `;
    if (hue !== 0) filter += `hue-rotate(${hue}deg) `;
    if (blur > 0) filter += `blur(${blur}px) `;
    
    // Apply preset filter
    if (selectedFilter !== 'none') {
      const intensity = filterIntensity / 100;
      const filterCSS = filters[selectedFilter].css;
      if (intensity < 1) {
        // Blend with original
        filter += filterCSS.replace(/\(([\d.]+)\)/g, (match, value) => {
          const numValue = parseFloat(value);
          const blended = 1 + (numValue - 1) * intensity;
          return `(${blended})`;
        });
      } else {
        filter += filterCSS + ' ';
      }
    }
    
    return filter.trim();
  };
  
  const applyCanvasEffects = (ctx, width, height) => {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    // Apply exposure, highlights, shadows, vibrance, warmth, tint
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      
      // Exposure
      if (exposure !== 0) {
        const exposureFactor = Math.pow(2, exposure / 100);
        r = Math.min(255, r * exposureFactor);
        g = Math.min(255, g * exposureFactor);
        b = Math.min(255, b * exposureFactor);
      }
      
      // Highlights and Shadows
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      if (highlights !== 0) {
        const highlightFactor = highlights / 100;
        if (luminance > 128) {
          const factor = 1 - highlightFactor * (luminance - 128) / 127;
          r *= factor;
          g *= factor;
          b *= factor;
        }
      }
      
      if (shadows !== 0) {
        const shadowFactor = shadows / 100;
        if (luminance < 128) {
          const factor = 1 + shadowFactor * (128 - luminance) / 128;
          r = Math.min(255, r * factor);
          g = Math.min(255, g * factor);
          b = Math.min(255, b * factor);
        }
      }
      
      // Warmth and Tint
      if (warmth !== 0) {
        const warmthFactor = warmth / 100;
        r = Math.min(255, r + warmthFactor * 20);
        b = Math.max(0, b - warmthFactor * 20);
      }
      
      if (tint !== 0) {
        const tintFactor = tint / 100;
        g = Math.min(255, Math.max(0, g + tintFactor * 20));
        r = Math.max(0, r - Math.abs(tintFactor) * 10);
      }
      
      // Vibrance (selective saturation)
      if (vibrance !== 0) {
        const vibranceFactor = vibrance / 100;
        const max = Math.max(r, g, b);
        const avg = (r + g + b) / 3;
        const amt = ((Math.abs(max - avg) * 2 / 255) * vibranceFactor) / 3;
        
        if (r !== max) r += (max - r) * amt;
        if (g !== max) g += (max - g) * amt;
        if (b !== max) b += (max - b) * amt;
      }
      
      data[i] = Math.min(255, Math.max(0, r));
      data[i + 1] = Math.min(255, Math.max(0, g));
      data[i + 2] = Math.min(255, Math.max(0, b));
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    // Apply vignette
    if (vignette > 0) {
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);
      
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, maxRadius
      );
      
      gradient.addColorStop(0, `rgba(0,0,0,0)`);
      gradient.addColorStop(1, `rgba(0,0,0,${vignette / 100 * 0.8})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
  };
  
  const drawTextElements = (ctx) => {
    textElements.forEach(text => {
      ctx.save();
      ctx.font = `${text.style.bold ? 'bold ' : ''}${text.style.italic ? 'italic ' : ''}${text.style.fontSize}px ${text.style.fontFamily}`;
      ctx.fillStyle = text.style.color;
      ctx.globalAlpha = text.opacity || 1;
      
      if (text.style.shadow) {
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
      }
      
      ctx.fillText(text.content, text.x, text.y);
      ctx.restore();
    });
  };
  
  const drawStickers = (ctx) => {
    stickers.forEach(sticker => {
      if (sticker.image) {
        ctx.save();
        ctx.globalAlpha = sticker.opacity || 1;
        ctx.drawImage(sticker.image, sticker.x, sticker.y, sticker.width, sticker.height);
        ctx.restore();
      }
    });
  };
  
  const addTextElement = () => {
    if (!newText.trim()) return;
    
    const textElement = {
      id: Date.now(),
      content: newText,
      x: 50,
      y: 100,
      style: { ...textStyle },
      opacity: 1
    };
    
    setTextElements([...textElements, textElement]);
    setNewText('');
    drawImageToCanvas();
  };
  
  const addToHistory = () => {
    if (!canvasRef.current) return;
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(canvasRef.current.toDataURL());
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      loadFromHistory(historyIndex - 1);
    }
  };
  
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      loadFromHistory(historyIndex + 1);
    }
  };
  
  const loadFromHistory = (index) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setEditedImage(canvas.toDataURL());
    };
    img.src = history[index];
  };
  
  const downloadImage = () => {
    if (!editedImage) return;
    
    const link = document.createElement('a');
    link.download = 'edited-image.jpg';
    link.href = editedImage;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Re-render when any setting changes
  useEffect(() => {
    if (imageRef.current) {
      drawImageToCanvas();
    }
  }, [brightness, contrast, saturation, hue, exposure, highlights, shadows, vibrance, warmth, tint, selectedFilter, filterIntensity, blur, sharpen, noise, vignette]);
  
  const stickerEmojis = ['😀', '😍', '🔥', '💯', '✨', '🌟', '❤️', '👍', '🎉', '🌈'];
  
  const addSticker = (emoji) => {
    const sticker = {
      id: Date.now(),
      content: emoji,
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      opacity: 1,
      type: 'emoji'
    };
    
    setStickers([...stickers, sticker]);
    drawImageToCanvas();
  };
  
  return (
    <div className="image-editor-container">
      <div className="editor-header">
        <h2>🎨 PicsArt-style Image Editor</h2>
        <div className="header-actions">
          <button onClick={undo} disabled={historyIndex <= 0}>↶ Undo</button>
          <button onClick={redo} disabled={historyIndex >= history.length - 1}>↷ Redo</button>
          <button onClick={downloadImage} disabled={!editedImage} className="download-btn">
            📥 Download
          </button>
        </div>
      </div>
      
      <div className="editor-workspace">
        <div className="tool-sidebar">
          <div className="tool-tabs">
            <button 
              className={currentTool === 'basic' ? 'active' : ''} 
              onClick={() => setCurrentTool('basic')}
            >
              🔧 Basic
            </button>
            <button 
              className={currentTool === 'filters' ? 'active' : ''} 
              onClick={() => setCurrentTool('filters')}
            >
              🎭 Filters
            </button>
            <button 
              className={currentTool === 'effects' ? 'active' : ''} 
              onClick={() => setCurrentTool('effects')}
            >
              ✨ Effects
            </button>
            <button 
              className={currentTool === 'text' ? 'active' : ''} 
              onClick={() => setCurrentTool('text')}
            >
              📝 Text
            </button>
            <button 
              className={currentTool === 'stickers' ? 'active' : ''} 
              onClick={() => setCurrentTool('stickers')}
            >
              😀 Stickers
            </button>
          </div>
          
          <div className="tool-content">
            {currentTool === 'basic' && (
              <div className="basic-tools">
                <h3>Basic Adjustments</h3>
                
                <div className="slider-group">
                  <label>Brightness: {brightness}%</label>
                  <input type="range" min="0" max="200" value={brightness} 
                         onChange={(e) => setBrightness(Number(e.target.value))} />
                </div>
                
                <div className="slider-group">
                  <label>Contrast: {contrast}%</label>
                  <input type="range" min="0" max="200" value={contrast} 
                         onChange={(e) => setContrast(Number(e.target.value))} />
                </div>
                
                <div className="slider-group">
                  <label>Saturation: {saturation}%</label>
                  <input type="range" min="0" max="200" value={saturation} 
                         onChange={(e) => setSaturation(Number(e.target.value))} />
                </div>
                
                <div className="slider-group">
                  <label>Hue: {hue}°</label>
                  <input type="range" min="-180" max="180" value={hue} 
                         onChange={(e) => setHue(Number(e.target.value))} />
                </div>
                
                <div className="slider-group">
                  <label>Exposure: {exposure}</label>
                  <input type="range" min="-100" max="100" value={exposure} 
                         onChange={(e) => setExposure(Number(e.target.value))} />
                </div>
                
                <div className="slider-group">
                  <label>Highlights: {highlights}</label>
                  <input type="range" min="-100" max="100" value={highlights} 
                         onChange={(e) => setHighlights(Number(e.target.value))} />
                </div>
                
                <div className="slider-group">
                  <label>Shadows: {shadows}</label>
                  <input type="range" min="-100" max="100" value={shadows} 
                         onChange={(e) => setShadows(Number(e.target.value))} />
                </div>
                
                <div className="slider-group">
                  <label>Vibrance: {vibrance}</label>
                  <input type="range" min="-100" max="100" value={vibrance} 
                         onChange={(e) => setVibrance(Number(e.target.value))} />
                </div>
                
                <div className="slider-group">
                  <label>Warmth: {warmth}</label>
                  <input type="range" min="-100" max="100" value={warmth} 
                         onChange={(e) => setWarmth(Number(e.target.value))} />
                </div>
                
                <div className="slider-group">
                  <label>Tint: {tint}</label>
                  <input type="range" min="-100" max="100" value={tint} 
                         onChange={(e) => setTint(Number(e.target.value))} />
                </div>
              </div>
            )}
            
            {currentTool === 'filters' && (
              <div className="filters-tools">
                <h3>Filters</h3>
                <div className="filter-grid">
                  {Object.entries(filters).map(([key, filter]) => (
                    <div 
                      key={key} 
                      className={`filter-option ${selectedFilter === key ? 'active' : ''}`}
                      onClick={() => setSelectedFilter(key)}
                    >
                      <div className="filter-preview" style={{ filter: filter.css }}>
                        <div className="preview-square"></div>
                      </div>
                      <span>{filter.name}</span>
                    </div>
                  ))}
                </div>
                
                {selectedFilter !== 'none' && (
                  <div className="slider-group">
                    <label>Filter Intensity: {filterIntensity}%</label>
                    <input type="range" min="0" max="100" value={filterIntensity} 
                           onChange={(e) => setFilterIntensity(Number(e.target.value))} />
                  </div>
                )}
              </div>
            )}
            
            {currentTool === 'effects' && (
              <div className="effects-tools">
                <h3>Effects</h3>
                
                <div className="slider-group">
                  <label>Blur: {blur}px</label>
                  <input type="range" min="0" max="20" value={blur} 
                         onChange={(e) => setBlur(Number(e.target.value))} />
                </div>
                
                <div className="slider-group">
                  <label>Vignette: {vignette}%</label>
                  <input type="range" min="0" max="100" value={vignette} 
                         onChange={(e) => setVignette(Number(e.target.value))} />
                </div>
              </div>
            )}
            
            {currentTool === 'text' && (
              <div className="text-tools">
                <h3>Add Text</h3>
                
                <div className="text-input-group">
                  <input 
                    type="text" 
                    placeholder="Enter text..." 
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                  />
                  <button onClick={addTextElement} disabled={!newText.trim()}>
                    Add Text
                  </button>
                </div>
                
                <div className="text-style-controls">
                  <div className="slider-group">
                    <label>Font Size: {textStyle.fontSize}px</label>
                    <input type="range" min="12" max="72" value={textStyle.fontSize} 
                           onChange={(e) => setTextStyle({...textStyle, fontSize: Number(e.target.value)})} />
                  </div>
                  
                  <div className="color-group">
                    <label>Color:</label>
                    <input type="color" value={textStyle.color} 
                           onChange={(e) => setTextStyle({...textStyle, color: e.target.value})} />
                  </div>
                  
                  <div className="font-controls">
                    <select value={textStyle.fontFamily} 
                            onChange={(e) => setTextStyle({...textStyle, fontFamily: e.target.value})}>
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Verdana">Verdana</option>
                    </select>
                  </div>
                  
                  <div className="style-buttons">
                    <button 
                      className={textStyle.bold ? 'active' : ''} 
                      onClick={() => setTextStyle({...textStyle, bold: !textStyle.bold})}
                    >
                      <strong>B</strong>
                    </button>
                    <button 
                      className={textStyle.italic ? 'active' : ''} 
                      onClick={() => setTextStyle({...textStyle, italic: !textStyle.italic})}
                    >
                      <em>I</em>
                    </button>
                    <button 
                      className={textStyle.shadow ? 'active' : ''} 
                      onClick={() => setTextStyle({...textStyle, shadow: !textStyle.shadow})}
                    >
                      Shadow
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {currentTool === 'stickers' && (
              <div className="stickers-tools">
                <h3>Stickers</h3>
                <div className="sticker-grid">
                  {stickerEmojis.map(emoji => (
                    <button 
                      key={emoji} 
                      className="sticker-btn" 
                      onClick={() => addSticker(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="canvas-area">
          {!image ? (
            <div className="upload-area">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                id="image-upload"
                style={{ display: 'none' }}
              />
              <label htmlFor="image-upload" className="upload-btn">
                📸 Upload Image
              </label>
              <p>Select an image to start editing</p>
            </div>
          ) : (
            <div className="canvas-container">
              <canvas ref={canvasRef} className="main-canvas" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;