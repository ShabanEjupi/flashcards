// Add a new component like TablePracticeMode.js
import React, { useState } from 'react';

const TablePracticeMode = () => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [userInputs, setUserInputs] = useState({
    row1: { eHyra: '', pkr: '', shpenzTotale: '', rezFinale: '' },
    row2: { eHyra: '', pkr: '', shpenzTotale: '', rezFinale: '' }
  });
  const [isChecked, setIsChecked] = useState(false);
  
  const correctAnswers = {
    row1: { eHyra: '480', pkr: '5', shpenzTotale: '360', rezFinale: '120' },
    row2: { eHyra: '400', pkr: '2.5', shpenzTotale: '280', rezFinale: '120' }
  };
  
  const handleInputChange = (row, field, value) => {
    setUserInputs(prev => ({
      ...prev,
      [row]: {
        ...prev[row],
        [field]: value
      }
    }));
    setIsChecked(false);
  };
  
  const checkAnswers = () => {
    setIsChecked(true);
  };
  
  const getInputClass = (row, field) => {
    if (!isChecked) return '';
    return userInputs[row][field] === correctAnswers[row][field] ? 'correct' : 'incorrect';
  };
  
  return (
    <div className="table-practice-container">
      <h2>Llogaritja e Çmimit dhe Rentabilitetit</h2>
      
      <div className="theory-section">
        <h3>Metodat e Llogaritjes së Çmimit</h3>
        <ul>
          <li><strong>Bazuar në kosto:</strong> Kosto plus fitim, pikë kritike e rentabilitetit</li>
          <li><strong>Bazuar në konkurrencë:</strong> Çmimi i tregut, çmimi i liderit</li>
          <li><strong>Bazuar në kërkesë:</strong> Çmimi psikologjik, çmimi i diferencuar</li>
        </ul>
        
        <h3>Formula të rëndësishme:</h3>
        <ul>
          <li>E hyra = Çmimi × Kërkesa</li>
          <li>PKR (Pika Kritike e Rentabilitetit) = Shpenzimet fikse ÷ (Çmimi - Kosto variabile për njësi)</li>
          <li>Shpenzimet totale = Shpenzimet fikse + (Kosto variabile × Kërkesa)</li>
          <li>Rezultati final = E hyra - Shpenzimet totale</li>
        </ul>
        
        <div className="problem-description">
          <h3>Detyrë:</h3>
          <p>Plotëso tabelën me vlerën e duhur duke përdorur formulat. Supozimet:</p>
          <ul>
            <li>Shpenzimet fikse = 200</li>
            <li>Kosto variabile për njësi = 20</li>
          </ul>
        </div>
      </div>
      
      <div className="table-practice">
        <table className="practice-table">
          <thead>
            <tr>
              <th>Çmimi për njësi</th>
              <th>Kërkesa</th>
              <th>E hyra</th>
              <th>PKR</th>
              <th>Shpenz totale</th>
              <th>Rez finale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>60</td>
              <td>8</td>
              <td>
                {showAnswers ? correctAnswers.row1.eHyra : (
                  <input 
                    type="text" 
                    value={userInputs.row1.eHyra} 
                    onChange={(e) => handleInputChange('row1', 'eHyra', e.target.value)}
                    className={getInputClass('row1', 'eHyra')}
                  />
                )}
              </td>
              <td>
                {showAnswers ? correctAnswers.row1.pkr : (
                  <input 
                    type="text" 
                    value={userInputs.row1.pkr} 
                    onChange={(e) => handleInputChange('row1', 'pkr', e.target.value)}
                    className={getInputClass('row1', 'pkr')}
                  />
                )}
              </td>
              <td>
                {showAnswers ? correctAnswers.row1.shpenzTotale : (
                  <input 
                    type="text" 
                    value={userInputs.row1.shpenzTotale} 
                    onChange={(e) => handleInputChange('row1', 'shpenzTotale', e.target.value)}
                    className={getInputClass('row1', 'shpenzTotale')}
                  />
                )}
              </td>
              <td>
                {showAnswers ? correctAnswers.row1.rezFinale : (
                  <input 
                    type="text" 
                    value={userInputs.row1.rezFinale} 
                    onChange={(e) => handleInputChange('row1', 'rezFinale', e.target.value)}
                    className={getInputClass('row1', 'rezFinale')}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>100</td>
              <td>4</td>
              <td>
                {showAnswers ? correctAnswers.row2.eHyra : (
                  <input 
                    type="text" 
                    value={userInputs.row2.eHyra} 
                    onChange={(e) => handleInputChange('row2', 'eHyra', e.target.value)}
                    className={getInputClass('row2', 'eHyra')}
                  />
                )}
              </td>
              <td>
                {showAnswers ? correctAnswers.row2.pkr : (
                  <input 
                    type="text" 
                    value={userInputs.row2.pkr} 
                    onChange={(e) => handleInputChange('row2', 'pkr', e.target.value)}
                    className={getInputClass('row2', 'pkr')}
                  />
                )}
              </td>
              <td>
                {showAnswers ? correctAnswers.row2.shpenzTotale : (
                  <input 
                    type="text" 
                    value={userInputs.row2.shpenzTotale} 
                    onChange={(e) => handleInputChange('row2', 'shpenzTotale', e.target.value)}
                    className={getInputClass('row2', 'shpenzTotale')}
                  />
                )}
              </td>
              <td>
                {showAnswers ? correctAnswers.row2.rezFinale : (
                  <input 
                    type="text" 
                    value={userInputs.row2.rezFinale} 
                    onChange={(e) => handleInputChange('row2', 'rezFinale', e.target.value)}
                    className={getInputClass('row2', 'rezFinale')}
                  />
                )}
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className="button-container">
          <button onClick={() => setShowAnswers(!showAnswers)}>
            {showAnswers ? 'Fshih përgjigjet' : 'Trego përgjigjet'}
          </button>
          {!showAnswers && (
            <button onClick={checkAnswers}>Kontrollo përgjigjet</button>
          )}
        </div>
        
        {isChecked && (
          <div className="feedback">
            {Object.entries(userInputs).every(([row, fields]) => 
              Object.entries(fields).every(([field, value]) => 
                value === correctAnswers[row][field]
              )
            ) ? (
              <p className="success-message">Të gjitha përgjigjet janë të sakta! Urime!</p>
            ) : (
              <p className="error-message">Disa përgjigje nuk janë të sakta. Provoni përsëri!</p>
            )}
          </div>
        )}
        
        <div className="calculation-hint">
          <h3>Ndihmë për llogaritjet:</h3>
          <ul>
            <li>Rreshti 1: E hyra = 60 × 8 = ?</li>
            <li>Rreshti 1: PKR = 200 ÷ (60 - 20) = ?</li>
            <li>Rreshti 1: Shpenz totale = 200 + (20 × 8) = ?</li>
            <li>Rreshti 1: Rez finale = ? - ?</li>
            <li>Rreshti 2: E hyra = 100 × 4 = ?</li>
            <li>Rreshti 2: PKR = 200 ÷ (100 - 20) = ?</li>
            <li>Rreshti 2: Shpenz totale = 200 + (20 × 4) = ?</li>
            <li>Rreshti 2: Rez finale = ? - ?</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TablePracticeMode;