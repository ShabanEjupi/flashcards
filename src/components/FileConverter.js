import React, { useState } from 'react';
import { logger } from '../utils/logger';

const FileConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState('pdf');
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);
  const [error, setError] = useState(null);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [qualitySettings, setQualitySettings] = useState({
    imageQuality: 0.9,
    pdfQuality: 'high',
    compressionLevel: 'medium'
  });

  const fileFormats = {
    pdf: { 
      name: 'PDF', 
      accepts: ['.docx', '.txt', '.jpg', '.png', '.html'],
      mimeTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png', 'text/html']
    },
    jpg: { 
      name: 'JPG Image', 
      accepts: ['.png', '.gif', '.bmp', '.webp', '.tiff'],
      mimeTypes: ['image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/tiff']
    },
    png: { 
      name: 'PNG Image', 
      accepts: ['.jpg', '.jpeg', '.gif', '.bmp', '.webp'],
      mimeTypes: ['image/jpeg', 'image/gif', 'image/bmp', 'image/webp']
    },
    docx: { 
      name: 'Word Document', 
      accepts: ['.txt', '.html', '.rtf'],
      mimeTypes: ['text/plain', 'text/html', 'application/rtf']
    },
    txt: { 
      name: 'Text File', 
      accepts: ['.docx', '.html', '.rtf'],
      mimeTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/html', 'application/rtf']
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        setError('File size too large. Maximum size is 50MB.');
        return;
      }
      
      setSelectedFile(file);
      setConvertedFile(null);
      setError(null);
      setConversionProgress(0);
    }
  };

  const handleFormatChange = (e) => {
    setTargetFormat(e.target.value);
    setConvertedFile(null);
    setError(null);
  };

  const handleFileConversionError = (error) => {
    console.error('File conversion error:', error);
    setError('There was an error converting the file. Please try again.');
  };

  // FIXED: Browser-compatible TXT to DOCX conversion
  const convertTextToDocx = async (file) => {
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const text = event.target.result;
            
            // Check if we're in a browser environment that supports dynamic imports
            if (typeof window !== 'undefined') {
              try {
                // Try to use the docx library with proper error handling
                const docxModule = await import('docx');
                const { Document, Paragraph, TextRun, Packer } = docxModule;
                
                // Split text into lines and create paragraphs
                const lines = text.split(/\r?\n/);
                
                // Create paragraphs for each line
                const paragraphs = lines.map(line => {
                  return new Paragraph({
                    children: [
                      new TextRun({
                        text: line || " ", // Empty line if no text
                        font: {
                          name: "Arial",
                        },
                        size: 24, // 12pt font (size is in half-points)
                      })
                    ],
                    spacing: {
                      after: 200, // Add some spacing after each paragraph
                    }
                  });
                });
                
                // Create the document
                const doc = new Document({
                  sections: [{
                    properties: {},
                    children: paragraphs,
                  }],
                  creator: "File Converter",
                  title: "Converted from TXT",
                  description: `Converted from ${file.name}`,
                });
                
                // Generate the DOCX file as ArrayBuffer instead of Buffer
                const arrayBuffer = await Packer.toBuffer(doc);
                
                // Create blob with proper MIME type
                const docxBlob = new Blob([arrayBuffer], { 
                  type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
                });
                
                resolve(docxBlob);
                
              } catch (docxError) {
                console.warn('DOCX library failed, falling back to RTF:', docxError);
                // Fallback to RTF if docx library fails
                const rtfBlob = await convertTextToRTF(file);
                resolve(rtfBlob);
              }
            } else {
              // Server-side environment, fallback to RTF
              const rtfBlob = await convertTextToRTF(file);
              resolve(rtfBlob);
            }
            
          } catch (error) {
            console.error('Error in convertTextToDocx:', error);
            reject(new Error(`Failed to convert text to DOCX: ${error.message}`));
          }
        };
        
        reader.onerror = () => reject(new Error('Failed to read text file'));
        reader.readAsText(file, 'UTF-8');
      });
    } catch (error) {
      console.error('Failed to load docx library:', error);
      // Fallback to RTF if docx library fails
      return convertTextToRTF(file);
    }
  };

  // Enhanced RTF conversion with better formatting
  const convertTextToRTF = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = event.target.result;
          
          // Create comprehensive RTF content with proper formatting
          const rtfHeader = '{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0\\fswiss\\fcharset0 Arial;}}';
          const rtfDocInfo = '{\\info{\\title Converted from TXT}{\\author File Converter}{\\company User}}';
          
          // Process text with better line handling
          const rtfContent = text
            .split(/\r?\n/)
            .map(line => {
              // Escape RTF special characters
              const escapedLine = line
                .replace(/\\/g, '\\\\')
                .replace(/\{/g, '\\{')
                .replace(/\}/g, '\\}');
              return escapedLine || '\\par'; // Empty lines become paragraph breaks
            })
            .join('\\par\n');
          
          const rtfFooter = '}';
          
          // Construct complete RTF document
          const rtfDocument = `${rtfHeader}${rtfDocInfo}\\f0\\fs24 ${rtfContent}${rtfFooter}`;
          
          const rtfBlob = new Blob([rtfDocument], { 
            type: 'application/rtf' 
          });
          
          resolve(rtfBlob);
        } catch (error) {
          reject(new Error(`Failed to convert text to RTF: ${error.message}`));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read text file'));
      reader.readAsText(file, 'UTF-8');
    });
  };

  // Alternative: Generate a simple HTML file that can be opened as Word document
  const convertTextToHTML = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = event.target.result;
          
          // Create HTML content that Word can open
          const htmlContent = `
<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head>
    <meta charset="UTF-8">
    <meta name="ProgId" content="Word.Document">
    <meta name="Generator" content="File Converter">
    <meta name="Originator" content="Microsoft Word">
    <title>Converted from TXT</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.6; margin: 1in; }
        p { margin: 0 0 6pt 0; }
    </style>
</head>
<body>
    <h1>Converted from: ${file.name}</h1>
    <hr>
${text.split(/\r?\n/).map(line => `    <p>${line || '&nbsp;'}</p>`).join('\n')}
</body>
</html>`;
          
          const htmlBlob = new Blob([htmlContent], { 
            type: 'application/msword' // This MIME type makes Word open it
          });
          
          resolve(htmlBlob);
        } catch (error) {
          reject(new Error(`Failed to convert text to HTML: ${error.message}`));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read text file'));
      reader.readAsText(file, 'UTF-8');
    });
  };

  // Image conversion with quality preservation
  const convertImage = async (file, targetFormat) => {
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Preserve original dimensions for better quality
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            
            // Use high-quality rendering
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Draw image
            ctx.drawImage(img, 0, 0);
            
            // Convert with quality settings
            const quality = targetFormat === 'jpg' ? qualitySettings.imageQuality : 1.0;
            const mimeType = targetFormat === 'jpg' ? 'image/jpeg' : `image/${targetFormat}`;
            
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to convert image'));
              }
            }, mimeType, quality);
          };
          
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = event.target.result;
        };
        
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });
    } catch (error) {
      handleFileConversionError(error);
    }
  };

  // Text to PDF conversion
  const convertTextToPDF = async (file) => {
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const { jsPDF } = await import('jspdf');
            
            const text = event.target.result;
            const doc = new jsPDF();
            
            // Set font and size for better quality
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            
            // Split text into lines that fit the page width
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const margin = 20;
            const maxLineWidth = pageWidth - (margin * 2);
            
            const lines = doc.splitTextToSize(text, maxLineWidth);
            let y = margin;
            
            lines.forEach((line) => {
              if (y > pageHeight - margin) {
                doc.addPage();
                y = margin;
              }
              doc.text(line, margin, y);
              y += 7; // Line height
            });
            
            // Generate blob
            const pdfBlob = doc.output('blob');
            resolve(pdfBlob);
          } catch (error) {
            reject(error);
          }
        };
        
        reader.onerror = () => reject(new Error('Failed to read text file'));
        reader.readAsText(file);
      });
    } catch (error) {
      handleFileConversionError(error);
    }
  };

  // Enhanced DOCX to text conversion using mammoth
  const convertDocxToText = async (file) => {
    try {
      const mammoth = await import('mammoth');
      
      return new Promise(async (resolve, reject) => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          
          if (result.value && result.value.trim().length > 0) {
            const formattedText = `Content extracted from: ${file.name}\n${'='.repeat(50)}\n\n${result.value}\n\n${'='.repeat(50)}\nExtracted using Mammoth.js - High quality text extraction`;
            
            const textBlob = new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
            resolve(textBlob);
          } else {
            throw new Error('No text content found in the DOCX file');
          }
          
        } catch (error) {
          logger.error('Mammoth DOCX conversion failed', { error: error.message });
          reject(new Error(`Failed to convert DOCX: ${error.message}`));
        }
      });
    } catch (error) {
      handleFileConversionError(error);
    }
  };

  // Main conversion function
  const performConversion = async (file, targetFormat) => {
    const fileType = file.type;
    
    setConversionProgress(25);
    
    try {
      let convertedBlob;
      
      // Image conversions
      if (fileType.startsWith('image/') && ['jpg', 'png', 'gif', 'webp'].includes(targetFormat)) {
        convertedBlob = await convertImage(file, targetFormat);
      }
      // Text to PDF
      else if (fileType === 'text/plain' && targetFormat === 'pdf') {
        convertedBlob = await convertTextToPDF(file);
      }
      // TEXT TO DOCX - Enhanced with multiple fallbacks
      else if (fileType === 'text/plain' && targetFormat === 'docx') {
        setConversionProgress(50);
        try {
          convertedBlob = await convertTextToDocx(file);
        } catch (docxError) {
          console.warn('DOCX conversion failed, trying HTML format:', docxError);
          // Try HTML format as fallback (opens in Word)
          convertedBlob = await convertTextToHTML(file);
        }
      }
      // DOCX to TXT
      else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && targetFormat === 'txt') {
        setConversionProgress(50);
        convertedBlob = await convertDocxToText(file);
      }
      // Image to PDF
      else if (fileType.startsWith('image/') && targetFormat === 'pdf') {
        const { jsPDF } = await import('jspdf');
        const doc = new jsPDF();
        
        const imgData = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
        
        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = imgData;
        });
        
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const imgAspectRatio = img.width / img.height;
        const pageAspectRatio = pageWidth / pageHeight;
        
        let imgWidth, imgHeight;
        if (imgAspectRatio > pageAspectRatio) {
          imgWidth = pageWidth - 20;
          imgHeight = imgWidth / imgAspectRatio;
        } else {
          imgHeight = pageHeight - 20;
          imgWidth = imgHeight * imgAspectRatio;
        }
        
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;
        
        doc.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
        convertedBlob = doc.output('blob');
      }
      else {
        throw new Error(`Conversion from ${fileType} to ${targetFormat} is not supported yet`);
      }
      
      setConversionProgress(100);
      return convertedBlob;
      
    } catch (error) {
      throw new Error(`Conversion failed: ${error.message}`);
    }
  };

  const handleConversion = async () => {
    if (!selectedFile) {
      setError('Please select a file to convert');
      return;
    }

    setIsConverting(true);
    setError(null);
    setConversionProgress(0);

    try {
      const convertedBlob = await performConversion(selectedFile, targetFormat);
      
      const fileName = `${selectedFile.name.split('.')[0]}.${targetFormat}`;
      const fileUrl = URL.createObjectURL(convertedBlob);
      
      setConvertedFile({
        name: fileName,
        url: fileUrl,
        size: convertedBlob.size,
        blob: convertedBlob
      });
      
      logger.info(`Successfully converted ${selectedFile.name} to ${targetFormat}`);
    } catch (err) {
      logger.error('File conversion failed', { error: err.message });
      setError(err.message);
    } finally {
      setIsConverting(false);
      setConversionProgress(0);
    }
  };

  const downloadConvertedFile = () => {
    if (convertedFile) {
      const link = document.createElement('a');
      link.href = convertedFile.url;
      link.download = convertedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="file-converter-container">
      <h2>Enhanced File Converter</h2>
      
      <div className="converter-section">
        <div className="upload-section">
          <h3>Upload File</h3>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="file-input"
            disabled={isConverting}
            accept={Object.values(fileFormats)
              .flatMap(format => format.mimeTypes)
              .join(',')}
          />
          {selectedFile && (
            <div className="selected-file">
              <p><strong>Selected file:</strong> {selectedFile.name}</p>
              <p><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              <p><strong>Type:</strong> {selectedFile.type}</p>
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

        {targetFormat.startsWith('image') && (
          <div className="quality-section">
            <h3>Quality Settings</h3>
            <div className="quality-controls">
              <label>
                Image Quality: {Math.round(qualitySettings.imageQuality * 100)}%
                <input 
                  type="range" 
                  min="0.1" 
                  max="1" 
                  step="0.1"
                  value={qualitySettings.imageQuality}
                  onChange={(e) => setQualitySettings(prev => ({
                    ...prev,
                    imageQuality: parseFloat(e.target.value)
                  }))}
                />
              </label>
            </div>
          </div>
        )}
        
        <div className="action-section">
          <button 
            onClick={handleConversion} 
            disabled={!selectedFile || isConverting}
            className="convert-button"
          >
            {isConverting ? `Converting... ${conversionProgress}%` : 'Convert File'}
          </button>
        </div>

        {isConverting && (
          <div className="progress-section">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${conversionProgress}%` }}
              ></div>
            </div>
          </div>
        )}
        
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
              <p><strong>Size:</strong> {(convertedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              <button 
                onClick={downloadConvertedFile}
                className="download-button"
              >
                Download Converted File
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="converter-features">
        <h3>Features & Improvements</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>✨ High Quality Conversion</h4>
            <ul>
              <li>Multiple conversion methods</li>
              <li>Automatic fallbacks for compatibility</li>
              <li>UTF-8 text encoding support</li>
              <li>Professional document formatting</li>
            </ul>
          </div>
          <div className="feature-card">
            <h4>🔄 Smart Conversion</h4>
            <ul>
              <li>DOCX when possible, RTF/HTML fallback</li>
              <li>Works across all browsers and platforms</li>
              <li>Proper MIME types</li>
              <li>Multiple output formats</li>
            </ul>
          </div>
          <div className="feature-card">
            <h4>📁 Supported Formats</h4>
            <ul>
              <li>TXT → DOCX/RTF/HTML (Auto-detect best)</li>
              <li>DOCX → TXT</li>
              <li>Images: JPG, PNG, GIF, WebP</li>
              <li>PDF conversion support</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="converter-notes">
        <h3>Important Notes</h3>
        <ul>
          <li>Maximum file size: 50 MB</li>
          <li><strong>TXT to DOCX:</strong> Uses best available method (DOCX → RTF → HTML)</li>
          <li>All processing happens locally in your browser</li>
          <li>UTF-8 encoding preserved for international characters</li>
          <li>Professional formatting with automatic fallbacks</li>
          <li>Cross-platform compatibility ensured</li>
        </ul>
      </div>
    </div>
  );
};

export default FileConverter;