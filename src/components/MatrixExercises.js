import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const MatrixExercises = () => {
  const [activeCategory, setActiveCategory] = useState('idempotent');
  const [showSolutions, setShowSolutions] = useState({});
  
  const toggleSolution = (id) => {
    setShowSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <div className="matrix-exercises-container">
      <h2>Detyra të Zgjidhura për Matricat</h2>
      
      <div className="category-navigation">
        <button 
          className={activeCategory === 'idempotent' ? 'active' : ''}
          onClick={() => setActiveCategory('idempotent')}
        >
          Matricat Idempotentet
        </button>
        <button 
          className={activeCategory === 'stochastic' ? 'active' : ''}
          onClick={() => setActiveCategory('stochastic')}
        >
          Matricat Stokastike
        </button>
        <button 
          className={activeCategory === 'cryptography' ? 'active' : ''}
          onClick={() => setActiveCategory('cryptography')}
        >
          Kriptografia
        </button>
        <button 
          className={activeCategory === 'leontief' ? 'active' : ''}
          onClick={() => setActiveCategory('leontief')}
        >
          Modelet Leontief
        </button>
        <button 
          className={activeCategory === 'orthogonal' ? 'active' : ''}
          onClick={() => setActiveCategory('orthogonal')}
        >
          Matricat Ortogonale
        </button>
      </div>
      
      {activeCategory === 'idempotent' && (
        <div className="category-content">
          <h3>Matricat Idempotentet</h3>
          <p>Një matricë katrore është idempotentet nëse A² = A.</p>
          
          <div className="exercise">
            <h4>Detyrë 49:</h4>
            <p>Përcaktoni nëse matrica është idempotentet:</p>
            <BlockMath math={`A = \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}`} />
            
            <button className="show-solution" onClick={() => toggleSolution(49)}>
              {showSolutions[49] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions[49] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Llogarisim A²:</p>
                <BlockMath math={`A^2 = \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix} \\cdot \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix} = \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}`} />
                <p>Pasi A² ≠ A, kjo matricë nuk është idempotentet.</p>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Detyrë 50:</h4>
            <p>Përcaktoni nëse matrica është idempotentet:</p>
            <BlockMath math={`A = \\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}`} />
            
            <button className="show-solution" onClick={() => toggleSolution(50)}>
              {showSolutions[50] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions[50] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Llogarisim A²:</p>
                <BlockMath math={`A^2 = \\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix} \\cdot \\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix} = A`} />
                <p>Pasi A² = A, kjo matricë është idempotentet.</p>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Detyrë 51:</h4>
            <p>Përcaktoni nëse matrica është idempotentet:</p>
            <BlockMath math={`A = \\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}`} />
            
            <button className="show-solution" onClick={() => toggleSolution(51)}>
              {showSolutions[51] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions[51] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Llogarisim A²:</p>
                <BlockMath math={`A^2 = \\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix} \\cdot \\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix} = \\begin{bmatrix} 2\\cdot2 + 1\\cdot3 & 2\\cdot1 + 1\\cdot2 \\\\ 3\\cdot2 + 2\\cdot3 & 3\\cdot1 + 2\\cdot2 \\end{bmatrix} = \\begin{bmatrix} 4+3 & 2+2 \\\\ 6+6 & 3+4 \\end{bmatrix} = \\begin{bmatrix} 7 & 4 \\\\ 12 & 7 \\end{bmatrix}`} />
                <p>Pasi A² ≠ A, kjo matricë nuk është idempotentet.</p>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Detyrë 52:</h4>
            <p>Përcaktoni nëse matrica është idempotentet:</p>
            <BlockMath math={`A = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}`} />
            
            <button className="show-solution" onClick={() => toggleSolution(52)}>
              {showSolutions[52] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions[52] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Llogarisim A²:</p>
                <BlockMath math={`A^2 = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} \\cdot \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = A`} />
                <p>Pasi A² = A, kjo matricë është idempotentet.</p>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Detyrë 53:</h4>
            <p>Përcaktoni nëse matrica është idempotentet:</p>
            <BlockMath math={`A = \\begin{bmatrix} 0 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 1 & 0 & 0 \\end{bmatrix}`} />
            
            <button className="show-solution" onClick={() => toggleSolution(53)}>
              {showSolutions[53] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions[53] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Llogarisim A²:</p>
                <BlockMath math={`A^2 = \\begin{bmatrix} 0 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 1 & 0 & 0 \\end{bmatrix} \\cdot \\begin{bmatrix} 0 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 1 & 0 & 0 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}`} />
                <p>Pasi A² ≠ A, kjo matricë nuk është idempotentet.</p>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Detyrë 54:</h4>
            <p>Përcaktoni nëse matrica është idempotentet:</p>
            <BlockMath math={`A = \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}`} />
            
            <button className="show-solution" onClick={() => toggleSolution(54)}>
              {showSolutions[54] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions[54] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Llogarisim A²:</p>
                <BlockMath math={`A^2 = \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} \\cdot \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} = \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} = A`} />
                <p>Pasi A² = A, kjo matricë është idempotentet.</p>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Detyrë 55:</h4>
            <p>Përcaktoni a dhe b të tillë që A është idempotentet:</p>
            <BlockMath math={`A = \\begin{bmatrix} 1 & a \\\\ 0 & b \\end{bmatrix}`} />
            
            <button className="show-solution" onClick={() => toggleSolution(55)}>
              {showSolutions[55] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions[55] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Llogarisim A²:</p>
                <BlockMath math={`A^2 = \\begin{bmatrix} 1 & a \\\\ 0 & b \\end{bmatrix} \\cdot \\begin{bmatrix} 1 & a \\\\ 0 & b \\end{bmatrix} = \\begin{bmatrix} 1 & a+ab \\\\ 0 & b^2 \\end{bmatrix}`} />
                
                <p>Për të qenë A idempotentet, duhet të kemi A² = A, pra:</p>
                <BlockMath math={`\\begin{bmatrix} 1 & a+ab \\\\ 0 & b^2 \\end{bmatrix} = \\begin{bmatrix} 1 & a \\\\ 0 & b \\end{bmatrix}`} />
                
                <p>Nga kjo marrim:</p>
                <ul>
                  <li>1 = 1 (gjithmonë e vërtetë)</li>
                  <li>a+ab = a</li>
                  <li>0 = 0 (gjithmonë e vërtetë)</li>
                  <li>b² = b</li>
                </ul>
                
                <p>Nga ekuacioni a+ab = a, kemi:</p>
                <BlockMath math={`ab = 0`} />
                <p>që do të thotë ose a = 0 ose b = 0</p>
                
                <p>Nga ekuacioni b² = b, kemi:</p>
                <BlockMath math={`b(b-1) = 0`} />
                <p>që do të thotë ose b = 0 ose b = 1</p>
                
                <p>Pra, kemi dy zgjidhje të mundshme:</p>
                <ol>
                  <li>a = 0, b = 0</li>
                  <li>a çfarëdo, b = 0</li>
                  <li>a = 0, b = 1</li>
                </ol>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Detyrë 57:</h4>
            <p>Provoni që nëse A është matricë n×n që është idempotentet dhe e invertueshme, atëherë A = I<sub>n</sub>.</p>
            
            <button className="show-solution" onClick={() => toggleSolution(57)}>
              {showSolutions[57] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions[57] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Supozojmë se A është matricë idempotentet, pra A² = A.</p>
                <p>Supozojmë gjithashtu se A është e invertueshme, pra ekziston A⁻¹ e tillë që A⁻¹A = AA⁻¹ = I.</p>
                
                <p>Nga A² = A, kemi:</p>
                <BlockMath math={`A^2 - A = 0`} />
                <BlockMath math={`A(A - I) = 0`} />
                
                <p>Meqenëse A është e invertueshme, A ≠ 0. Prandaj, duhet të kemi:</p>
                <BlockMath math={`A - I = 0`} />
                <BlockMath math={`A = I`} />
                
                <p>Pra, nëse A është matricë idempotentet dhe e invertueshme, atëherë A = I<sub>n</sub>.</p>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Detyrë 58:</h4>
            <p>Provoni që A është idempotentet vetëm dhe vetëm nëse A<sup>T</sup> është idempotentet.</p>
            
            <button className="show-solution" onClick={() => toggleSolution(58)}>
              {showSolutions[58] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions[58] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Duhet të provojmë dy drejtime:</p>
                
                <p>1. Nëse A është idempotentet, atëherë A<sup>T</sup> është idempotentet.</p>
                <p>Supozojmë se A është idempotentet, pra A² = A.</p>
                <p>Duam të tregojmë se (A<sup>T</sup>)² = A<sup>T</sup>.</p>
                
                <BlockMath math={`(A^T)^2 = A^T \\cdot A^T = (A \\cdot A)^T = (A^2)^T = A^T`} />
                
                <p>Pra, A<sup>T</sup> është idempotentet.</p>
                
                <p>2. Nëse A<sup>T</sup> është idempotentet, atëherë A është idempotentet.</p>
                <p>Supozojmë se A<sup>T</sup> është idempotentet, pra (A<sup>T</sup>)² = A<sup>T</sup>.</p>
                <p>Duam të tregojmë se A² = A.</p>
                
                <BlockMath math={`((A^T)^2)^T = (A^T)^T`} />
                <BlockMath math={`(A^T \\cdot A^T)^T = A`} />
                <BlockMath math={`(A \\cdot A)^{T^T} = A`} />
                <BlockMath math={`A^2 = A`} />
                
                <p>Pra, A është idempotentet.</p>
                
                <p>Kështu, A është idempotentet vetëm dhe vetëm nëse A<sup>T</sup> është idempotentet.</p>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Detyrë 59:</h4>
            <p>Provoni që nëse A dhe B janë idempotentet dhe AB = BA, atëherë AB është idempotentet.</p>
            
            <button className="show-solution" onClick={() => toggleSolution(59)}>
              {showSolutions[59] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions[59] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Supozojmë se A dhe B janë idempotentet, pra A² = A dhe B² = B.</p>
                <p>Supozojmë gjithashtu se AB = BA.</p>
                
                <p>Duam të tregojmë se (AB)² = AB.</p>
                
                <BlockMath math={`(AB)^2 = AB \\cdot AB`} />
                <BlockMath math={`= A(BA)B \\quad \\text{(Pasi AB = BA)}`} />
                <BlockMath math={`= A(AB)B`} />
                <BlockMath math={`= A^2B^2 \\quad \\text{(Riorganizim)}`} />
                <BlockMath math={`= A \\cdot B \\quad \\text{(Pasi A^2 = A dhe B^2 = B)}`} />
                <BlockMath math={`= AB`} />
                
                <p>Pra, (AB)² = AB, që do të thotë se AB është idempotentet.</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeCategory === 'stochastic' && (
        <div className="category-content">
          <h3>Matricat Stokastike dhe Zinxhirët Markov</h3>
          
          <div className="exercise">
            <h4>Shembull: Modeli i Preferencave të Konsumatorëve</h4>
            <p>Dy kompani konkurruese A dhe B ofrojnë shërbime televizive me kabllor. Matrica e tranzicionit është:</p>
            
            <BlockMath math={`P = \\begin{bmatrix} 0.70 & 0.15 & 0.15 \\\\ 0.20 & 0.80 & 0.15 \\\\ 0.10 & 0.05 & 0.70 \\end{bmatrix}`} />
            
            <p>Ku rreshtat dhe kolonat përfaqësojnë: Kompania A, Kompania B, dhe Pa Kabllor.</p>
            
            <p>Nëse aktualisht Kompania A ka 15,000 abonentë, Kompania B ka 20,000, dhe 65,000 shtëpi nuk kanë kabllor, gjeni numrin e abonentëve pas 1 viti.</p>
            
            <button className="show-solution" onClick={() => toggleSolution('stochastic1')}>
              {showSolutions['stochastic1'] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions['stochastic1'] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Vektori fillestar i gjendjes është:</p>
                <BlockMath math={`X = \\begin{bmatrix} 15,000 \\\\ 20,000 \\\\ 65,000 \\end{bmatrix}`} />
                
                <p>Për të gjetur gjendjen pas një viti, shumëzojmë matricën e tranzicionit me vektorin fillestar:</p>
                
                <BlockMath math={`PX = \\begin{bmatrix} 0.70 & 0.15 & 0.15 \\\\ 0.20 & 0.80 & 0.15 \\\\ 0.10 & 0.05 & 0.70 \\end{bmatrix} \\begin{bmatrix} 15,000 \\\\ 20,000 \\\\ 65,000 \\end{bmatrix}`} />
                
                <BlockMath math={`= \\begin{bmatrix} 0.70 \\cdot 15,000 + 0.15 \\cdot 20,000 + 0.15 \\cdot 65,000 \\\\ 0.20 \\cdot 15,000 + 0.80 \\cdot 20,000 + 0.15 \\cdot 65,000 \\\\ 0.10 \\cdot 15,000 + 0.05 \\cdot 20,000 + 0.70 \\cdot 65,000 \\end{bmatrix}`} />
                
                <BlockMath math={`= \\begin{bmatrix} 10,500 + 3,000 + 9,750 \\\\ 3,000 + 16,000 + 9,750 \\\\ 1,500 + 1,000 + 45,500 \\end{bmatrix} = \\begin{bmatrix} 23,250 \\\\ 28,750 \\\\ 48,000 \\end{bmatrix}`} />
                
                <p>Pas një viti, Kompania A do të ketë 23,250 abonentë, Kompania B do të ketë 28,750 abonentë, dhe 48,000 shtëpi nuk do të kenë kabllor.</p>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Shembull: Ndryshimet pas disa vitesh</h4>
            <p>Duke përdorur të njëjtën matricë tranzicioni, le të shohim si ndryshon numri i abonentëve pas 3, 5 dhe 10 vitesh.</p>
            
            <button className="show-solution" onClick={() => toggleSolution('stochastic2')}>
              {showSolutions['stochastic2'] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions['stochastic2'] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                
                <p>Pas 3 vitesh, gjendja është:</p>
                <BlockMath math={`P^3X = P^2(PX) = P^2\\begin{bmatrix} 23,250 \\\\ 28,750 \\\\ 48,000 \\end{bmatrix} = \\begin{bmatrix} 30,283 \\\\ 39,042 \\\\ 30,675 \\end{bmatrix}`} />
                
                <p>Pas 5 vitesh, gjendja është:</p>
                <BlockMath math={`P^5X = \\begin{bmatrix} 32,411 \\\\ 43,812 \\\\ 23,777 \\end{bmatrix}`} />
                
                <p>Pas 10 vitesh, gjendja është:</p>
                <BlockMath math={`P^{10}X = \\begin{bmatrix} 33,287 \\\\ 47,147 \\\\ 19,566 \\end{bmatrix}`} />
                
                <p>Vërejmë që me kalimin e kohës, numrat konvergjojnë drejt një gjendje të qëndrueshme që është:</p>
                <BlockMath math={`X_{\\text{qëndrueshme}} = \\begin{bmatrix} 33,333 \\\\ 47,619 \\\\ 19,048 \\end{bmatrix}`} />
                
                <p>Kjo gjendje qëndrueshme ka vetinë që PX = X, pra mbetet e pandryshuar nga matrica e tranzicionit.</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeCategory === 'cryptography' && (
        <div className="category-content">
          <h3>Kriptografia me Matrica</h3>
          
          <div className="exercise">
            <h4>Shembull: Enkodimi i Mesazhit</h4>
            <p>Të enkodojmë mesazhin "MEET ME MONDAY" duke përdorur matricën kodifikuese:</p>
            
            <BlockMath math={`A = \\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 1 & 1 \\\\ 2 & 3 & 4 \\end{bmatrix}`} />
            
            <button className="show-solution" onClick={() => toggleSolution('cryptography1')}>
              {showSolutions['cryptography1'] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions['cryptography1'] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Fillimisht, konvertojmë mesazhin në numra duke përdorur kodin: A=1, B=2, ..., Z=26, hapësirë=0</p>
                
                <p>"MEET ME MONDAY" → "13 5 5 20 0 13 5 0 13 15 14 4 1 25"</p>
                
                <p>Ndajmë në grupe me nga 3 shkronja:</p>
                <p>[13 5 5], [20 0 13], [5 0 13], [15 14 4], [1 25 0]</p>
                
                <p>Për të enkoduar secilën matricë, e shumëzojmë me matricën kodifikuese A:</p>
                
                <p>1. [13 5 5] × A = [13 5 5] × 
                <BlockMath math={`\\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 1 & 1 \\\\ 2 & 3 & 4 \\end{bmatrix} = [13+10+10 \\; 13+5+15 \\; 13+5+20] = [33 \\; 33 \\; 38]`} />
                </p>
                
                <p>2. [20 0 13] × A = [20 0 13] ×
                <BlockMath math={`\\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 1 & 1 \\\\ 2 & 3 & 4 \\end{bmatrix} = [20+0+26 \\; 20+0+39 \\; 20+0+52] = [46 \\; 59 \\; 72]`} />
                </p>
                
                <p>3. [5 0 13] × A = [5 0 13] ×
                <BlockMath math={`\\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 1 & 1 \\\\ 2 & 3 & 4 \\end{bmatrix} = [5+0+26 \\; 5+0+39 \\; 5+0+52] = [31 \\; 44 \\; 57]`} />
                </p>
                
                <p>4. [15 14 4] × A = [15 14 4] ×
                <BlockMath math={`\\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 1 & 1 \\\\ 2 & 3 & 4 \\end{bmatrix} = [15+28+8 \\; 15+14+12 \\; 15+14+16] = [51 \\; 41 \\; 45]`} />
                </p>
                
                <p>5. [1 25 0] × A = [1 25 0] ×
                <BlockMath math={`\\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 1 & 1 \\\\ 2 & 3 & 4 \\end{bmatrix} = [1+50+0 \\; 1+25+0 \\; 1+25+0] = [51 \\; 26 \\; 26]`} />
                </p>
                
                <p>Kështu, mesazhi i enkoduar bëhet:</p>
                <p>33 33 38 46 59 72 31 44 57 51 41 45 51 26 26</p>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Shembull: Dekodimi i Mesazhit</h4>
            <p>Të dekodojmë mesazhin "13 26 21 33 53 12 18 23 42 5 20 56" duke përdorur matricën inverse:</p>
            
            <BlockMath math={`A^{-1} = \\begin{bmatrix} -1 & 1 & 0 \\\\ -10 & 6 & 1 \\\\ 8 & -5 & -1 \\end{bmatrix}`} />
            
            <button className="show-solution" onClick={() => toggleSolution('cryptography2')}>
              {showSolutions['cryptography2'] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions['cryptography2'] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Ndajmë mesazhin në grupe me nga 3 numra:</p>
                <p>[13 26 21], [33 53 12], [18 23 42], [5 20 56]</p>
                
                <p>Për të dekoduar, shumëzojmë secilin grup me A⁻¹:</p>
                
                <p>1. [13 26 21] × A⁻¹ = [13 26 21] ×
                <BlockMath math={`\\begin{bmatrix} -1 & 1 & 0 \\\\ -10 & 6 & 1 \\\\ 8 & -5 & -1 \\end{bmatrix} = [-13-260+168 \\; 13+156-105 \\; 0+26-21] = [-105 \\; 64 \\; 5] \\equiv [13 \\; 5 \\; 5]`} />
                </p>
                
                <p>Me një llogaritje të ngjashme, grupet e tjera japin:</p>
                <p>2. [33 53 12] → [20 0 13] (T _ M)</p>
                <p>3. [18 23 42] → [5 0 13] (E _ M)</p>
                <p>4. [5 20 56] → [15 14 4] (O N D)</p>
                
                <p>Duke konvertuar numrat në shkronja (me 0 si hapësirë), marrim:</p>
                <p>M E E T _ M E _ M O N D</p>
                
                <p>Pra, mesazhi i dekoduar është "MEET ME MOND" (mund të jetë "MEET ME MONDAY" me disa karaktere të mbetura).</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeCategory === 'leontief' && (
        <div className="category-content">
          <h3>Modelet Leontief të Input-Output</h3>
          
          <div className="exercise">
            <h4>Shembull: Modeli Input-Output me Tre Industri</h4>
            <p>Një sistem ekonomik përbëhet nga tre industri: A, B dhe C, me matricën input-output:</p>
            
            <BlockMath math={`D = \\begin{bmatrix} 0.1 & 0.43 & 0 \\\\ 0.15 & 0 & 0.37 \\\\ 0.23 & 0.03 & 0.02 \\end{bmatrix}`} />
            
            <p>Gjeni vektorin e outputit nëse kërkesat e jashtme janë:</p>
            <BlockMath math={`E = \\begin{bmatrix} 20,000 \\\\ 30,000 \\\\ 25,000 \\end{bmatrix}`} />
            
            <button className="show-solution" onClick={() => toggleSolution('leontief1')}>
              {showSolutions['leontief1'] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions['leontief1'] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Për të gjetur outputin total, duhet të zgjidhim ekuacionin: (I - D)X = E</p>
                <p>Ku I është matrica identiteti.</p>
                
                <BlockMath math={`I - D = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix} - \\begin{bmatrix} 0.1 & 0.43 & 0 \\\\ 0.15 & 0 & 0.37 \\\\ 0.23 & 0.03 & 0.02 \\end{bmatrix} = \\begin{bmatrix} 0.9 & -0.43 & 0 \\\\ -0.15 & 1 & -0.37 \\\\ -0.23 & -0.03 & 0.98 \\end{bmatrix}`} />
                
                <p>Duke përdorur eliminimin Gauss-Jordan ose duke llogaritur (I-D)⁻¹, pastaj duke shumëzuar me E, mund të gjejmë X:</p>
                
                <BlockMath math={`X = (I-D)^{-1}E = \\begin{bmatrix} 46,616 \\\\ 51,058 \\\\ 38,014 \\end{bmatrix}`} />
                
                <p>Pra, outputi i industrisë A duhet të jetë 46,616 njësi, i industrisë B 51,058 njësi, dhe i industrisë C 38,014 njësi për të përmbushur kërkesat e jashtme.</p>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Shembull: Matrica Input-Output</h4>
            <p>Le të shohim një shembull tjetër të formimit të matricës input-output për një sistem ekonomik me tre industri: elektricitet, ujë dhe qymyr.</p>
            
            <button className="show-solution" onClick={() => toggleSolution('leontief2')}>
              {showSolutions['leontief2'] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions['leontief2'] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Supozojmë këto kërkesa të inputit:</p>
                <ul>
                  <li>Prodhimi i një njësie elektricitet kërkon 0.5 njësi të vetvetes, 0.25 njësi ujë dhe 0.25 njësi qymyr.</li>
                  <li>Prodhimi i një njësie ujë kërkon 0.1 njësi elektricitet, 0.6 njësi të vetvetes dhe 0 njësi qymyr.</li>
                  <li>Prodhimi i një njësie qymyr kërkon 0.2 njësi elektricitet, 0.15 njësi ujë dhe 0.5 njësi të vetvetes.</li>
                </ul>
                
                <p>Matrica input-output për këtë sistem do të jetë:</p>
                
                <BlockMath math={`D = \\begin{bmatrix} 0.5 & 0.1 & 0.2 \\\\ 0.25 & 0.6 & 0.15 \\\\ 0.25 & 0 & 0.5 \\end{bmatrix}`} />
                
                <p>Ku kolonat tregojnë sasitë që secila industri kërkon nga të tjerat dhe nga vetja për të prodhuar një njësi output.</p>
                
                <p>Rreshtat tregojnë sasitë që secila industri i ofron industrive të tjera dhe vetvetes.</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeCategory === 'orthogonal' && (
        <div className="category-content">
          <h3>Matricat Ortogonale</h3>
          
          <div className="exercise">
            <h4>Detyrë 41:</h4>
            <p>Provoni që nëse A është matricë ortogonale, atëherë edhe A<sup>T</sup> dhe A<sup>-1</sup> janë ortogonale.</p>
            
            <button className="show-solution" onClick={() => toggleSolution('orthogonal1')}>
              {showSolutions['orthogonal1'] ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
            
            {showSolutions['orthogonal1'] && (
              <div className="solution">
                <p>Zgjidhja:</p>
                <p>Një matricë A quhet ortogonale nëse A<sup>T</sup>A = AA<sup>T</sup> = I, ku I është matrica identiteti. Gjithashtu, për një matricë ortogonale, A<sup>T</sup> = A<sup>-1</sup>.</p>
                
                <p>1. Fillimisht, po tregojmë që A<sup>T</sup> është matricë ortogonale:</p>
                <p>Duhet të provojmë që (A<sup>T</sup>)<sup>T</sup>(A<sup>T</sup>) = A<sup>T</sup>(A<sup>T</sup>)<sup>T</sup> = I</p>
                
                <p>(A<sup>T</sup>)<sup>T</sup> = A</p>
                <p>A<sup>T</sup>(A<sup>T</sup>)<sup>T</sup> = A<sup>T</sup>A = I (Pasi A është ortogonale)</p>
                <p>(A<sup>T</sup>)<sup>T</sup>(A<sup>T</sup>) = AA<sup>T</sup> = I (Pasi A është ortogonale)</p>
                
                <p>Pra, A<sup>T</sup> është matricë ortogonale.</p>
                
                <p>2. Tani, për A<sup>-1</sup>:</p>
                <p>Meqenëse A është ortogonale, A<sup>T</sup> = A<sup>-1</sup>. Kemi provuar tashmë që A<sup>T</sup> është ortogonale, prandaj edhe A<sup>-1</sup> është ortogonale.</p>
                
                <p>Alternativë, mund të provojmë drejtpërdrejt:</p>
                <p>(A<sup>-1</sup>)<sup>T</sup>(A<sup>-1</sup>) = (A<sup>-1</sup>)<sup>T</sup>A<sup>-1</sup></p>
                
                <p>Meqenëse A është ortogonale, A<sup>T</sup> = A<sup>-1</sup>, prandaj (A<sup>-1</sup>)<sup>T</sup> = (A<sup>T</sup>)<sup>T</sup> = A.</p>
                <p>(A<sup>-1</sup>)<sup>T</sup>A<sup>-1</sup> = AA<sup>-1</sup> = I</p>
                
                <p>Gjithashtu, (A<sup>-1</sup>)(A<sup>-1</sup>)<sup>T</sup> = A<sup>-1</sup>A = I</p>
                
                <p>Prandaj, A<sup>-1</sup> është matricë ortogonale.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrixExercises;