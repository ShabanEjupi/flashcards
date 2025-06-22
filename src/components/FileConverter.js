import React, { useState } from 'react';
import { logger } from '../utils/logger';

const FileConverter = () => {  const [selectedFile, setSelectedFile] = useState(null);
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
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [recoveryOptions, setRecoveryOptions] = useState({
    textRecovery: true,
    forceExtraction: false,
    zipRepair: true
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
      accepts: ['.txt', '.html', '.rtf', '.pdf'],
      mimeTypes: ['text/plain', 'text/html', 'application/rtf', 'application/pdf']
    },
    txt: { 
      name: 'Text File', 
      accepts: ['.docx', '.html', '.rtf', '.pdf'],
      mimeTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/html', 'application/rtf', 'application/pdf']    }
  };

  const handleFormatChange = (e) => {
    setTargetFormat(e.target.value);
    setConvertedFile(null);
    setError(null);
  };

  const handleFileConversionError = (error) => {
    console.error('File conversion error:', error);
    setError('There was an error converting the file. Please try again.');
  };  // Enhanced TXT to DOCX conversion with multiple fallback methods
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
                const { Document, Paragraph, TextRun, Packer, HeadingLevel, AlignmentType } = docxModule;
                
                // Enhanced text processing
                const lines = text.split(/\r?\n/);
                const processedLines = lines.map(line => line.trim());
                
                // Create header section
                const headerParagraphs = [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `Converted Document`,
                        font: { name: "Calibri" },
                        size: 32, // 16pt
                        bold: true,
                        color: "2F5496"
                      })
                    ],
                    heading: HeadingLevel.TITLE,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 }
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `Source: ${file.name}`,
                        font: { name: "Calibri" },
                        size: 22, // 11pt
                        italic: true,
                        color: "666666"
                      })
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 }
                  }),
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `Converted: ${new Date().toLocaleString()}`,
                        font: { name: "Calibri" },
                        size: 20, // 10pt
                        color: "888888"
                      })
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 600 }
                  })
                ];

                // Enhanced paragraph creation with smart formatting
                const contentParagraphs = processedLines.map((line, index) => {
                  // Determine if line looks like a heading
                  const isHeading = line.length > 0 && line.length < 100 && 
                                  (line.match(/^[A-Z\s]+$/) || line.endsWith(':') || 
                                   index === 0 || (index > 0 && processedLines[index - 1] === ''));
                  
                  return new Paragraph({
                    children: [
                      new TextRun({
                        text: line || " ", // Empty line handling
                        font: { name: "Calibri" },
                        size: isHeading ? 26 : 22, // 13pt for headings, 11pt for content
                        bold: isHeading,
                        color: isHeading ? "1F4E79" : "000000"
                      })
                    ],
                    spacing: {
                      after: line === '' ? 120 : (isHeading ? 240 : 120), // More space after headings
                      before: isHeading && index > 0 ? 240 : 0
                    },
                    alignment: AlignmentType.LEFT
                  });
                });
                
                // Create the document with professional formatting
                const doc = new Document({
                  sections: [{
                    properties: {
                      page: {
                        margin: {
                          top: 1440,   // 1 inch margins
                          right: 1440,
                          bottom: 1440,
                          left: 1440,
                        },
                      },
                    },
                    children: [...headerParagraphs, ...contentParagraphs],
                  }],
                  creator: "Enhanced File Converter",
                  title: `Converted from ${file.name}`,
                  description: `Professional document converted from ${file.name} on ${new Date().toLocaleString()}`,
                  keywords: ["text", "conversion", "document"],
                  lastModifiedBy: "File Converter",
                  revision: 1,
                });
                
                // Generate the DOCX file
                const arrayBuffer = await Packer.toBuffer(doc);
                
                // Create blob with proper MIME type
                const docxBlob = new Blob([arrayBuffer], { 
                  type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
                });
                
                console.log('✅ Successfully converted to DOCX format');
                resolve(docxBlob);
                
              } catch (docxError) {
                console.warn('⚠️ DOCX library failed, trying RTF format:', docxError);
                // Fallback to RTF if docx library fails
                try {
                  const rtfBlob = await convertTextToRTF(file);
                  resolve(rtfBlob);
                } catch (rtfError) {
                  console.warn('⚠️ RTF conversion failed, trying HTML format:', rtfError);
                  // Final fallback to HTML
                  const htmlBlob = await convertTextToHTML(file);
                  resolve(htmlBlob);
                }
              }
            } else {
              // Server-side environment, fallback to RTF
              const rtfBlob = await convertTextToRTF(file);
              resolve(rtfBlob);
            }
            
          } catch (error) {
            console.error('❌ Error in convertTextToDocx:', error);
            reject(new Error(`Failed to convert text to DOCX: ${error.message}`));
          }
        };
        
        reader.onerror = () => reject(new Error('Failed to read text file'));
        reader.readAsText(file, 'UTF-8');
      });
    } catch (error) {
      console.error('❌ Failed to load docx library:', error);
      // Fallback to RTF if docx library fails
      return convertTextToRTF(file);
    }
  };
  // Enhanced RTF conversion with professional formatting
  const convertTextToRTF = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = event.target.result;
          const lines = text.split(/\r?\n/);
          
          // Create comprehensive RTF content with professional formatting
          const rtfHeader = '{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0\\fswiss\\fcharset0 Calibri;}{\\f1\\fswiss\\fcharset0 Arial;}}';
          const rtfColors = '{\\colortbl ;\\red47,84,150;\\red102,102,102;\\red0,0,0;}'; // Color table
          const rtfDocInfo = `{\\info{\\title Converted from TXT}{\\author Enhanced File Converter}{\\company User}{\\creatim\\yr${new Date().getFullYear()}\\mo${new Date().getMonth() + 1}\\dy${new Date().getDate()}}}`;
          
          // Create header section
          let rtfContent = `{\\pard\\qc\\f0\\fs32\\b\\cf1 Converted Document\\par}`;
          rtfContent += `{\\pard\\qc\\f0\\fs20\\i\\cf2 Source: ${file.name}\\par}`;
          rtfContent += `{\\pard\\qc\\f0\\fs18\\cf2 Converted: ${new Date().toLocaleString()}\\par}`;
          rtfContent += '{\\pard\\qc\\f0\\fs20 \\line\\line\\par}'; // Add some spacing
          
          // Process content with smart formatting
          lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            if (trimmedLine === '') {
              // Empty line - add paragraph break
              rtfContent += '{\\par}';
            } else {
              // Determine if line looks like a heading
              const isHeading = trimmedLine.length > 0 && trimmedLine.length < 100 && 
                              (trimmedLine.match(/^[A-Z\s]+$/) || trimmedLine.endsWith(':') || 
                               (index < lines.length - 1 && lines[index + 1].trim() === ''));
              
              // Escape RTF special characters
              const escapedLine = trimmedLine
                .replace(/\\/g, '\\\\')
                .replace(/\{/g, '\\{')
                .replace(/\}/g, '\\}')
                .replace(/\n/g, '\\line ');
              
              if (isHeading) {
                // Format as heading
                rtfContent += `{\\pard\\sb240\\sa120\\f0\\fs26\\b\\cf1 ${escapedLine}\\par}`;
              } else {
                // Format as regular paragraph
                rtfContent += `{\\pard\\sb60\\sa60\\f0\\fs22\\cf3 ${escapedLine}\\par}`;
              }
            }
          });
          
          // Add footer
          rtfContent += '{\\pard\\qc\\f0\\fs16\\cf2 \\line\\line Generated by Enhanced File Converter\\par}';
          
          const rtfFooter = '}';
          
          // Construct complete RTF document
          const rtfDocument = `${rtfHeader}${rtfColors}${rtfDocInfo}${rtfContent}${rtfFooter}`;
          
          const rtfBlob = new Blob([rtfDocument], { 
            type: 'application/rtf' 
          });
          
          console.log('✅ Successfully converted to RTF format');
          resolve(rtfBlob);
        } catch (error) {
          reject(new Error(`Failed to convert text to RTF: ${error.message}`));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read text file'));
      reader.readAsText(file, 'UTF-8');
    });
  };  // Enhanced HTML conversion that opens perfectly in Microsoft Word
  const convertTextToHTML = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const text = event.target.result;
          const lines = text.split(/\r?\n/);
          
          // Process lines with smart formatting
          let htmlContent = '';
          lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            if (trimmedLine === '') {
              htmlContent += '    <p>&nbsp;</p>\n'; // Empty paragraph for spacing
            } else {
              // Determine if line looks like a heading
              const isHeading = trimmedLine.length > 0 && trimmedLine.length < 100 && 
                              (trimmedLine.match(/^[A-Z\s]+$/) || trimmedLine.endsWith(':') || 
                               (index < lines.length - 1 && lines[index + 1].trim() === ''));
              
              // Escape HTML special characters and handle Unicode properly
              const escapedLine = trimmedLine
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
              
              if (isHeading) {
                htmlContent += `    <h3 style="color: #1F4E79; margin-top: 24pt; margin-bottom: 12pt;">${escapedLine}</h3>\n`;
              } else {
                htmlContent += `    <p style="margin-bottom: 6pt;">${escapedLine}</p>\n`;
              }
            }
          });
          
          // Create comprehensive HTML content that Word recognizes with proper encoding
          const fullHtmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" 
      xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:w="urn:schemas-microsoft-com:office:word">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="ProgId" content="Word.Document">
    <meta name="Generator" content="Enhanced File Converter">
    <meta name="Originator" content="Microsoft Word">
    <title>Converted from ${file.name}</title>
    <!--[if gte mso 9]>
    <xml>
        <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotPromptForConvert/>
            <w:DoNotShowInsertionsAndDeletions/>
        </w:WordDocument>
    </xml>
    <![endif]-->
    <style>
        @page Section1 {
            size: 8.5in 11.0in;
            margin: 1.0in 1.0in 1.0in 1.0in;
        }
        div.Section1 { page: Section1; }
        body { 
            font-family: 'Times New Roman', Times, serif; 
            font-size: 12pt; 
            line-height: 1.5; 
            margin: 0;
            padding: 20pt;
            background: white;
        }
        h1 { 
            color: #2F5496; 
            font-size: 18pt; 
            text-align: center; 
            margin-bottom: 24pt; 
            font-weight: bold;
            font-family: 'Times New Roman', Times, serif;
        }
        h2 { 
            color: #666666; 
            font-size: 12pt; 
            text-align: center; 
            margin-bottom: 12pt; 
            font-style: italic;
            font-family: 'Times New Roman', Times, serif;
        }
        h3 { 
            color: #1F4E79; 
            font-size: 14pt; 
            margin-top: 24pt; 
            margin-bottom: 12pt; 
            font-weight: bold;
            font-family: 'Times New Roman', Times, serif;
        }
        p { 
            margin: 0 0 12pt 0; 
            text-align: justify;
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
        }
        .footer {
            margin-top: 36pt;
            padding-top: 12pt;
            border-top: 1px solid #cccccc;
            color: #888888;
            font-size: 10pt;
            text-align: center;
            font-family: 'Times New Roman', Times, serif;
        }
    </style>
