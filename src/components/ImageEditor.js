import React, { useState, useRef, useEffect } from 'react';
import { logger } from '../utils/logger';

const ImageEditor = () => {
  const [image, setImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [filters, setFilters] = useState({
    grayscale: false,
    sepia: false,
    invert: false,
    blur: 0
  });
  const [cropMode, setCropMode] = useState(false);
  const [cropCoordinates, setCropCoordinates] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [historyStack, setHistoryStack] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const cropStartRef = useRef({ x: 0, y: 0 });
  const isCroppingRef = useRef(false);
  
  // Load image from file
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        resetSettings();
        applyChanges(img);
        addToHistory(img);
      };
      img.src = event.target.result;
      setImage(event.target.result);
    };
    reader.readAsDataURL(file);
    logger.info('Image loaded', { fileName: file.name });
  };
  
  // Reset all editing settings
  const resetSettings = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setRotation(0);
    setFilters({
      grayscale: false,
      sepia: false,
      invert: false,
      blur: 0
    });
    setCropMode(false);
  };
  
  // Apply current settings to image
  const applyChanges = (sourceImage = null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const img = sourceImage || imageRef.current;
    if (!img) return;
    
    // Calculate size while maintaining aspect ratio
    const maxWidth = 800;
    const maxHeight = 600;
    let width = img.width;
    let height = img.height;
    
    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width *= ratio;
      height *= ratio;
    }
    
    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply rotation if needed
    if (rotation !== 0) {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -width / 2, -height / 2, width, height);
      ctx.restore();
    } else {
      ctx.drawImage(img, 0, 0, width, height);
    }
    
    // Apply filters
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Apply brightness/contrast/saturation
    const brightnessValue = brightness / 100;
    const contrastValue = contrast / 100;
    const saturationValue = saturation / 100;
    
    for (let i = 0; i < data.length; i += 4) {
      // RGB values
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      
      // Apply brightness
      r *= brightnessValue;
      g *= brightnessValue;
      b *= brightnessValue;
      
      // Apply contrast
      const factor = (259 * (contrastValue * 255 + 255)) / (255 * (259 - contrastValue * 255));
      r = factor * (r - 128) + 128;
      g = factor * (g - 128) + 128;
      b = factor * (b - 128) + 128;
      
      // Apply saturation
      const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
      r = gray + saturationValue * (r - gray);
      g = gray + saturationValue * (g - gray);
      b = gray + saturationValue * (b - gray);
      
      // Apply grayscale
      if (filters.grayscale) {
        const grayValue = 0.2989 * r + 0.5870 * g + 0.1140 * b;
        r = g = b = grayValue;
      }
      
      // Apply sepia
      if (filters.sepia) {
        const newR = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
        const newG = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
        const newB = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
        r = newR;
        g = newG;
        b = newB;
      }
      
      // Apply invert
      if (filters.invert) {
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
      }
      
      // Clamp values
      data[i] = Math.max(0, Math.min(255, r));
      data[i + 1] = Math.max(0, Math.min(255, g));
      data[i + 2] = Math.max(0, Math.min(255, b));
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    // Apply blur (if any)
    if (filters.blur > 0) {
      ctx.filter = `blur(${filters.blur}px)`;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
    }
    
    // Convert canvas to data URL for preview
    setEditedImage(canvas.toDataURL('image/jpeg', 0.9));
  };
  
  // Start crop operation
  const startCrop = (e) => {
    if (!cropMode || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    cropStartRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    isCroppingRef.current = true;
  };
  
  // Update crop selection while dragging
  const updateCrop = (e) => {
    if (!isCroppingRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    const width = Math.abs(currentX - cropStartRef.current.x);
    const height = Math.abs(currentY - cropStartRef.current.y);
    const x = Math.min(currentX, cropStartRef.current.x);
    const y = Math.min(currentY, cropStartRef.current.y);
    
    setCropCoordinates({ x, y, width, height });
    
    // Redraw with crop overlay
    applyChanges();
    const ctx = canvas.getContext('2d');
    
    // Draw semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Clear the crop area
    ctx.clearRect(x, y, width, height);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
  };
  
  // Complete the crop operation
  const endCrop = () => {
    if (!isCroppingRef.current || !canvasRef.current) return;
    
    isCroppingRef.current = false;
    
    const { x, y, width, height } = cropCoordinates;
    if (width < 10 || height < 10) {
      // Too small to crop
      return;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Get the image data from the selected area
    const imageData = ctx.getImageData(x, y, width, height);
    
    // Create a new canvas for the cropped image
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.putImageData(imageData, 0, 0);
    
    // Create a new image from the cropped canvas
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      setCropMode(false);
      applyChanges(img);
      addToHistory(img);
    };
    img.src = tempCanvas.toDataURL('image/jpeg');
  };
  
  // Cancel crop mode
  const cancelCrop = () => {
    setCropMode(false);
    isCroppingRef.current = false;
    applyChanges();
  };
  
  // Apply a filter
  const toggleFilter = (filterName) => {
    const newFilters = { ...filters, [filterName]: !filters[filterName] };
    setFilters(newFilters);
  };
  
  // Set blur amount
  const setBlurAmount = (amount) => {
    setFilters({ ...filters, blur: amount });
  };
  
  // Add current state to history
  const addToHistory = (img) => {
    // If we're not at the end of the history, truncate it
    const newHistory = historyIndex < historyStack.length - 1
      ? historyStack.slice(0, historyIndex + 1)
      : [...historyStack];
    
    newHistory.push(img.src);
    setHistoryStack(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };
  
  // Undo to previous state
  const undo = () => {
    if (historyIndex <= 0) return;
    
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      resetSettings();
      applyChanges(img);
    };
    img.src = historyStack[newIndex];
  };
  
  // Redo to next state
  const redo = () => {
    if (historyIndex >= historyStack.length - 1) return;
    
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      resetSettings();
      applyChanges(img);
    };
    img.src = historyStack[newIndex];
  };
  
  // Download the edited image
  const downloadImage = () => {
    if (!editedImage) return;
    
    const a = document.createElement('a');
    a.href = editedImage;
    a.download = 'edited-image.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    logger.info('Image downloaded');
  };
  
  // Apply changes whenever settings change
  useEffect(() => {
    if (imageRef.current) {
      applyChanges();
    }
  }, [brightness, contrast, saturation, rotation, filters]);
  
  return (
    <div className="image-editor-container">
      <h2>Image Editor</h2>
      
      <div className="editor-workspace">
        <div className="editor-tools">
          <div className="tool-section">
            <h3>Image</h3>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="file-input"
            />
            
            <div className="history-buttons">
              <button onClick={undo} disabled={historyIndex <= 0}>Undo</button>
              <button onClick={redo} disabled={historyIndex >= historyStack.length - 1}>Redo</button>
            </div>
          </div>
          
          <div className="tool-section">
            <h3>Adjustments</h3>
            <div className="slider-control">
              <label>Brightness: {brightness}%</label>
              <input 
                type="range" 
                min="0" 
                max="200" 
                value={brightness} 
                onChange={(e) => setBrightness(parseInt(e.target.value))} 
              />
            </div>
            
            <div className="slider-control">
              <label>Contrast: {contrast}%</label>
              <input 
                type="range" 
                min="0" 
                max="200" 
                value={contrast} 
                onChange={(e) => setContrast(parseInt(e.target.value))} 
              />
            </div>
            
            <div className="slider-control">
              <label>Saturation: {saturation}%</label>
              <input 
                type="range" 
                min="0" 
                max="200" 
                value={saturation} 
                onChange={(e) => setSaturation(parseInt(e.target.value))} 
              />
            </div>
            
            <div className="slider-control">
              <label>Rotation: {rotation}°</label>
              <input 
                type="range" 
                min="0" 
                max="359" 
                value={rotation} 
                onChange={(e) => setRotation(parseInt(e.target.value))} 
              />
            </div>
          </div>
          
          <div className="tool-section">
            <h3>Filters</h3>
            <div className="filter-buttons">
              <button 
                className={filters.grayscale ? 'active' : ''} 
                onClick={() => toggleFilter('grayscale')}
              >
                Grayscale
              </button>
              <button 
                className={filters.sepia ? 'active' : ''} 
                onClick={() => toggleFilter('sepia')}
              >
                Sepia
              </button>
              <button 
                className={filters.invert ? 'active' : ''} 
                onClick={() => toggleFilter('invert')}
              >
                Invert
              </button>
            </div>
            
            <div className="slider-control">
              <label>Blur: {filters.blur}px</label>
              <input 
                type="range" 
                min="0" 
                max="20" 
                value={filters.blur} 
                onChange={(e) => setBlurAmount(parseInt(e.target.value))} 
              />
            </div>
          </div>
          
          <div className="tool-section">
            <h3>Transform</h3>
            <div className="transform-buttons">
              <button 
                className={cropMode ? 'active' : ''} 
                onClick={() => setCropMode(!cropMode)}
              >
                {cropMode ? 'Cancel Crop' : 'Crop'}
              </button>
              
              {cropMode && (
                <button onClick={endCrop}>Apply Crop</button>
              )}
            </div>
          </div>
          
          <div className="tool-section">
            <h3>Export</h3>
            <button onClick={downloadImage} disabled={!editedImage}>
              Download Image
            </button>
          </div>
        </div>
        
        <div className="editor-canvas-container">
          {!image && (
            <div className="upload-prompt">
              <p>Upload an image to begin editing</p>
            </div>
          )}
          
          {image && (
            <canvas 
              ref={canvasRef}
              className="editor-canvas"
              onMouseDown={cropMode ? startCrop : null}
              onMouseMove={cropMode ? updateCrop : null}
              onMouseUp={cropMode ? endCrop : null}
              onMouseLeave={cropMode ? cancelCrop : null}
            />
          )}
        </div>
      </div>
      
      <div className="editor-tips">
        <h3>Image Processing Tips</h3>
        <ul>
          <li>Use the <strong>Brightness</strong> slider to adjust image exposure</li>
          <li>Increase <strong>Contrast</strong> to make the image pop more</li>
          <li>Reduce <strong>Saturation</strong> for a more muted look, or increase for vivid colors</li>
          <li>The <strong>Grayscale</strong> filter converts your image to black and white</li>
          <li>Use <strong>Crop</strong> to remove unwanted parts of your image</li>
          <li>You can <strong>Undo/Redo</strong> your changes with the history buttons</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageEditor;