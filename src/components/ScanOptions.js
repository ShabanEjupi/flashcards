import React from 'react';

const ScanOptions = ({ scanMode, setScanMode, disabled }) => {
  return (
    <div className="scan-options">
      <h4>Scan Options</h4>
      <div className="option-buttons">
        <button 
          className={`option-button ${scanMode === 'basic' ? 'active' : ''}`}
          onClick={() => setScanMode('basic')}
          disabled={disabled}
        >
          Basic Scan
        </button>
        <button 
          className={`option-button ${scanMode === 'deep' ? 'active' : ''}`}
          onClick={() => setScanMode('deep')}
          disabled={disabled}
        >
          Deep Scan
        </button>
        <button 
          className={`option-button ${scanMode === 'vuln' ? 'active' : ''}`}
          onClick={() => setScanMode('vuln')}
          disabled={disabled}
        >
          Vulnerability Scan
        </button>
      </div>
    </div>
  );
};

export default ScanOptions;