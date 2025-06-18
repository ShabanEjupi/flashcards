import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import MatrixVisualization from './MatrixVisualization';

const MathModule = () => {
  const [activeChapter, setActiveChapter] = useState(1);
  const [showSolutions, setShowSolutions] = useState({});
  
  const toggleSolution = (exerciseId) => {
    setShowSolutions(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };
  
  return (
    <div className="math-module-container">
      <h2>Mathematics Module</h2>
      
      <div className="chapter-navigation">
        <button 
          className={activeChapter === 1 ? 'active' : ''}
          onClick={() => setActiveChapter(1)}
        >
          Matrix Operations
        </button>
        <button 
          className={activeChapter === 2 ? 'active' : ''}
          onClick={() => setActiveChapter(2)}
        >
          Linear Differential Equations
        </button>
        <button 
          className={activeChapter === 3 ? 'active' : ''}
          onClick={() => setActiveChapter(3)}
        >
          Conic Sections and Rotation
        </button>
      </div>
      
      {activeChapter === 1 && (
        <div className="chapter-content">
          <h3>Matrix Operations</h3>
          {/* Existing matrix content */}
        </div>
      )}
      
      {activeChapter === 2 && (
        <div className="chapter-content">
          <h3>Linear Differential Equations</h3>
          
          <div className="theory-section">
            <h4>Introduction to Linear Differential Equations</h4>
            <p>A linear differential equation of order n is of the form:</p>
            <BlockMath math={"y^{(n)} + g_{n-1}(x)y^{(n-1)} + \\ldots + g_1(x)y' + g_0(x)y = f(x)"} />
            <p>Where g₀, g₁, ..., g<sub>n-1</sub> and f are functions of x with a common domain.</p>
            <p>If f(x) = 0, the equation is <strong>homogeneous</strong>. Otherwise it is <strong>nonhomogeneous</strong>.</p>
          </div>
          
          <div className="exercise">
            <h4>Exercise 1: Solutions of Linear Differential Equations</h4>
            <p>Determine which functions are solutions of y'' - y = 0.</p>
            <button 
              className="show-solution" 
              onClick={() => toggleSolution('diff1')}
            >
              {showSolutions.diff1 ? 'Hide Solution' : 'Show Solution'}
            </button>
            {showSolutions.diff1 && (
              <div className="solution">
                <p><strong>(a) e<sup>x</sup>:</strong> Yes, (e<sup>x</sup>)'' - e<sup>x</sup> = e<sup>x</sup> - e<sup>x</sup> = 0</p>
                <p><strong>(b) sin x:</strong> No, (sin x)'' - sin x = -sin x - sin x = -2sin x ≠ 0</p>
                <p><strong>(c) cos x:</strong> No, (cos x)'' - cos x = -cos x - cos x = -2cos x ≠ 0</p>
                <p><strong>(d) sin x + cos x:</strong> No, ((sin x + cos x)'' - (sin x + cos x) = -2(sin x + cos x) ≠ 0</p>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Exercise 2: Second-Order Linear Differential Equation</h4>
            <p>Determine which functions are solutions of y'' - 4y' + 4y = 0.</p>
            <button 
              className="show-solution" 
              onClick={() => toggleSolution('diff2')}
            >
              {showSolutions.diff2 ? 'Hide Solution' : 'Show Solution'}
            </button>
            {showSolutions.diff2 && (
              <div className="solution">
                <p><strong>(a) x:</strong> No, 0 - 4(1) + 4x = -4 + 4x ≠ 0</p>
                <p><strong>(b) e<sup>2x</sup>:</strong> Yes, (e<sup>2x</sup>)'' - 4(e<sup>2x</sup>)' + 4e<sup>2x</sup> = 4e<sup>2x</sup> - 4(2e<sup>2x</sup>) + 4e<sup>2x</sup> = 4e<sup>2x</sup> - 8e<sup>2x</sup> + 4e<sup>2x</sup> = 0</p>
                <p><strong>(c) xe<sup>2x</sup>:</strong> Yes, (xe<sup>2x</sup>)'' - 4(xe<sup>2x</sup>)' + 4(xe<sup>2x</sup>) = (4xe<sup>2x</sup> + 2e<sup>2x</sup>) - 4(2xe<sup>2x</sup> + e<sup>2x</sup>) + 4xe<sup>2x</sup> = 0</p>
                <p><strong>(d) e<sup>-2x</sup>:</strong> No, (e<sup>-2x</sup>)'' - 4(e<sup>-2x</sup>)' + 4e<sup>-2x</sup> = 16e<sup>-2x</sup> ≠ 0</p>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Exercise 3: The Wronskian</h4>
            <p>Find the Wronskian for the set of functions {'{e<sup>-x</sup>, e<sup>x</sup>}'}.</p>
            <button 
              className="show-solution" 
              onClick={() => toggleSolution('diff3')}
            >
              {showSolutions.diff3 ? 'Hide Solution' : 'Show Solution'}
            </button>
            {showSolutions.diff3 && (
              <div className="solution">
                <p>The Wronskian is defined as:</p>
                <BlockMath math={"W(y_1, y_2, \\ldots, y_n) = \\begin{vmatrix} y_1 & y_2 & \\ldots & y_n \\\\ y'_1 & y'_2 & \\ldots & y'_n \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ y_1^{(n-1)} & y_2^{(n-1)} & \\ldots & y_n^{(n-1)} \\end{vmatrix}"} />
                <p>For this set of functions:</p>
                <BlockMath math={"W(e^{-x}, e^x) = \\begin{vmatrix} e^{-x} & e^x \\\\ -e^{-x} & e^x \\end{vmatrix} = e^{-x} \\cdot e^x - (-e^{-x}) \\cdot e^x = e^0 + e^0 = 2"} />
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Exercise 4: Testing for Linear Independence</h4>
            <p>Test whether {'{sin x, cos x}'} is a linearly independent set of solutions for y'' + y = 0.</p>
            <button 
              className="show-solution" 
              onClick={() => toggleSolution('diff4')}
            >
              {showSolutions.diff4 ? 'Hide Solution' : 'Show Solution'}
            </button>
            {showSolutions.diff4 && (
              <div className="solution">
                <p>First, verify that each function is a solution of y'' + y = 0:</p>
                <p>For sin x: (sin x)'' + sin x = -sin x + sin x = 0 ✓</p>
                <p>For cos x: (cos x)'' + cos x = -cos x + cos x = 0 ✓</p>
                <p>Now calculate the Wronskian:</p>
                <BlockMath math={"W(\\sin x, \\cos x) = \\begin{vmatrix} \\sin x & \\cos x \\\\ \\cos x & -\\sin x \\end{vmatrix} = -\\sin^2 x - \\cos^2 x = -1 \\neq 0"} />
                <p>Since the Wronskian is not identically zero, the set is linearly independent.</p>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Exercise 5: General Solution</h4>
            <p>Find the general solution of the differential equation y'' + y = 0.</p>
            <button 
              className="show-solution" 
              onClick={() => toggleSolution('diff5')}
            >
              {showSolutions.diff5 ? 'Hide Solution' : 'Show Solution'}
            </button>
            {showSolutions.diff5 && (
              <div className="solution">
                <p>From the previous exercise, we know that {'{sin x, cos x}'} is a linearly independent set of solutions.</p>
                <p>For an nth-order linear homogeneous differential equation, the general solution is a linear combination of n linearly independent solutions.</p>
                <p>Therefore, the general solution is:</p>
                <BlockMath math={"y = C_1\\sin x + C_2\\cos x"} />
                <p>where C₁ and C₂ are arbitrary constants.</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {activeChapter === 3 && (
        <div className="chapter-content">
          <h3>Conic Sections and Rotation</h3>
          
          <div className="theory-section">
            <h4>Introduction to Conic Sections</h4>
            <p>Every conic section in the xy-plane has an equation of the form:</p>
            <BlockMath math={"ax^2 + bxy + cy^2 + dx + ey + f = 0"} />
            <p>When b = 0, the conic axes are parallel to the coordinate axes, and we can identify the type of conic by writing the equation in standard form.</p>
          </div>
          
          <div className="exercise">
            <h4>Exercise 1: Identifying Conic Sections</h4>
            <p>Identify and sketch the graph of y² = 8x.</p>
            <button 
              className="show-solution" 
              onClick={() => toggleSolution('conic1')}
            >
              {showSolutions.conic1 ? 'Hide Solution' : 'Show Solution'}
            </button>
            {showSolutions.conic1 && (
              <div className="solution">
                <p>This equation represents a parabola. Writing in standard form:</p>
                <BlockMath math={"y^2 = 4(2)x"} />
                <p>Comparing with (y-k)² = 4p(x-h), we have h=0, k=0, and p=2.</p>
                <p>This is a parabola with:</p>
                <ul>
                  <li>Vertex at (0,0)</li>
                  <li>Focus at (2,0)</li>
                  <li>Opens to the right</li>
                  <li>Axis of symmetry along the x-axis</li>
                </ul>
                <div className="graph-visualization" style={{textAlign: 'center'}}>
                  <img src="https://mathworld.wolfram.com/images/eps-svg/StandardParabola_1000.svg" alt="Parabola" style={{width: '300px'}} />
                </div>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Exercise 2: Ellipses</h4>
            <p>Identify and sketch the graph of 4x² + y² - 8x = 3.</p>
            <button 
              className="show-solution" 
              onClick={() => toggleSolution('conic2')}
            >
              {showSolutions.conic2 ? 'Hide Solution' : 'Show Solution'}
            </button>
            {showSolutions.conic2 && (
              <div className="solution">
                <p>Step 1: Complete the square for the x-terms.</p>
                <BlockMath math={"4(x^2 - 2x + 1) + y^2 = 3 + 4"} />
                <BlockMath math={"4(x-1)^2 + y^2 = 7"} />
                <BlockMath math={"\\frac{4(x-1)^2}{7} + \\frac{y^2}{7} = 1"} />
                <p>Step 2: Identify the conic section by comparing with standard form.</p>
                <p>This is an ellipse with:</p>
                <ul>
                  <li>Center at (1, 0)</li>
                  <li>Semi-major axis a = √7 along the y-axis</li>
                  <li>Semi-minor axis b = √(7/4) = √7/2 along the x-axis</li>
                </ul>
                <div className="graph-visualization" style={{textAlign: 'center'}}>
                  <img src="https://mathworld.wolfram.com/images/eps-svg/Ellipse_1000.svg" alt="Ellipse" style={{width: '300px'}} />
                </div>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Exercise 3: Rotation of Axes</h4>
            <p>Perform a rotation of axes to eliminate the xy-term in 4x² + 2xy + 4y² = 15, and sketch the resulting conic.</p>
            <button 
              className="show-solution" 
              onClick={() => toggleSolution('conic3')}
            >
              {showSolutions.conic3 ? 'Hide Solution' : 'Show Solution'}
            </button>
            {showSolutions.conic3 && (
              <div className="solution">
                <p>Step 1: Find the rotation angle using cot(2θ) = (a-c)/b = (4-4)/2 = 0.</p>
                <p>This gives θ = π/4 = 45°.</p>
                <p>Step 2: Apply the substitutions:</p>
                <BlockMath math={"x = \\frac{x' - y'}{\\sqrt{2}}, \\quad y = \\frac{x' + y'}{\\sqrt{2}}"} />
                <p>Step 3: Substitute into the original equation and simplify:</p>
                <BlockMath math={"4\\left(\\frac{x' - y'}{\\sqrt{2}}\\right)^2 + 2\\left(\\frac{x' - y'}{\\sqrt{2}}\\right)\\left(\\frac{x' + y'}{\\sqrt{2}}\\right) + 4\\left(\\frac{x' + y'}{\\sqrt{2}}\\right)^2 = 15"} />
                <p>After simplification:</p>
                <BlockMath math={"5(x')^2 + 3(y')^2 = 15"} />
                <BlockMath math={"\\frac{(x')^2}{3} + \\frac{(y')^2}{5} = 1"} />
                <p>This is an ellipse with semi-major axis a = √5 along the y'-axis and semi-minor axis b = √3 along the x'-axis, rotated 45° counterclockwise.</p>
                <div className="graph-visualization" style={{textAlign: 'center'}}>
                  <img src="https://mathworld.wolfram.com/images/eps-svg/EllipseRotated_1000.svg" alt="Rotated Ellipse" style={{width: '300px'}} />
                </div>
              </div>
            )}
          </div>
          
          <div className="exercise">
            <h4>Exercise 4: Hyperbolas</h4>
            <p>Identify and sketch the graph of 4x² - y² - 8x = 3.</p>
            <button 
              className="show-solution" 
              onClick={() => toggleSolution('conic4')}
            >
              {showSolutions.conic4 ? 'Hide Solution' : 'Show Solution'}
            </button>
            {showSolutions.conic4 && (
              <div className="solution">
                <p>Step 1: Complete the square for the x-terms.</p>
                <BlockMath math={"4(x^2 - 2x + 1) - y^2 = 3 + 4"} />
                <BlockMath math={"4(x-1)^2 - y^2 = 7"} />
                <BlockMath math={"\\frac{4(x-1)^2}{7} - \\frac{y^2}{7} = 1"} />
                <BlockMath math={"\\frac{(x-1)^2}{\\frac{7}{4}} - \\frac{y^2}{7} = 1"} />
                <p>Step 2: Identify the conic section by comparing with standard form.</p>
                <p>This is a hyperbola with:</p>
                <ul>
                  <li>Center at (1, 0)</li>
                  <li>Transverse axis along the x-axis with a = √(7/4) = √7/2</li>
                  <li>Conjugate axis along the y-axis with b = √7</li>
                  <li>Vertices at (1 ± √7/2, 0)</li>
                  <li>Asymptotes: y = ±(2/√7)(x-1)</li>
                </ul>
                <div className="graph-visualization" style={{textAlign: 'center'}}>
                  <img src="https://mathworld.wolfram.com/images/eps-svg/Hyperbola_1000.svg" alt="Hyperbola" style={{width: '300px'}} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MathModule;