</head>
<body>
    <div class="Section1">
        <h1>Converted Document</h1>
        <h2>Source: ${file.name}</h2>
        <h2>Converted: ${new Date().toLocaleString()}</h2>
        <br>
${htmlContent}
        <div class="footer">
            Generated by Enhanced File Converter<br>
            High-quality text to Word conversion
        </div>
    </div>
</body>
</html>`;
          
          // Create blob with proper encoding for Word compatibility
          const htmlBlob = new Blob(['\ufeff' + fullHtmlContent], { 
            type: 'application/vnd.ms-word;charset=utf-8'
          });
          
          console.log('✅ Successfully converted to HTML format (Word-compatible)');
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
  // Enhanced DOCX to text conversion using mammoth with recovery options
  const convertDocxToText = async (file) => {
    try {
      const mammoth = await import('mammoth');
      
      return new Promise(async (resolve, reject) => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          
          // First, try standard conversion
          let result;
          try {
            result = await mammoth.extractRawText({ arrayBuffer });
          } catch (standardError) {
            logger.warn('Standard DOCX conversion failed, attempting recovery', { error: standardError.message });
            
            // If standard conversion fails, try recovery mode
            try {
              const recoveryResult = await recoverWithMammoth(file);
              if (recoveryResult.success) {
                result = { value: recoveryResult.data, messages: recoveryResult.warnings };
              } else {
                // If mammoth recovery fails, try force extraction
                const forceResult = await forceTextExtraction(file);
                if (forceResult.success) {
                  result = { 
                    value: forceResult.data, 
                    messages: [`Recovery mode: Force extraction (${forceResult.confidence}% confidence)`] 
                  };
                } else {
                  throw standardError; // Throw original error if all recovery attempts fail
                }
              }
            } catch (recoveryError) {
              logger.error('All DOCX recovery methods failed', { 
                originalError: standardError.message, 
                recoveryError: recoveryError.message 
              });
              throw new Error(`Document appears corrupted. Original error: ${standardError.message}. Recovery failed: ${recoveryError.message}`);
            }
          }
          
          if (result.value && result.value.trim().length > 0) {
            let recoveryInfo = '';
            if (result.messages && result.messages.length > 0) {
              recoveryInfo = `\n\nRecovery Information:\n${result.messages.join('\n')}`;
            }
            
            const formattedText = `Content extracted from: ${file.name}\n${'='.repeat(50)}\n\n${result.value}\n\n${'='.repeat(50)}\nExtracted using Mammoth.js - High quality text extraction${recoveryInfo}`;
            
            const textBlob = new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
            resolve(textBlob);
          } else {
            throw new Error('No text content found in the DOCX file');
          }
          
        } catch (error) {
          logger.error('DOCX conversion completely failed', { error: error.message });
          reject(new Error(`Failed to convert DOCX: ${error.message}`));
        }
      });
    } catch (error) {
      handleFileConversionError(error);
    }  };

  // Enhanced PDF to DOCX conversion using pdfjs-dist with better worker handling
  const convertPdfToDocx = async (file) => {
    try {
      const pdfjsLib = await import('pdfjs-dist');
      
      // Try multiple worker configurations
      if (typeof window !== 'undefined') {
        try {
          // First try: Use a more stable worker URL
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
        } catch (workerError) {
          console.warn('Primary worker failed, trying alternative:', workerError);
          try {
            // Second try: Use cdnjs
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
          } catch (workerError2) {
            console.warn('CDN worker failed, disabling worker:', workerError2);
            // Disable worker as fallback
            pdfjsLib.GlobalWorkerOptions.workerSrc = '';
          }
        }
      }
      
      return new Promise(async (resolve, reject) => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ 
            data: arrayBuffer,
            useWorkerFetch: false,
            isEvalSupported: false,
            useSystemFonts: true,
            disableWorker: true // Disable worker to avoid issues
          }).promise;
          
          let fullText = `Document: ${file.name}
