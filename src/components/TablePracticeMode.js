// Add a new component like TablePracticeMode.js
import React, { useState } from 'react';

const TablePracticeMode = () => {
  const [showAnswers, setShowAnswers] = useState(false);
  
  // Example of a pricing methods table
  const pricingTable = {
    headers: ["Kategoria", "Metodat", "Përshkrimi"],
    rows: [
      ["Bazuar në kosto", "Kosto plus fitim", "Shton një përqindje fitimi mbi kostot"],
      ["Bazuar në kosto", "Pikë kritike e rentabilitetit", "Niveli i shitjeve ku të hyrat barazohen me shpenzimet"],
      ["Bazuar në konkurrencë", "Çmimi i tregut", "Përdor çmimin mesatar të tregut"],
      // Add more rows...
    ]
  };
  
  return (
    <div className="table-practice-container">
      <h2>Praktikim i Tabelave</h2>
      
      <h3>Metodat e Llogaritjes së Çmimit</h3>
      <table className="practice-table">
        <thead>
          <tr>
            {pricingTable.headers.map(header => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {pricingTable.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={`${i}-${j}`}>
                  {j === 2 && !showAnswers ? '?' : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      <button onClick={() => setShowAnswers(!showAnswers)}>
        {showAnswers ? 'Fshih përgjigjet' : 'Trego përgjigjet'}
      </button>
    </div>
  );
};

export default TablePracticeMode;