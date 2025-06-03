import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import MatrixVisualization from './MatrixVisualization';

const MathModule = () => {
  const [activeChapter, setActiveChapter] = useState(1);
  const [showSolutions, setShowSolutions] = useState({});
  
  const toggleSolution = (exerciseId) => {
    setShowSolutions(prev => ({ ...prev, [exerciseId]: !prev[exerciseId] }));
  };
  
  const chapters = [
    {
      id: 1,
      title: "Matricat Stokastike dhe Zinxhirët Markov",
      content: (
        <>
          <h3>Çfarë janë Matricat Stokastike?</h3>
          <p>Një matricë katrore <InlineMath math="P" /> quhet <strong>stokastike</strong> nëse:</p>
          <ul>
            <li>Të gjitha elementët e saj janë numra jo-negativë (<InlineMath math="p_{ij} \geq 0" /> për çdo <InlineMath math="i,j" />)</li>
            <li>Shuma e elementëve në çdo kolonë është 1 (<InlineMath math="\sum_{i=1}^{n} p_{i1} = \sum_{i=1}^{n} p_{i2} = \ldots = \sum_{i=1}^{n} p_{in} = 1" />)</li>
          </ul>
          
          <h4>Shembull i një matrice stokastike:</h4>
          <BlockMath math={`P = \\begin{bmatrix} 0.7 & 0.15 & 0.15 \\\\ 0.2 & 0.8 & 0.15 \\\\ 0.1 & 0.05 & 0.7 \\end{bmatrix}`} />
          
          <p>Vëreni që shuma e çdo kolone është 1:</p>
          <BlockMath math={`0.7 + 0.2 + 0.1 = 1 \\quad 0.15 + 0.8 + 0.05 = 1 \\quad 0.15 + 0.15 + 0.7 = 1`} />
          
          <h3>Aplikime në Zinxhirët Markov</h3>
          <p>Matricat stokastike përdoren shpesh për të modeluar probabilitetet e kalimit në zinxhirët Markov. Për shembull, në një sistem me 3 gjendje (A, B, C), matrica P tregon probabilitetin e kalimit nga një gjendje në tjetrën.</p>
          
          <div className="example-box">
            <h4>Shembull i modelit të preferencave të konsumatorëve:</h4>
            <p>Dy kompani konkurruese ofrojnë shërbime televizive me kabllor. Çdo vit, disa abonentë ndërrojnë nga një kompani në tjetrën ose heqin dorë nga shërbimi. Matrica e probabiliteteve të tranzicionit është:</p>
            
            <BlockMath math={`P = \\begin{bmatrix} 0.70 & 0.15 & 0.15 \\\\ 0.20 & 0.80 & 0.15 \\\\ 0.10 & 0.05 & 0.70 \\end{bmatrix}`} />
            
            <p>Ku rreshtat dhe kolonat përfaqësojnë: Kompania A, Kompania B, dhe Pa Kabllor.</p>
            
            <p>Nëse aktualisht Kompania A ka 15,000 abonentë, Kompania B ka 20,000, dhe 65,000 shtëpi nuk kanë kabllor, atëherë pas një viti kemi:</p>
            
            <BlockMath math={`PX = \\begin{bmatrix} 0.70 & 0.15 & 0.15 \\\\ 0.20 & 0.80 & 0.15 \\\\ 0.10 & 0.05 & 0.70 \\end{bmatrix} \\begin{bmatrix} 15,000 \\\\ 20,000 \\\\ 65,000 \\end{bmatrix} = \\begin{bmatrix} 23,250 \\\\ 28,750 \\\\ 48,000 \\end{bmatrix}`} />
            
            <p>Kjo do të thotë që pas një viti, Kompania A do të ketë 23,250 abonentë dhe Kompania B do të ketë 28,750.</p>
          </div>
          
          <h4>Gjendja e qëndrueshme (Steady State)</h4>
          <p>Një vetëvektor <InlineMath math="X" /> i matricës stokastike <InlineMath math="P" /> me vetëvlerë 1 përfaqëson një <strong>gjendje të qëndrueshme</strong>, ku:</p>
          <BlockMath math={`PX = X`} />
          <p>Kjo do të thotë që pas shumë kalimesh, sistemi arrin një ekuilibër ku proporcionet relative të gjendjes nuk ndryshojnë më.</p>
        </>
      )
    },
    {
      id: 2,
      title: "Kriptografia me Matrica",
      content: (
        <>
          <h3>Kodimi dhe Dekodimi me Matrica</h3>
          <p>Matricat mund të përdoren për të koduar dhe dekoduar mesazhe duke përdorur shumëzimin e matricave.</p>
          
          <h4>Hapat e kodimit:</h4>
          <ol>
            <li>Cakto çdo shkronjë të alfabetit një numër (A=1, B=2, ..., Z=26, hapësirë=0)</li>
            <li>Ndaj mesazhin në grupe me n shkronja për të formuar matricat e rreshtave të pakoduar</li>
            <li>Zgjidh një matricë invertible <InlineMath math="A" /> të rendit <InlineMath math="n \times n" /></li>
            <li>Shumëzo matricat e rreshtave të pakoduar me <InlineMath math="A" /> për të gjeneruar matricat e rreshtave të koduar</li>
          </ol>
          
          <div className="example-box">
            <h4>Shembull i kodimit:</h4>
            <p>Të kodojmë mesazhin "MEET ME":</p>
            <p>1. Konvertojmë në numra: M=13, E=5, T=20, hapësirë=0, M=13, E=5</p>
            <p>2. Ndajmë në grupe me 3 shkronja: [13 5 5] dhe [20 0 13]</p>
            <p>3. Zgjedhim matricën kodifikuese:</p>
            
            <BlockMath math={`A = \\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 1 & 1 \\\\ 2 & 3 & 4 \\end{bmatrix}`} />
            
            <p>4. Shumëzojmë matricat e rreshtave me matricën A:</p>
            
            <BlockMath math={`\\begin{bmatrix} 13 & 5 & 5 \\end{bmatrix} \\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 1 & 1 \\\\ 2 & 3 & 4 \\end{bmatrix} = \\begin{bmatrix} 13 + 10 + 10 & 13 + 5 + 15 & 13 + 5 + 20 \\end{bmatrix} = \\begin{bmatrix} 33 & 33 & 38 \\end{bmatrix}`} />
            
            <BlockMath math={`\\begin{bmatrix} 20 & 0 & 13 \\end{bmatrix} \\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 1 & 1 \\\\ 2 & 3 & 4 \\end{bmatrix} = \\begin{bmatrix} 20 + 0 + 26 & 20 + 0 + 39 & 20 + 0 + 52 \\end{bmatrix} = \\begin{bmatrix} 46 & 59 & 72 \\end{bmatrix}`} />
            
            <p>Kështu, mesazhi i koduar bëhet: [33 33 38] [46 59 72]</p>
          </div>
          
          <h4>Hapat e dekodimit:</h4>
          <ol>
            <li>Për të dekoduar, pranuesit i duhet të dijë matricën <InlineMath math="A" /></li>
            <li>Llogarit <InlineMath math="A^{-1}" /> duke përdorur eliminimin Gauss-Jordan</li>
            <li>Shumëzo matricat e koduara me <InlineMath math="A^{-1}" /> për të rikuperuar matricat origjinale</li>
            <li>Konverto numrat përsëri në shkronja</li>
          </ol>
          
          <div className="example-box">
            <h4>Shembull i dekodimit:</h4>
            <p>Të dekodojmë mesazhin [33 33 38] [46 59 72]:</p>
            <p>1. Duke përdorur eliminimin Gauss-Jordan, gjejmë <InlineMath math="A^{-1}" />:</p>
            
            <BlockMath math={`A^{-1} = \\begin{bmatrix} -1 & 1 & 0 \\\\ -10 & 6 & 1 \\\\ 8 & -5 & -1 \\end{bmatrix}`} />
            
            <p>2. Shumëzojmë matricat e koduara me <InlineMath math="A^{-1}" />:</p>
            
            <BlockMath math={`\\begin{bmatrix} 33 & 33 & 38 \\end{bmatrix} \\begin{bmatrix} -1 & 1 & 0 \\\\ -10 & 6 & 1 \\\\ 8 & -5 & -1 \\end{bmatrix} = \\begin{bmatrix} 13 & 5 & 5 \\end{bmatrix}`} />
            
            <p>3. Konvertojmë numrat në shkronja: 13=M, 5=E, 5=E</p>
            
            <p>Në mënyrë të ngjashme, për matricën e dytë të koduar, do të merrnim [20 0 13], që konvertohet në "T_M".</p>
            
            <p>Kështu, mesazhi i dekoduar është "MEET ME".</p>
          </div>
        </>
      )
    },
    {
      id: 3,
      title: "Modelet Leontief të Input-Output",
      content: (
        <>
          <h3>Modeli Ekonomik Input-Output</h3>
          <p>Wassily W. Leontief zhvilloi modelin input-output për të analizuar marrëdhëniet ndërmjet sektorëve të ndryshëm ekonomikë. Për këtë arritje, ai u nderua me çmimin Nobel në ekonomi në vitin 1973.</p>
          
          <h4>Konceptet themelore:</h4>
          <p>Supozojmë një sistem ekonomik me n industri të ndryshme, secila me nevoja inputi dhe output. Çdo industri përdor outputet e industrive të tjera, përfshirë veten, për të prodhuar produktet e veta.</p>
          
          <p>Le të jetë <InlineMath math="d_{ij}" /> sasia e outputit që industria i-të ka nevojë nga industria j-të për të prodhuar një njësi outputi në vit. Matrica e këtyre koeficientëve quhet <strong>matrica input-output</strong>.</p>
          
          <BlockMath math={`D = \\begin{bmatrix} d_{11} & d_{12} & \\cdots & d_{1n} \\\\ d_{21} & d_{22} & \\cdots & d_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ d_{n1} & d_{n2} & \\cdots & d_{nn} \\end{bmatrix}`} />
          
          <div className="example-box">
            <h4>Shembull i një matrice input-output:</h4>
            <p>Konsiderojmë një sistem ekonomik me tre industri: elektricitet (E), ujë (W) dhe qymyr (C).</p>
            
            <BlockMath math={`D = \\begin{bmatrix} 0.5 & 0.1 & 0.2 \\\\ 0.25 & 0.6 & 0.15 \\\\ 0.25 & 0 & 0.5 \\end{bmatrix}`} />
            
            <p>Kjo matricë tregon, për shembull, që prodhimi i një njësie elektricitet kërkon 0.5 njësi nga vetë industria e elektricitetit, 0.25 njësi ujë dhe 0.25 njësi qymyr.</p>
          </div>
          
          <h3>Sisteme të Mbyllura dhe të Hapura</h3>
          <p>Për një sistem të mbyllur (që shet produkte vetëm brenda sistemit), outputi total i industrisë i-të jepet nga ekuacioni:</p>
          
          <BlockMath math={`x_i = d_{i1}x_1 + d_{i2}x_2 + \\cdots + d_{in}x_n`} />
          
          <p>Për një sistem të hapur (që shet produkte edhe jashtë sistemit), outputi total i industrisë i-të jepet nga:</p>
          
          <BlockMath math={`x_i = d_{i1}x_1 + d_{i2}x_2 + \\cdots + d_{in}x_n + e_i`} />
          
          <p>ku <InlineMath math="e_i" /> përfaqëson kërkesën e jashtme për produktin e industrisë i-të.</p>
          
          <p>Në formë matricore, sistemi i ekuacioneve për një sistem të hapur shkruhet:</p>
          
          <BlockMath math={`X = DX + E`} />
          
          <p>ose</p>
          
          <BlockMath math={`(I - D)X = E`} />
          
          <p>ku <InlineMath math="I" /> është matrica identiteti, <InlineMath math="X" /> është matrica e outputit total dhe <InlineMath math="E" /> është matrica e kërkesës së jashtme.</p>
          
          <div className="example-box">
            <h4>Shembull i zgjidhjes për matricën e outputit:</h4>
            <p>Për një sistem ekonomik me tre industri (A, B, C) dhe matricë input-output:</p>
            
            <BlockMath math={`D = \\begin{bmatrix} 0.1 & 0.43 & 0 \\\\ 0.15 & 0 & 0.37 \\\\ 0.23 & 0.03 & 0.02 \\end{bmatrix}`} />
            
            <p>Nëse kërkesat e jashtme janë <InlineMath math="E = [20000, 30000, 25000]^T" />, atëherë për të gjetur outputin total zgjidhim:</p>
            
            <BlockMath math={`(I - D)X = E`} />
            
            <p>Duke përdorur eliminimin Gauss-Jordan, gjejmë matricën e outputit:</p>
            
            <BlockMath math={`X = \\begin{bmatrix} 46616 \\\\ 51058 \\\\ 38014 \\end{bmatrix}`} />
            
            <p>Kjo do të thotë që Industria A duhet të prodhojë 46,616 njësi, Industria B 51,058 njësi dhe Industria C 38,014 njësi për të përmbushur kërkesën e jashtme.</p>
          </div>
        </>
      )
    },
    {
      id: 4,
      title: "Matrica Idempotentet dhe Vetitë e Tyre",
      content: (
        <>
          <h3>Matricat Idempotentet</h3>
          <p>Një matricë katrore <InlineMath math="A" /> quhet <strong>idempotentet</strong> nëse <InlineMath math="A^2 = A" />.</p>
          
          <h4>Shembuj të matricave idempotentet:</h4>
          <div className="examples-grid">
            <div>
              <p>Matrica identiteti:</p>
              <BlockMath math={`I = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}`} />
              <p><InlineMath math="I^2 = I" /></p>
            </div>
            <div>
              <p>Matrica zero:</p>
              <BlockMath math={`0 = \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}`} />
              <p><InlineMath math="0^2 = 0" /></p>
            </div>
            <div>
              <p>Matrica projektuese:</p>
              <BlockMath math={`P = \\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}`} />
              <p><InlineMath math="P^2 = P" /></p>
            </div>
          </div>
          
          <h3>Vetitë e Matricave Idempotentet</h3>
          <ol>
            <li>Nëse <InlineMath math="A" /> është idempotentet, atëherë edhe <InlineMath math="I - A" /> është idempotentet:
              <BlockMath math={`(I-A)^2 = I - 2A + A^2 = I - 2A + A = I - A`} />
            </li>
            <li>Nëse <InlineMath math="A" /> është idempotentet dhe <InlineMath math="AB = BA" />, atëherë <InlineMath math="AB" /> është idempotentet:
              <BlockMath math={`(AB)^2 = ABAB = A(BA)B = A(AB)B = A^2B^2 = AB`} />
            </li>
            <li>Nëse <InlineMath math="A" /> është idempotentet dhe invertible, atëherë <InlineMath math="A = I" />:
              <BlockMath math={`A^2 = A \\implies A = I`} />
            </li>
            <li><InlineMath math="A" /> është idempotentet vetëm dhe vetëm nëse <InlineMath math="A^T" /> është idempotentet:
              <BlockMath math={`(A^T)^2 = (A^2)^T = A^T`} />
            </li>
          </ol>
          
          <h3>Aplikime të Matricave Idempotentet</h3>
          <ul>
            <li>Projeksione në hapësira vektoriale</li>
            <li>Transformime lineare që përsërisin vetveten</li>
            <li>Sisteme dinamike që arrijnë ekuilibër pas një cikli</li>
            <li>Statistikë dhe analiza regresioni</li>
          </ul>
          
          <div className="example-box">
            <h4>Shembull i një aplikimi:</h4>
            <p>Në regresionin linear, matrica "hat matrix" <InlineMath math="H = X(X^TX)^{-1}X^T" /> është idempotentet dhe përdoret për të projektuar vektorin e vlerave të vëzhguara në hapësirën e vlerave të parashikuara.</p>
          </div>
          
          <div className="exercises-section">
            <h3>Detyra për Zgjidhje</h3>
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
            
            {/* Vazhdoni me detyrat e tjera në të njëjtën mënyrë */}
          </div>
        </>
      )
    },
    {
      id: 5,
      title: "Matricat Ortogonale dhe Transformimet",
      content: (
        <>
          <h3>Matricat Ortogonale</h3>
          <p>Një matricë <InlineMath math="A" /> quhet <strong>ortogonale</strong> nëse <InlineMath math="A^TA = AA^T = I" />, që do të thotë <InlineMath math="A^T = A^{-1}" />.</p>
          
          <h4>Vetitë e matricave ortogonale:</h4>
          <ul>
            <li>Kolonat (dhe rreshtat) e një matrice ortogonale formojnë një bazë ortonormale.</li>
            <li>Determinanti i një matrice ortogonale është gjithmonë +1 ose -1.</li>
            <li>Transformimet ortogonale ruajnë gjatësitë dhe këndet ndërmjet vektorëve.</li>
          </ul>
          
          <h4>Shembuj të matricave ortogonale:</h4>
          <div className="examples-grid">
            <div>
              <p>Matrica e rotacionit 2D:</p>
              <BlockMath math={`R(\\theta) = \\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}`} />
            </div>
            <div>
              <p>Matrica e reflektimit:</p>
              <BlockMath math={`S = \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix}`} />
            </div>
          </div>
          
          <h3>Transformimet Ortogonale</h3>
          <p>Kur një matricë ortogonale vepron mbi një vektor, ajo kryen një transformim që ruan gjatësinë e vektorit dhe këndet ndërmjet vektorëve. Transformimet më të zakonshme ortogonale përfshijnë:</p>
          <ul>
            <li>Rotacionet në hapësirë</li>
            <li>Reflektimet ndaj një përmasori ose hipërrafshi</li>
            <li>Kombinime të rotacioneve dhe reflektimeve</li>
          </ul>
          
          <div className="example-box">
            <h4>Shembull i një transformimi ortogonal:</h4>
            <p>Matrica <InlineMath math="A = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}" /> është ortogonale sepse <InlineMath math="A^TA = AA^T = I" />.</p>
            <p>Ky transformim reflekton pikat rreth vijës <InlineMath math="y = x" />.</p>
            
            <p>Për shembull, transformimi i vektorit <InlineMath math="\\begin{bmatrix} 3 \\\\ 2 \\end{bmatrix}" /> jep:</p>
            
            <BlockMath math={`A\\begin{bmatrix} 3 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}\\begin{bmatrix} 3 \\\\ 2 \\end{bmatrix} = \\begin{bmatrix} 2 \\\\ 3 \\end{bmatrix}`} />
            
            <p>Vëreni se gjatësia e vektorit është ruajtur:</p>
            <BlockMath math={`\\sqrt{3^2 + 2^2} = \\sqrt{13} = \\sqrt{2^2 + 3^2}`} />
          </div>
          
          <h3>Teorema e rëndësishme:</h3>
          <p>Nëse <InlineMath math="A" /> është një matricë ortogonale, atëherë edhe <InlineMath math="A^T" /> dhe <InlineMath math="A^{-1}" /> janë matricat ortogonale.</p>
          <p>Kjo teoremë na tregon se kompozimi i dy transformimeve ortogonale është gjithashtu një transformim ortogonal.</p>
        </>
      )
    }
  ];
  
  return (
    <div className="math-module-container">
      <h2>Aplikime Matricore në Matematikë dhe Ekonomi</h2>
      
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