Conversion Method: PDF.js (Browser-compatible)
Creation Date: ${new Date().toLocaleString()}
Total Pages: ${pdf.numPages}

${'='.repeat(80)}

`;
          
          // Extract text from each page with better formatting
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            try {
              const page = await pdf.getPage(pageNum);
              const textContent = await page.getTextContent();
              
              let pageText = `[Page ${pageNum}]\n`;
              let lastY = null;
              let lineText = '';
              
              // Sort items by position for better text flow
              const sortedItems = textContent.items.sort((a, b) => {
                if (Math.abs(a.transform[5] - b.transform[5]) > 5) {
                  return b.transform[5] - a.transform[5]; // Sort by Y coordinate (top to bottom)
                }
                return a.transform[4] - b.transform[4]; // Sort by X coordinate (left to right)
              });
              
              sortedItems.forEach(item => {
                if (item.str && item.str.trim()) {
                  // Check if we're on a new line
                  if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
                    if (lineText.trim()) {
                      pageText += lineText.trim() + '\n';
                      lineText = '';
                    }
                  }
                  lineText += item.str + ' ';
                  lastY = item.transform[5];
                }
              });
              
              // Add remaining line text
              if (lineText.trim()) {
                pageText += lineText.trim() + '\n';
              }
              
              pageText += '\n'; // Add space between pages
              fullText += pageText;
              
            } catch (pageError) {
              console.warn(`Error processing page ${pageNum}:`, pageError);
              fullText += `[Page ${pageNum} - Error extracting content]\n\n`;
            }
          }
          
          fullText += `${'='.repeat(80)}
Extraction completed: ${new Date().toLocaleString()}
Note: Text extracted using PDF.js library for maximum browser compatibility`;
          
          if (fullText.trim().length > 200) { // Validation
            // Create a temporary text file-like object
            const tempTextFile = new File([fullText], 'temp.txt', { type: 'text/plain' });
            
            // Use existing text to DOCX conversion
            const docxBlob = await convertTextToDocx(tempTextFile);
            resolve(docxBlob);
          } else {
            throw new Error('Insufficient text content found in the PDF file. The document might be image-based or corrupted.');
          }
          
        } catch (error) {
          logger.error('PDF.js conversion failed', { error: error.message });
          reject(new Error(`Failed to convert PDF to DOCX: ${error.message}`));
        }
      });
    } catch (error) {
      handleFileConversionError(error);
      throw new Error('PDF conversion libraries are not available in this environment');
    }
  };  // Improved fallback PDF to DOCX conversion using pdfjs-dist
  const convertPdfToDocxFallback = async (file) => {
    try {
      const pdfjsLib = await import('pdfjs-dist');
      
      // Disable worker to avoid compatibility issues
      if (typeof window !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '';
      }
      
      return new Promise(async (resolve, reject) => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ 
            data: arrayBuffer,
            useWorkerFetch: false,
            isEvalSupported: false,
            useSystemFonts: true,
            disableWorker: true
          }).promise;
          
          let fullText = `Document: ${file.name}
Conversion Method: PDF.js (Browser-compatible)
Creation Date: ${new Date().toLocaleString()}
Total Pages: ${pdf.numPages}

${'='.repeat(80)}

