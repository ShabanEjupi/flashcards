import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import MatrixVisualization from './MatrixVisualization';

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
    {
      id: 3,
      title: "Teorema Spektrale dhe Matricat Simetrike",
      content: (
        <>
          <h3>Teorema Spektrale</h3>
          <p>Çdo matricë reale simetrike është ortogonalisht diagonalizueshme. Pra, nëse A është matricë simetrike, atëherë ekziston një matricë ortogonale P dhe një matricë diagonale D të tilla që:</p>
          <BlockMath math={`A = PDP^T`} />
          
          <h4>Kuptimi i Teoremës:</h4>
          <p>Kjo teoremë na tregon që çdo matricë simetrike mund të shprehet si:</p>
          <BlockMath math={`A = \\sum_{i=1}^{n} \\lambda_i \\mathbf{v}_i\\mathbf{v}_i^T`} />
          <p>ku λ<sub>i</sub> janë vlerat vetjake dhe v<sub>i</sub> janë vektorët vetjakë përkatës.</p>
          
          <h4>Ortogonaliteti i Vektorëve Vetjakë:</h4>
          <p>Vektorët vetjakë të një matrice simetrike që korrespondojnë me vlera të ndryshme vetjake janë ortogonalë me njëri-tjetrin.</p>
        </>
      )
    },
    {
      id: 4,
      title: "Diagonalizimi Ortogonal",
      content: (
        <>
          <h3>Procedura për Diagonalizim Ortogonal</h3>
          <p>Për një matricë simetrike A ∈ ℝⁿˣⁿ, procedura e diagonalizimit ortogonal përfshin:</p>
          <ol>
            <li>Gjetjen e vlerave vetjake (eigenvalues) λ të A duke zgjidhur ekuacionin <InlineMath math="det(A - \lambda I) = 0" />.</li>
            <li>Për secilën vlerë vetjake λ, gjejmë vektorët vetjakë përkatës duke zgjidhur <InlineMath math="(A - \lambda I)x = 0" />.</li>
            <li>Ortonormalizimin e vektorëve vetjakë për të ndërtuar matricën ortogonale P.</li>
            <li>Formimin e matricës diagonale D duke vendosur vlerat vetjake në diagonale.</li>
          </ol>
          
          <h4>Shembull i Thjeshtë:</h4>
          <p>Marrim matricën simetrike:</p>
          <BlockMath math={`A = \\begin{bmatrix} 4 & 1 \\\\ 1 & 4 \\end{bmatrix}`} />
          
          <p>1. Vlerat vetjake janë λ₁ = 5 dhe λ₂ = 3</p>
          <p>2. Vektorët vetjakë: v₁ = [1, 1]ᵀ dhe v₂ = [1, -1]ᵀ</p>
          <p>3. Normalizojmë: u₁ = [1/√2, 1/√2]ᵀ dhe u₂ = [1/√2, -1/√2]ᵀ</p>
          <p>4. Matrica P = [u₁ u₂] dhe D = diag(5, 3)</p>
        </>
      )
    },
    {
      id: 5,
      title: "Interpretimi Gjeometrik i Vektorëve Vetjakë",
      content: (
        <>
          <h3>Kuptimi Gjeometrik</h3>
          <p>Vektorët vetjakë të një matrice tregojnë drejtimet në hapësirë të cilat ruhen gjatë transformimit linear të përfaqësuar nga matrica (ndryshon vetëm gjatësia, jo drejtimi).</p>
          
          <h4>Vizualizimi i Vektorëve Vetjakë:</h4>
          <p>Matrica A = [[3, 1], [0, 2]] ka vlerat vetjake λ₁ = 3 dhe λ₂ = 2 me vektorë vetjakë v₁ = [1, 0]ᵀ dhe v₂ = [1, 1]ᵀ.</p>
          
          <div className="visualization-container">
            <p>Vëzhgoni se si drejtimi i secilit vektor vetjak ruhet pas transformimit:</p>
            <MatrixVisualization 
              matrix={[[3, 1], [0, 2]]} 
              vectors={[[1, 0], [1, 1]]} 
            />
          </div>
          
          <h4>Aplikime:</h4>
          <ul>
            <li>Në fizikë: vektorët vetjakë përfaqësojnë drejtimet ku një sistem qëndron në ekuilibër.</li>
            <li>Në analizën e të dhënave: përdoren për reduktimin e dimensionit (PCA).</li>
            <li>Në sistemet dinamike: tregojnë drejtimet e stabilitetit të sistemit.</li>
          </ul>
        </>
      )
    },
    {
      id: 6,
      title: "Reduktimi i Dimensionit dhe PCA",
      content: (
        <>
          <h3>Analiza e Komponentëve Kryesorë (PCA)</h3>
          <p>PCA është një teknikë që përdor diagonalizimin ortogonal të matricave të kovariancës për të reduktuar dimensionin e të dhënave duke ruajtur sa më shumë informacion.</p>
          
          <h4>Hapat e PCA:</h4>
          <ol>
            <li>Standardizimi i të dhënave (nëse kërkohet).</li>
            <li>Llogaritja e matricës së kovariancës.</li>
            <li>Gjetja e vlerave dhe vektorëve vetjakë të matricës së kovariancës.</li>
            <li>Renditja e vektorëve vetjakë sipas vlerave vetjake (në rendin zbritës).</li>
            <li>Projektime të dhënave në hapësirën e re me dimension më të ulët.</li>
          </ol>
          
          <h4>Interpretimi:</h4>
          <p>Komponentët kryesorë janë vektorët vetjakë të matricës së kovariancës, të renditur sipas vlerave vetjake përkatëse.</p>
          <p>Ata tregojnë drejtimet ku të dhënat kanë variancën më të madhe, duke lejuar kështu identifikimin e strukturave të rëndësishme në të dhëna.</p>
          
          <h4>Zbatimi:</h4>
          <p>PCA përdoret gjerësisht në:</p>
          <ul>
            <li>Kompresimin e imazheve</li>
            <li>Vizualizimin e të dhënave shumëdimensionale</li>
            <li>Reduktimin e zhurmës në të dhëna</li>
            <li>Paraprpunimin e të dhënave për algoritmet e mësimit të makinerisë</li>
          </ul>
        </>
      )
    }
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