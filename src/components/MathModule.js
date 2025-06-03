import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const MathModule = () => {
  const [activeChapter, setActiveChapter] = useState(1);
  
  const chapters = [
    {
      id: 1,
      title: "Përkufizime Bazë dhe Koncepte të Matricave",
      content: (
        <>
          <h3>Matrica Simetrike</h3>
          <p>Një matricë A ∈ ℝⁿˣⁿ quhet simetrike nëse A<sup>T</sup> = A. Kjo do të thotë që elementët e saj janë të vendosur në mënyrë të tillë që a<sub>ij</sub> = a<sub>ji</sub>.</p>
          
          <h4>Shembull:</h4>
          <BlockMath math={`A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 3 \\end{bmatrix}`} />
          
          <p>Kjo matricë është simetrike sepse a<sub>12</sub> = a<sub>21</sub> = 1.</p>
        </>
      )
    },
    {
      id: 2,
      title: "Eigenvlera dhe Eigenvektorë",
      content: (
        <>
          <h3>Vetivlerat dhe Vetivektorët</h3>
          <p>Për një matricë A, një vektor jo-zero v quhet vetivektor nëse:</p>
          <BlockMath math={`A\\mathbf{v} = \\lambda\\mathbf{v}`} />
          <p>ku λ është vetivlera përkatëse.</p>
          
          <h4>Veti të rëndësishme:</h4>
          <ul>
            <li>Çdo matricë simetrike ka vetëm vetivlera reale.</li>
            <li>Vetivektorët që korrespondojnë me vetivlera të ndryshme janë ortogonalë.</li>
          </ul>
        </>
      )
    },
    // Add more chapters following the same pattern
  ];
  
  return (
    <div className="math-module-container">
      <h2>Matricat Simetrike dhe Diagonalizimi Ortogonal</h2>
      
      <div className="chapter-navigation">
        {chapters.map(chapter => (
          <button
            key={chapter.id}
            className={activeChapter === chapter.id ? 'active' : ''}
            onClick={() => setActiveChapter(chapter.id)}
          >
            Kapitulli {chapter.id}
          </button>
        ))}
      </div>
      
      <div className="chapter-content">
        <h3>{chapters.find(c => c.id === activeChapter)?.title}</h3>
        {chapters.find(c => c.id === activeChapter)?.content}
      </div>
    </div>
  );
};

export default MathModule;