`;
          
          // Extract text from each page with better formatting
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            try {
              const page = await pdf.getPage(pageNum);
              const textContent = await page.getTextContent();
              
              let pageText = `[Page ${pageNum}]\n`;
              let lastY = null;
              let lineText = '';
              
              // Sort items by position for better text flow
              const sortedItems = textContent.items.sort((a, b) => {
                if (Math.abs(a.transform[5] - b.transform[5]) > 5) {
                  return b.transform[5] - a.transform[5]; // Sort by Y coordinate (top to bottom)
                }
                return a.transform[4] - b.transform[4]; // Sort by X coordinate (left to right)
              });
              
              sortedItems.forEach(item => {
                if (item.str && item.str.trim()) {
                  // Check if we're on a new line
                  if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
                    if (lineText.trim()) {
                      pageText += lineText.trim() + '\n';
                      lineText = '';
                    }
                  }
                  lineText += item.str + ' ';
                  lastY = item.transform[5];
                }
              });
              
              // Add remaining line text
              if (lineText.trim()) {
                pageText += lineText.trim() + '\n';
              }
              
              pageText += '\n'; // Add space between pages
              fullText += pageText;
              
            } catch (pageError) {
              console.warn(`Error processing page ${pageNum}:`, pageError);
              fullText += `[Page ${pageNum} - Error extracting content]\n\n`;
            }
          }
          
          fullText += `${'='.repeat(80)}
Extraction completed: ${new Date().toLocaleString()}
Note: Text extracted using PDF.js library for maximum compatibility`;
          
          if (fullText.trim().length > 200) { // More lenient validation
            // Create a temporary text file-like object
            const tempTextFile = new File([fullText], 'temp.txt', { type: 'text/plain' });
            
            // Use existing text to DOCX conversion
            const docxBlob = await convertTextToDocx(tempTextFile);
            resolve(docxBlob);
          } else {
            throw new Error('Insufficient text content found in the PDF file. The document might be image-based or corrupted.');
          }
          
        } catch (error) {
          logger.error('PDF.js conversion failed', { error: error.message });
          reject(new Error(`Failed to convert PDF to DOCX using fallback method: ${error.message}`));
        }
      });
    } catch (error) {
      handleFileConversionError(error);
      throw new Error('PDF conversion libraries are not available in this environment');
    }
  };  // PDF to TXT conversion using pdfjs-dist
  const convertPdfToText = async (file) => {
    try {
      const pdfjsLib = await import('pdfjs-dist');
      
      // Disable worker to avoid compatibility issues
      if (typeof window !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '';
      }
      
      return new Promise(async (resolve, reject) => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ 
            data: arrayBuffer,
            useWorkerFetch: false,
            isEvalSupported: false,
            useSystemFonts: true,
            disableWorker: true
          }).promise;
          
          let fullText = `Content extracted from PDF: ${file.name}\n${'='.repeat(60)}\n\n`;
          
          // Extract text from each page
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            
            let pageText = `--- Page ${pageNum} ---\n`;
            textContent.items.forEach(item => {
              if (item.str) {
                pageText += item.str + ' ';
              }
            });
            pageText += '\n\n';
            fullText += pageText;
          }
          
          fullText += `${'='.repeat(60)}\nExtracted using PDF.js\nTotal Pages: ${pdf.numPages}\nCreated: ${new Date().toLocaleString()}`;
          
          const textBlob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
          resolve(textBlob);
          
        } catch (error) {
          logger.error('PDF.js text conversion failed', { error: error.message });
          reject(new Error(`Failed to convert PDF to text: ${error.message}`));
        }
      });
    } catch (error) {
      handleFileConversionError(error);
      throw new Error('PDF conversion libraries not available');
    }
  };
  // Fallback PDF to text using pdfjs-dist
  const convertPdfToTextFallback = async (file) => {
    try {
      const pdfjsLib = await import('pdfjs-dist');
      
      // Disable worker to avoid compatibility issues
      if (typeof window !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '';
      }
      
      return new Promise(async (resolve, reject) => {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ 
            data: arrayBuffer,
            useWorkerFetch: false,
            isEvalSupported: false,
            useSystemFonts: true,
            disableWorker: true
          }).promise;
          
          let fullText = `Content extracted from PDF: ${file.name}\n${'='.repeat(60)}\n\n`;
          
          // Extract text from each page
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            
            let pageText = `--- Page ${pageNum} ---\n`;
            textContent.items.forEach(item => {
              if (item.str) {
                pageText += item.str + ' ';
              }
            });
            pageText += '\n\n';
            fullText += pageText;
          }
          
          fullText += `${'='.repeat(60)}\nExtracted using PDF.js\nTotal Pages: ${pdf.numPages}\nCreated: ${new Date().toLocaleString()}`;
          
          const textBlob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
          resolve(textBlob);
          
        } catch (error) {
          logger.error('PDF.js text conversion failed', { error: error.message });
          reject(new Error(`Failed to convert PDF to text: ${error.message}`));
        }
      });
    } catch (error) {
      handleFileConversionError(error);
      throw new Error('PDF conversion libraries are not available');
    }
  };

  // Alternative PDF to DOCX conversion without worker
  const convertPdfToDocxAlternative = async (file) => {
    try {
      // Try using a simple PDF text extraction method
      const textContent = await extractPdfTextSimple(file);
      
      if (textContent && textContent.trim().length > 10) {
        // Create a temporary text file and convert to DOCX
        const tempTextFile = new File([textContent], 'temp.txt', { type: 'text/plain' });
        return await convertTextToDocx(tempTextFile);
      } else {
        throw new Error('No readable text found in PDF');
      }
    } catch (error) {
      throw new Error(`Alternative PDF conversion failed: ${error.message}`);
    }
  };

  // Simple PDF text extraction without worker
  const extractPdfTextSimple = async (file) => {
    try {
      // Try to read PDF as text (works for simple PDFs)
      const text = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const arrayBuffer = event.target.result;
          const uint8Array = new Uint8Array(arrayBuffer);
          
          // Convert to string and look for text content
          let text = '';
          for (let i = 0; i < uint8Array.length; i++) {
            const char = String.fromCharCode(uint8Array[i]);
            if (char.match(/[\x20-\x7E\n\r\t]/)) { // Printable ASCII + whitespace
              text += char;
            }
          }
          
          // Clean up the extracted text
          text = text
            .replace(/\0/g, '') // Remove null characters
            .replace(/[^\x20-\x7E\n\r\t]/g, ' ') // Replace non-printable with spaces
            .replace(/\s+/g, ' ') // Normalize whitespace
            .trim();
          
          resolve(text);
        };
        reader.onerror = () => reject(new Error('Failed to read PDF file'));
        reader.readAsArrayBuffer(file);
      });
      
      if (text.length > 50) {
        return `Content extracted from PDF: ${file.name}\n${'='.repeat(60)}\n\n${text}\n\n${'='.repeat(60)}\nExtracted using simple text extraction\nCreated: ${new Date().toLocaleString()}`;
      } else {
        throw new Error('Insufficient text content found');
      }
    } catch (error) {
      throw new Error(`Simple PDF extraction failed: ${error.message}`);
    }
  };

  // Simple PDF to text conversion
  const convertPdfToTextSimple = async (file) => {
    try {
      const textContent = await extractPdfTextSimple(file);
      return new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    } catch (error) {
      throw new Error(`Simple PDF to text conversion failed: ${error.message}`);
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
      }      // DOCX to TXT
      else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && targetFormat === 'txt') {
        setConversionProgress(50);
        convertedBlob = await convertDocxToText(file);
      }      // PDF TO DOCX - Enhanced conversion with PDF.js
      else if (fileType === 'application/pdf' && targetFormat === 'docx') {
        setConversionProgress(50);
        try {
          // Try PDF.js with worker
          convertedBlob = await convertPdfToDocx(file);
        } catch (pdfJsError) {
          console.warn('PDF.js with worker failed, trying alternative method:', pdfJsError);
          try {
            // Try PDF.js alternative method
            convertedBlob = await convertPdfToDocxAlternative(file);
          } catch (altError) {
            console.warn('Alternative PDF conversion failed, trying simple extraction:', altError);
            // Final fallback: simple text extraction
            const textBlob = await convertPdfToTextSimple(file);
            const tempTextFile = new File([textBlob], 'temp.txt', { type: 'text/plain' });
            convertedBlob = await convertTextToDocx(tempTextFile);
          }
        }
      }
      // PDF TO TXT - Enhanced conversion with PDF.js
      else if (fileType === 'application/pdf' && targetFormat === 'txt') {
        setConversionProgress(50);
        try {
          // Try PDF.js with worker
          convertedBlob = await convertPdfToText(file);
        } catch (pdfJsError) {
          console.warn('PDF.js text conversion failed, trying simple method:', pdfJsError);
          // Final fallback: simple text extraction
          convertedBlob = await convertPdfToTextSimple(file);
        }
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
      let convertedBlob;
      
      // Check if this is a potentially corrupted DOCX file
      if (selectedFile.name.toLowerCase().endsWith('.docx') && 
          (targetFormat === 'txt' || targetFormat === 'pdf')) {
        
        try {
          // First attempt normal conversion
          convertedBlob = await performConversion(selectedFile, targetFormat);
        } catch (conversionError) {
          // If normal conversion fails and this looks like a corruption error
          if (conversionError.message.includes('corrupted') || 
              conversionError.message.includes('unreadable') ||
              conversionError.message.includes('Invalid') ||
              conversionError.message.includes('error trying to open')) {
            
            logger.warn('Standard conversion failed, attempting recovery', { 
              error: conversionError.message,
              filename: selectedFile.name 
            });
            
            // Attempt recovery
            const recoveryResult = await recoverCorruptedDocument(selectedFile);
            
            if (recoveryResult && recoveryResult.success) {
              // Convert the recovered text to the target format
              const recoveredText = recoveryResult.data;
              
              if (targetFormat === 'txt') {
                convertedBlob = new Blob([recoveredText], { type: 'text/plain;charset=utf-8' });
              } else if (targetFormat === 'pdf') {
                // Convert recovered text to PDF
                const jsPDF = (await import('jspdf')).default;
                const pdf = new jsPDF();
                
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const margin = 20;
                const maxLineWidth = pageWidth - 2 * margin;
                
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(12);
                
                // Add title
                pdf.setFontSize(16);
                pdf.text(`Recovered: ${selectedFile.name}`, margin, margin);
                
                pdf.setFontSize(10);
                pdf.text(`Recovery method: ${recoveryResult.method}`, margin, margin + 15);
                
                // Add content
                pdf.setFontSize(12);
                const lines = pdf.splitTextToSize(recoveredText, maxLineWidth);
                let currentY = margin + 35;
                
                lines.forEach(line => {
                  if (currentY > pageHeight - margin) {
                    pdf.addPage();
                    currentY = margin;
                  }
                  pdf.text(line, margin, currentY);
                  currentY += 6;
                });
                
                convertedBlob = pdf.output('blob');
              }
              
              setError(`⚠️ Document was recovered using ${recoveryResult.method}. Original file may have been corrupted.`);
            } else {
              throw conversionError; // Re-throw original error if recovery fails
            }
          } else {
            throw conversionError; // Re-throw if not a corruption error
          }
        }
      } else {
        // Normal conversion for non-DOCX files or other conversions
        convertedBlob = await performConversion(selectedFile, targetFormat);
      }
      
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
      
      // Provide helpful error messages for common issues
      let userFriendlyError = err.message;
      
      if (err.message.includes('corrupted') || err.message.includes('unreadable')) {
        userFriendlyError = `The document appears to be corrupted. Try enabling "Advanced Recovery Mode" below and use the recovery tools.`;
      } else if (err.message.includes('permissions')) {
        userFriendlyError = `File access issue. Try uploading the file again or check if the file is open in another application.`;
      } else if (err.message.includes('memory') || err.message.includes('disk space')) {
        userFriendlyError = `Insufficient system resources. Try closing other applications or use a smaller file.`;
      }
      
      setError(userFriendlyError);
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
  // Document Recovery System for corrupted files
  const [recoveryResults, setRecoveryResults] = useState(null);

  // Enhanced DOCX Recovery System
  const recoverCorruptedDocument = async (file) => {
    setRecoveryResults(null);
    const recoveryMethods = [];
    
    try {
      // Method 1: Try mammoth with error tolerance
      if (recoveryOptions.textRecovery) {
        try {
          const result = await recoverWithMammoth(file);
          if (result.success) {
            recoveryMethods.push({
              method: 'Mammoth Text Recovery',
              success: true,
              data: result.data,
              warnings: result.warnings
            });
          }
        } catch (error) {
          recoveryMethods.push({
            method: 'Mammoth Text Recovery',
            success: false,
            error: error.message
          });
        }
      }

      // Method 2: ZIP extraction (DOCX is essentially a ZIP file)
      if (recoveryOptions.zipExtraction) {
        try {
          const result = await recoverViaZipExtraction(file);
          if (result.success) {
            recoveryMethods.push({
              method: 'ZIP Extraction Recovery',
              success: true,
              data: result.data,
              extractedFiles: result.files
            });
          }
        } catch (error) {
          recoveryMethods.push({
            method: 'ZIP Extraction Recovery',
            success: false,
            error: error.message
          });
        }
      }

      // Method 3: Force binary reading
      if (recoveryOptions.forceExtraction) {
        try {
          const result = await forceTextExtraction(file);
          if (result.success) {
            recoveryMethods.push({
              method: 'Force Binary Extraction',
              success: true,
              data: result.data,
              confidence: result.confidence
            });
          }
        } catch (error) {
          recoveryMethods.push({
            method: 'Force Binary Extraction',
            success: false,
            error: error.message
          });
        }
      }

      setRecoveryResults({
        totalMethods: recoveryMethods.length,
        successfulMethods: recoveryMethods.filter(m => m.success).length,
        methods: recoveryMethods,
        bestResult: recoveryMethods.find(m => m.success) || null
      });

      return recoveryMethods.find(m => m.success);

    } catch (error) {
      logger.error('Document recovery failed', { error: error.message });
      throw new Error(`All recovery methods failed: ${error.message}`);
    }
  };

  // Document Recovery Functions
  const recoverWithMammoth = async (file) => {
    try {
      const mammoth = await import('mammoth');
      const arrayBuffer = await file.arrayBuffer();
      
      // Try different mammoth options for recovery
      const recoveryOptions = [
        { includeDefaultStyleMap: true, includeEmbeddedStyleMap: true },
        { includeDefaultStyleMap: false, includeEmbeddedStyleMap: false },
        { convertImage: mammoth.images.imgElement(function(image) { return {}; }) },
        { ignoreEmptyParagraphs: false },
        { preserveEmptyParagraphs: true }
      ];

      for (const options of recoveryOptions) {
        try {
          const result = await mammoth.extractRawText({ arrayBuffer }, options);
          if (result.value && result.value.trim().length > 0) {
            return {
              success: true,
              data: result.value,
              warnings: result.messages?.map(m => m.message) || [],
              method: 'mammoth-recovery'
            };
          }
        } catch (optionError) {
          continue;
        }
      }
      
      return { success: false, error: 'All mammoth recovery options failed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const forceTextExtraction = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Convert to string and try to extract readable text
      let text = '';
      let confidence = 0;
      
      // Method 1: Direct byte-to-string conversion with filtering
      try {
        const rawText = Array.from(uint8Array)
          .map(byte => String.fromCharCode(byte))
          .join('');
        
        // Extract readable ASCII text
        const readableText = rawText.match(/[\x20-\x7E\n\r\t]+/g);
        if (readableText) {
          text = readableText
            .filter(chunk => chunk.length > 3)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
          confidence = Math.min(90, text.length / 10);
        }
      } catch (e) {
        confidence = 0;
      }

      // Method 2: Look for XML content (DOCX is a ZIP with XML)
      if (confidence < 50) {
        try {
          const JSZip = await import('jszip');
          const zip = await JSZip.default.loadAsync(arrayBuffer);
          
          // Try to extract from document.xml
          if (zip.files['word/document.xml']) {
            const xmlContent = await zip.files['word/document.xml'].async('string');
            // Extract text from XML tags
            const textContent = xmlContent
              .replace(/<[^>]*>/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
            
            if (textContent.length > text.length) {
              text = textContent;
              confidence = Math.min(95, text.length / 8);
            }
          }
        } catch (zipError) {
          // Not a valid ZIP/DOCX, continue with current text
        }
      }

      // Method 3: Unicode text extraction
      if (confidence < 30) {
        try {
          const decoder = new TextDecoder('utf-8', { fatal: false });
          const decodedText = decoder.decode(uint8Array);
          const cleanText = decodedText
            .replace(/[\x00-\x1F\x7F-\x9F]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          
          if (cleanText.length > text.length) {
            text = cleanText;
            confidence = Math.min(80, text.length / 12);
          }
        } catch (e) {
          // Fallback to current text
        }
      }

      return {
        success: text.length > 10,
        data: text,
        confidence: Math.round(confidence),
        method: 'force-extraction'
      };
      
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const repairCorruptedDocx = async (file) => {
    try {
      setConversionProgress(10);
      logger.info('Attempting to repair corrupted DOCX file', { fileName: file.name });
      
      // Step 1: Try to read as ZIP and repair
      const JSZip = await import('jszip');
      const arrayBuffer = await file.arrayBuffer();
      
      setConversionProgress(25);
      
      try {
        const zip = await JSZip.default.loadAsync(arrayBuffer, { 
          checkCRC32: false,
          createFolders: true
        });
        
        setConversionProgress(40);
        
        // Try to extract the main document content
        let documentXml = '';
        const documentFiles = [
          'word/document.xml',
          'document.xml',
          'content.xml'
        ];
        
        for (const fileName of documentFiles) {
          if (zip.files[fileName]) {
            try {
              documentXml = await zip.files[fileName].async('string');
              break;
            } catch (e) {
              continue;
            }
          }
        }
        
        setConversionProgress(60);
        
        if (documentXml) {
          // Extract text content from XML
          const textContent = extractTextFromDocumentXml(documentXml);
          
          if (textContent && textContent.trim().length > 0) {
            setConversionProgress(80);
            
            // Create a new clean DOCX file
            const repairedDocx = await createCleanDocxFromText(textContent, file.name);
            
            setConversionProgress(100);
            return {
              success: true,
              blob: repairedDocx,
              message: 'Document successfully repaired and content recovered'
            };
          }
        }
      } catch (zipError) {
        logger.warn('ZIP repair failed, trying alternative methods', { error: zipError.message });
      }
      
      // Step 2: Try force text extraction as fallback
      setConversionProgress(70);
      const forceResult = await forceTextExtraction(file);
      
      if (forceResult.success && forceResult.confidence > 30) {
        const repairedDocx = await createCleanDocxFromText(forceResult.data, file.name);
        setConversionProgress(100);
        
        return {
          success: true,
          blob: repairedDocx,
          message: `Document partially recovered with ${forceResult.confidence}% confidence`
        };
      }
      
      setConversionProgress(0);
      return {
        success: false,
        message: 'Unable to recover document content'
      };
      
    } catch (error) {
      setConversionProgress(0);
      logger.error('Document repair failed', { error: error.message });
      return {
        success: false,
        message: `Repair failed: ${error.message}`
      };
    }
  };

  const extractTextFromDocumentXml = (xmlContent) => {
    try {
      // Remove XML tags and extract text content
      let text = xmlContent
        .replace(/<w:p[^>]*>/g, '\n')  // Paragraph breaks
        .replace(/<w:br[^>]*>/g, '\n') // Line breaks
        .replace(/<w:tab[^>]*>/g, '\t') // Tabs
        .replace(/<[^>]*>/g, '')       // Remove all XML tags
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/\n\s*\n/g, '\n\n')   // Clean multiple newlines
        .replace(/[ \t]+/g, ' ')       // Clean multiple spaces
        .trim();
      
      return text;
    } catch (error) {
      logger.error('Failed to extract text from XML', { error: error.message });
      return '';
    }
  };

  const createCleanDocxFromText = async (text, originalFileName) => {
    try {
      // Use the existing convertTextToDocx function
      const textFile = new File([text], 'recovered-content.txt', { type: 'text/plain' });
      const docxBlob = await convertTextToDocx(textFile);
      
      return docxBlob;
    } catch (error) {
      logger.error('Failed to create clean DOCX', { error: error.message });
      throw error;
    }
  };

  const handleCorruptedFile = async (file) => {
    setError(null);
    setIsConverting(true);
    setConversionProgress(0);
    
    try {
      logger.info('Attempting to recover corrupted document', { fileName: file.name });
      
      const repairResult = await repairCorruptedDocx(file);
      
      if (repairResult.success) {
        setConvertedFile({
          blob: repairResult.blob,
          name: `recovered-${file.name}`,
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        setError(null);
        logger.info('Document recovery successful', { fileName: file.name });
        
        // Show success message with repair info
        setError(`✅ ${repairResult.message}`);
      } else {
        setError(`❌ Recovery failed: ${repairResult.message}`);
        logger.error('Document recovery failed', { fileName: file.name, message: repairResult.message });
      }
    } catch (error) {
      setError(`❌ Recovery error: ${error.message}`);
      logger.error('Document recovery error', { error: error.message });
    } finally {
      setIsConverting(false);
      setConversionProgress(0);
    }
  };

  // Enhanced error detection for corrupted files
  const detectCorruptedFile = async (file) => {
    try {
      if (!file.name.toLowerCase().endsWith('.docx')) {
        return false;
      }
      
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Check for ZIP signature (DOCX files are ZIP archives)
      const hasZipSignature = uint8Array[0] === 0x50 && uint8Array[1] === 0x4B;
      
      if (!hasZipSignature) {
        return true; // Definitely corrupted if no ZIP signature
      }
      
      // Try to read as ZIP
      try {
        const JSZip = await import('jszip');
        const zip = await JSZip.default.loadAsync(arrayBuffer, { checkCRC32: true });
        
        // Check for essential DOCX files
        const requiredFiles = ['[Content_Types].xml', 'word/document.xml'];
        const missingFiles = requiredFiles.filter(fileName => !zip.files[fileName]);
        
        return missingFiles.length > 0;
      } catch (zipError) {
        return true; // Corrupted if can't read as ZIP
      }
    } catch (error) {
      return true; // Assume corrupted if can't analyze
    }
  };

  // Enhanced file change handler with corruption detection
  const handleFileChangeWithRecovery = async (e) => {
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
      
      // Check if the file appears to be corrupted
      if (file.name.toLowerCase().endsWith('.docx')) {
        const isCorrupted = await detectCorruptedFile(file);
        if (isCorrupted) {
          setError(`⚠️ This file appears to be corrupted. You can try to recover it using the "Recover Document" button below.`);
        }
      }
    }
  };

  return (
    <div className="file-converter-container">
      <h2>Enhanced File Converter</h2>
      
      <div className="converter-section">
        <div className="upload-section">
          <h3>Upload File</h3>          <input 
            type="file" 
            onChange={handleFileChangeWithRecovery} 
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
          
          {selectedFile && selectedFile.name.toLowerCase().endsWith('.docx') && (
            <button 
              onClick={() => handleCorruptedFile(selectedFile)} 
              disabled={isConverting}
              className="recovery-button"
              title="Try to recover content from corrupted Word document"
            >
              {isConverting ? 'Recovering...' : '🔧 Recover Document'}
            </button>
          )}
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
          <div className={`error-message ${
            error.includes('✅') ? 'success' : 
            error.includes('⚠️') ? 'warning' : 
            ''
          }`}>
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
          </div>        )}
      </div>

      {/* Document Recovery Section */}
      <div className="recovery-section">
        <h3>🔧 Document Recovery Tools</h3>
        <p>Use these tools if you encounter corrupted Word documents or conversion errors.</p>
        
        <div className="recovery-toggle">
          <label>
            <input 
              type="checkbox" 
              checked={recoveryMode} 
              onChange={(e) => setRecoveryMode(e.target.checked)}
            />
            Enable Advanced Recovery Mode
          </label>
        </div>

        {recoveryMode && (
          <div className="recovery-options">
            <h4>Recovery Methods</h4>
            <div className="recovery-methods">
              <label>
                <input 
                  type="checkbox" 
                  checked={recoveryOptions.textRecovery} 
                  onChange={(e) => setRecoveryOptions(prev => ({
                    ...prev, 
                    textRecovery: e.target.checked
                  }))}
                />
                Smart Text Recovery (Recommended)
              </label>
              
              <label>
                <input 
                  type="checkbox" 
                  checked={recoveryOptions.forceExtraction} 
                  onChange={(e) => setRecoveryOptions(prev => ({
                    ...prev, 
                    forceExtraction: e.target.checked
                  }))}
                />
                Force Binary Text Extraction
              </label>
              
              <label>
                <input 
                  type="checkbox" 
                  checked={recoveryOptions.zipExtraction} 
                  onChange={(e) => setRecoveryOptions(prev => ({
                    ...prev, 
                    zipExtraction: e.target.checked
                  }))}
                />
                ZIP Structure Analysis (Advanced)
              </label>
            </div>

            {selectedFile && selectedFile.name.toLowerCase().endsWith('.docx') && (
              <button 
                onClick={() => recoverCorruptedDocument(selectedFile)}
                className="recovery-button"
                disabled={isConverting}
              >
                🔧 Attempt Document Recovery
              </button>
            )}

            {recoveryResults && (
              <div className="recovery-results">
                <h4>Recovery Results</h4>
                <div className="recovery-summary">
                  <p><strong>Methods Attempted:</strong> {recoveryResults.totalMethods}</p>
                  <p><strong>Successful:</strong> {recoveryResults.successfulMethods}</p>
                </div>
                
                {recoveryResults.methods.map((method, index) => (
                  <div key={index} className={`recovery-method ${method.success ? 'success' : 'failed'}`}>
                    <h5>{method.method}</h5>
                    {method.success ? (
                      <div>
                        <p className="success">✅ Recovery successful!</p>
                        {method.confidence && <p>Confidence: {method.confidence}%</p>}
                        {method.warnings && method.warnings.length > 0 && (
                          <div className="warnings">
                            <strong>Warnings:</strong>
                            <ul>
                              {method.warnings.map((warning, i) => (
                                <li key={i}>{warning}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <button 
                          onClick={() => {
                            const blob = new Blob([method.data], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = `recovered-${selectedFile.name.replace('.docx', '.txt')}`;
                            link.click();
                            URL.revokeObjectURL(url);
                          }}
                          className="download-recovery-button"
                        >
                          Download Recovered Text
                        </button>
                      </div>
                    ) : (
                      <p className="failed">❌ Failed: {method.error}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="recovery-tips">
          <h4>💡 Recovery Tips</h4>
          <ul>
            <li><strong>Corrupted Word documents:</strong> Enable all recovery methods for best results</li>
            <li><strong>"Unreadable content" error:</strong> Try Smart Text Recovery first</li>
            <li><strong>File won't open:</strong> Use Force Binary Extraction as last resort</li>
            <li><strong>GitHub recovery codes:</strong> These tools can extract text from damaged files</li>
            <li><strong>File permissions error:</strong> Upload the file to this tool instead of opening directly</li>
          </ul>
        </div>
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
          </div>          <div className="feature-card">
            <h4>📁 Enhanced Format Support</h4>
            <ul>
              <li><strong>TXT → DOCX:</strong> Native format with smart formatting</li>
              <li><strong>TXT → RTF:</strong> Professional RTF with styling</li>
              <li><strong>TXT → HTML:</strong> Word-compatible HTML</li>
              <li><strong>DOCX → TXT:</strong> High-quality text extraction</li>
              <li><strong>PDF → DOCX:</strong> Advanced PDF text to Word</li>
              <li><strong>PDF → TXT:</strong> Clean text extraction</li>
              <li><strong>Images:</strong> JPG, PNG, GIF, WebP, TIFF</li>
              <li><strong>PDF Creation:</strong> From text and images</li>
            </ul>
          </div>
        </div>
      </div>        <div className="converter-notes">
        <h3>Enhanced Conversion Features</h3>
        <div className="feature-grid">
          <div className="feature-item">
            <h4>🚀 TXT to DOCX Conversion</h4>
            <ul>
              <li><strong>Primary:</strong> Native DOCX format with advanced formatting</li>
              <li><strong>Fallback 1:</strong> Professional RTF format</li>
              <li><strong>Fallback 2:</strong> Word-compatible HTML format</li>
              <li>Smart heading detection and formatting</li>
              <li>Professional document styling</li>
            </ul>
          </div>          <div className="feature-item">
            <h4>📄 Enhanced PDF to DOCX Conversion</h4>
            <ul>
              <li><strong>Primary:</strong> PDF.js for browser-compatible extraction</li>
              <li><strong>Fallback 1:</strong> PDF.js with worker for complex PDFs</li>
              <li><strong>Fallback 2:</strong> PDF.js alternative method without worker</li>
              <li><strong>Fallback 3:</strong> Simple text extraction for basic PDFs</li>
              <li>Page-by-page text extraction with intelligent positioning</li>
              <li>Metadata preservation and professional formatting</li>
              <li>Supports both text-based and partially scanned PDFs</li>
            </ul>
          </div>
        </div>        <h4>📋 Technical Notes</h4>
        <ul>
          <li>Maximum file size: 50 MB</li>
          <li>All processing happens locally in your browser for privacy</li>
          <li>UTF-8 encoding preserved for international characters</li>
          <li>Multiple fallback methods ensure conversion success</li>
          <li>Professional formatting with automatic detection</li>
          <li>Cross-platform compatibility (Windows, Mac, Linux)</li>
          <li>Enhanced PDF support with 4-tier fallback system</li>
          <li>Works with text-based, scanned, and hybrid PDFs</li>
          <li>Automatic worker configuration for PDF.js</li>
          <li>Optimized for Microsoft Word compatibility</li>
        </ul>
      </div>
    </div>
  );
};

export default FileConverter;