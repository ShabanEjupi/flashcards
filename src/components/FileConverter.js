import React, { useState } from 'react';
import { logger } from '../utils/logger';

const FileConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState('pdf');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);
  const [error, setError] = useState(null);

  const fileFormats = {
    pdf: { name: 'PDF', accepts: ['.docx', '.pptx', '.jpg', '.png', '.txt'] },
    docx: { name: 'Word', accepts: ['.pdf', '.txt', '.rtf'] },
    pptx: { name: 'PowerPoint', accepts: ['.pdf', '.vba', '.txt'] },
    jpg: { name: 'JPG Image', accepts: ['.pdf', '.png', '.bmp', '.tiff'] },
    png: { name: 'PNG Image', accepts: ['.pdf', '.jpg', '.bmp', '.tiff'] },
    vba: { name: 'VBA Script', accepts: ['.txt', '.bas'] },
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setConvertedFile(null);
      setError(null);
    }
  };

  const handleFormatChange = (e) => {
    setTargetFormat(e.target.value);
    setConvertedFile(null);
    setError(null);
  };

  const handleConversion = async () => {
    if (!selectedFile) {
      setError('Please select a file to convert');
      return;
    }

    setIsConverting(true);
    setError(null);

    try {
      // This is a placeholder for actual conversion logic
      // In a real implementation, you would:
      // 1. Either use client-side libraries for conversion where possible
      // 2. Or send the file to a backend service/API

      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));

      // This is just a simulation - in reality you'd have real conversion logic
      const mockConvertedFile = {
        name: `${selectedFile.name.split('.')[0]}.${targetFormat}`,
        url: URL.createObjectURL(selectedFile), // Just using the original file for demonstration
        size: selectedFile.size,
      };

      setConvertedFile(mockConvertedFile);
      logger.info(`Converted ${selectedFile.name} to ${targetFormat}`);
    } catch (err) {
      logger.error('File conversion failed', { error: err.message });
      setError('Conversion failed. Please try again or check file compatibility.');
    } finally {
      setIsConverting(false);
    }
  };

  const getAcceptedFormats = () => {
    // Get all possible input formats based on the selected target format
    return Object.entries(fileFormats)
      .filter(([format, info]) => info.accepts.includes(`.${targetFormat}`) || format === targetFormat)
      .map(([format]) => `.${format}`)
      .join(',');
  };

  return (
    <div className="file-converter-container">
      <h2>File Converter</h2>
      
      <div className="converter-section">
        <div className="upload-section">
          <h3>Upload File</h3>
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept={getAcceptedFormats()}
            className="file-input"
            disabled={isConverting}
          />
          {selectedFile && (
            <div className="selected-file">
              <p><strong>Selected file:</strong> {selectedFile.name}</p>
              <p><strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB</p>
            </div>
          )}
        </div>
        
        <div className="format-section">
          <h3>Select Output Format</h3>
          <select 
            value={targetFormat} 
            onChange={handleFormatChange}
            disabled={isConverting}
            className="format-select"
          >
            {Object.entries(fileFormats).map(([format, info]) => (
              <option key={format} value={format}>{info.name}</option>
            ))}
          </select>
        </div>
        
        <div className="action-section">
          <button 
            onClick={handleConversion} 
            disabled={!selectedFile || isConverting}
            className="convert-button"
          >
            {isConverting ? 'Converting...' : 'Convert File'}
          </button>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        {convertedFile && (
          <div className="result-section">
            <h3>Conversion Complete</h3>
            <div className="converted-file">
              <p><strong>File:</strong> {convertedFile.name}</p>
              <p><strong>Size:</strong> {(convertedFile.size / 1024).toFixed(2)} KB</p>
              <a 
                href={convertedFile.url} 
                download={convertedFile.name}
                className="download-button"
              >
                Download Converted File
              </a>
            </div>
          </div>
        )}
      </div>
      
      <div className="conversion-info">
        <h3>Supported Conversions</h3>
        <div className="formats-grid">
          {Object.entries(fileFormats).map(([format, info]) => (
            <div key={format} className="format-card">
              <h4>{info.name}</h4>
              <p>Can convert from:</p>
              <ul>
                {info.accepts.map(ext => (
                  <li key={ext}>{fileFormats[ext.substring(1)]?.name || ext}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="converter-notes">
        <h3>Important Notes</h3>
        <ul>
          <li>Maximum file size: 10 MB</li>
          <li>Conversion quality may vary depending on file complexity</li>
          <li>Converted files are available for download for 24 hours</li>
          <li>Your files are not stored permanently and are processed securely</li>
        </ul>
      </div>
    </div>
  );
};

export default FileConverter;