import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const MachineLearningTest = () => {
  const [showAnswers, setShowAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  const toggleAnswer = (questionId) => {
    setShowAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const questions = [
    {
      id: 1,
      question: "Çfarë dallimi ka midis Gradient Descent dhe Gradient Ascent?",
      answer: (
        <div>
          <h4>Gradient Descent vs Gradient Ascent:</h4>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
            <div style={{border: '1px solid #ddd', padding: '15px', borderRadius: '8px'}}>
              <h5>Gradient Descent</h5>
              <ul>
                <li><strong>Objektivi:</strong> Minimizim i funksionit të kostos</li>
                <li><strong>Drejtimi:</strong> Lëviz në drejtimin e kundërt të gradientit</li>
                <li><strong>Formula:</strong> θ = θ - α∇J(θ)</li>
                <li><strong>Përdorimi:</strong> Optimizimi i peshave në ML</li>
              </ul>
            </div>
            
            <div style={{border: '1px solid #ddd', padding: '15px', borderRadius: '8px'}}>
              <h5>Gradient Ascent</h5>
              <ul>
                <li><strong>Objektivi:</strong> Maksimizim i funksionit (p.sh. likelihood)</li>
                <li><strong>Drejtimi:</strong> Lëviz në drejtimin e gradientit</li>
                <li><strong>Formula:</strong> θ = θ + α∇J(θ)</li>
                <li><strong>Përdorimi:</strong> Maximum likelihood estimation</li>
              </ul>
            </div>
          </div>

          <BlockMath math={String.raw`\text{Gradient Descent: } \theta_{new} = \theta_{old} - \alpha \frac{\partial J}{\partial \theta}`} />
          <BlockMath math={String.raw`\text{Gradient Ascent: } \theta_{new} = \theta_{old} + \alpha \frac{\partial J}{\partial \theta}`} />
        </div>
      )
    },
    
    {
      id: 2,
      question: "Listoni 3 avantazhe dhe 3 disavantazhe të Decision Trees:",
      answer: (
        <div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
            <div style={{border: '2px solid #4CAF50', padding: '15px', borderRadius: '8px'}}>
              <h4 style={{color: '#4CAF50'}}>✅ Avantazhet</h4>
              <ol>
                <li><strong>Interpretueshmëri e lartë:</strong> Lehtë për t'u kuptuar dhe vizualizuar</li>
                <li><strong>Nuk kërkon preprocessing:</strong> Punon me të dhëna kategorike dhe numerike</li>
                <li><strong>Feature selection automatike:</strong> Zgjedh vetë variablat më të rëndësishme</li>
              </ol>
            </div>
            
            <div style={{border: '2px solid #f44336', padding: '15px', borderRadius: '8px'}}>
              <h4 style={{color: '#f44336'}}>❌ Disavantazhet</h4>
              <ol>
                <li><strong>Overfitting:</strong> Prirje për të krijuar pemë shumë komplekse</li>
                <li><strong>Instabilitet:</strong> Ndryshime të vogla në të dhëna mund të ndryshojnë pemën</li>
                <li><strong>Bias ndaj features me shumë vlera:</strong> Favorizon atributet me më shumë kategori</li>
              </ol>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 3,
      question: "Dy detyra me rrethiku për Dimension Reduction:",
      answer: (
        <div>
          <div style={{marginBottom: '30px'}}>
            <h4>Detyra 1: Principal Component Analysis (PCA)</h4>
            <p>Supozoni se keni një dataset me 4 dimensione dhe dëshironi ta reduktoni në 2 dimensione duke përdorur PCA.</p>
            
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', margin: '10px 0'}}>
              <strong>Dataset:</strong>
              <BlockMath math={String.raw`X = \begin{bmatrix} 
                2 & 3 & 1 & 4 \\
                1 & 2 & 3 & 2 \\
                4 & 1 & 2 & 3 \\
                3 & 4 & 1 & 1
              \end{bmatrix}`} />
            </div>
            
            <p><strong>Hapat:</strong></p>
            <ol>
              <li>Standardizoni të dhënat (mean=0, std=1)</li>
              <li>Llogaritni covariance matrix</li>
              <li>Gjeni eigenvalues dhe eigenvectors</li>
              <li>Zgjidhni 2 eigenvectors me eigenvalues më të mëdha</li>
              <li>Transformoni të dhënat: Y = XW</li>
            </ol>

            <div style={{border: '1px dashed #666', padding: '10px', margin: '10px 0'}}>
              <strong>🎯 Rrethiku përgjigjen e saktë:</strong><br/>
              A) PCA ruan 100% të informacionit<br/>
              B) PCA ruan sasi maksimale të variancës<br/>
              C) PCA krijon features të reja që janë linear kombinime<br/>
              D) B dhe C janë të sakta
            </div>
          </div>

          <div>
            <h4>Detyra 2: t-SNE vs PCA</h4>
            <p>Krahaso t-SNE dhe PCA për reduktim dimensionesh:</p>
            
            <table style={{width: '100%', borderCollapse: 'collapse', margin: '15px 0'}}>
              <thead>
                <tr style={{backgroundColor: '#f0f0f0'}}>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Aspekti</th>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>PCA</th>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>t-SNE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>Lineariteti</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>Linear</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>Non-linear</td>
                </tr>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>Shpejtësia</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>E shpejtë</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>E ngadaltë</td>
                </tr>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>Interpretimi</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>E lehtë</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>E vështirë</td>
                </tr>
              </tbody>
            </table>

            <div style={{border: '1px dashed #666', padding: '10px', margin: '10px 0'}}>
              <strong>🎯 Rrethiku përgjigjen e saktë:</strong><br/>
              Për vizualizim të clusterëve në të dhëna komplekse, më mirë është:<br/>
              A) PCA B) t-SNE C) LDA D) Asnjë
            </div>
          </div>
        </div>
      )
    },

    {
      id: 4,
      question: "Identifikoni në graf cilat janë Supervised dhe cilat Unsupervised:",
      answer: (
        <div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
            <div style={{textAlign: 'center'}}>
              <h4>🔵 Supervised Learning</h4>
              <div style={{border: '2px solid #2196F3', padding: '20px', borderRadius: '8px', backgroundColor: '#E3F2FD'}}>
                <p><strong>Ka target labels</strong></p>
                <ul style={{textAlign: 'left'}}>
                  <li>Linear Regression</li>
                  <li>Logistic Regression</li>
                  <li>Decision Trees</li>
                  <li>Random Forest</li>
                  <li>SVM</li>
                  <li>Neural Networks (classification)</li>
                </ul>
              </div>
            </div>
            
            <div style={{textAlign: 'center'}}>
              <h4>🟡 Unsupervised Learning</h4>
              <div style={{border: '2px solid #FF9800', padding: '20px', borderRadius: '8px', backgroundColor: '#FFF3E0'}}>
                <p><strong>Nuk ka target labels</strong></p>
                <ul style={{textAlign: 'left'}}>
                  <li>K-Means Clustering</li>
                  <li>Hierarchical Clustering</li>
                  <li>DBSCAN</li>
                  <li>PCA</li>
                  <li>t-SNE</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px'}}>
            <h4>🎯 Test Yourself:</h4>
            <p>Rrethoni cilat nga algoritorët e mëposhtme janë Supervised (S) ose Unsupervised (U):</p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
              <div>1. K-Means: <strong>U</strong></div>
              <div>2. Naive Bayes: <strong>S</strong></div>
              <div>3. Apriori Algorithm: <strong>U</strong></div>
              <div>4. Gradient Boosting: <strong>S</strong></div>
              <div>5. DBSCAN: <strong>U</strong></div>
              <div>6. KNN: <strong>S</strong></div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 5,
      question: "Dataset me plusa/minusa dhe output -1/1. Përmendni 4 algoritme që japin accuracy 100%:",
      answer: (
        <div>
          <div style={{backgroundColor: '#E8F5E8', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🎯 Dataset: Linearly Separable Data</h4>
            <p>Kur të dhënat janë <strong>linearly separable</strong> (mund të ndahen me një vijë të drejtë), 
            këto algoritme mund të arrijnë accuracy 100%:</p>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
            <div style={{border: '1px solid #4CAF50', padding: '15px', borderRadius: '8px'}}>
              <h5>1. Perceptron</h5>
              <p>Algoritmi klasik linear për klasifikim binar</p>
              <BlockMath math={String.raw`y = sign(w^T x + b)`} />
            </div>

            <div style={{border: '1px solid #2196F3', padding: '15px', borderRadius: '8px'}}>
              <h5>2. SVM (Linear Kernel)</h5>
              <p>Gjen hyperplane optimal që maksimimon margin</p>
              <BlockMath math={String.raw`y = sign(\sum_{i} \alpha_i y_i x_i^T x + b)`} />
            </div>

            <div style={{border: '1px solid #FF9800', padding: '15px', borderRadius: '8px'}}>
              <h5>3. Logistic Regression</h5>
              <p>Me iterime të mjaftueshme në të dhëna separable</p>
              <BlockMath math={String.raw`P(y=1) = \frac{1}{1 + e^{-(w^T x + b)}}`} />
            </div>

            <div style={{border: '1px solid #9C27B0', padding: '15px', borderRadius: '8px'}}>
              <h5>4. Linear Discriminant Analysis (LDA)</h5>
              <p>Gjen drejtimin optimal për separim</p>
              <BlockMath math={String.raw`y = w^T x > threshold`} />
            </div>
          </div>

          <div style={{backgroundColor: '#FFF3E0', padding: '15px', borderRadius: '8px', marginTop: '20px'}}>
            <h4>⚠️ Kushtet për Accuracy 100%:</h4>
            <ul>
              <li>Të dhënat duhet të jenë <strong>linearly separable</strong></li>
              <li>Nuk ka noise në dataset</li>
              <li>Ka mjaftueshëm të dhëna për training</li>
              <li>Features janë relevante për klasifikim</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      id: 6,
      question: "Vizatoni funksionin e KNN Regression për vlera të ndryshme të k:",
      answer: (
        <div>
          <h4>KNN Regression: Si ndikon vlera e k</h4>
          
          <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <BlockMath math={String.raw`\hat{y} = \frac{1}{k} \sum_{i \in N_k(x)} y_i`} />
            <p style={{textAlign: 'center'}}><em>ku N_k(x) janë k fqinjët më të afërt të pikës x</em></p>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px'}}>
            <div style={{textAlign: 'center', border: '1px solid #ddd', padding: '15px', borderRadius: '8px'}}>
              <h5>k = 1 (Overfitting)</h5>
              <div style={{width: '100%', height: '150px', backgroundColor: '#ffebee', border: '1px dashed #f44336', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div>
                  <p style={{margin: '5px 0', fontSize: '12px'}}>📈 Shumë fleksibël</p>
                  <p style={{margin: '5px 0', fontSize: '12px'}}>🔴 Noise sensitivity</p>
                  <p style={{margin: '5px 0', fontSize: '12px'}}>⚡ Parashikime më të sakta</p>
                </div>
              </div>
            </div>

            <div style={{textAlign: 'center', border: '1px solid #ddd', padding: '15px', borderRadius: '8px'}}>
              <h5>k = 5 (Balancuar)</h5>
              <div style={{width: '100%', height: '150px', backgroundColor: '#e8f5e9', border: '1px dashed #4caf50', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div>
                  <p style={{margin: '5px 0', fontSize: '12px'}}>📊 Balancë e mirë</p>
                  <p style={{margin: '5px 0', fontSize: '12px'}}>🟢 Reduktim noise</p>
                  <p style={{margin: '5px 0', fontSize: '12px'}}>📏 Smooth predictions</p>
                </div>
              </div>
            </div>

            <div style={{textAlign: 'center', border: '1px solid #ddd', padding: '15px', borderRadius: '8px'}}>
              <h5>k = 15 (Underfitting)</h5>
              <div style={{width: '100%', height: '150px', backgroundColor: '#e3f2fd', border: '1px dashed #2196f3', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div>
                  <p style={{margin: '5px 0', fontSize: '12px'}}>📉 Më pak fleksibël</p>
                  <p style={{margin: '5px 0', fontSize: '12px'}}>🔵 Shumë smooth</p>
                  <p style={{margin: '5px 0', fontSize: '12px'}}>⬇️ Humb detaje</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px'}}>
            <h4>🎯 Zgjedhja e k optimalë:</h4>
            <ul>
              <li><strong>Cross-validation:</strong> Testoni vlera të ndryshme të k</li>
              <li><strong>Bias-Variance tradeoff:</strong> k të vogël → high variance, k të madh → high bias</li>
              <li><strong>Rule of thumb:</strong> k = √n (ku n është numri i samples)</li>
              <li><strong>Odd numbers:</strong> Për të shmangur ties në klasifikim</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      id: 7,
      question: "Pse duhet bërë scaling para aplikimit të SVM algorithm?",
      answer: (
        <div>
          <div style={{backgroundColor: '#ffebee', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>⚠️ Problemi pa Scaling</h4>
            <p>SVM është <strong>sensitive ndaj shkallës së features</strong> sepse bazohet në llogaritjen e distancave.</p>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
            <div style={{border: '2px solid #f44336', padding: '15px', borderRadius: '8px'}}>
              <h5>❌ Pa Scaling</h5>
              <div style={{backgroundColor: '#fff', padding: '10px', borderRadius: '4px', fontFamily: 'monospace'}}>
                Feature 1: Age (20-80)<br/>
                Feature 2: Income (20000-100000)<br/>
                Feature 3: Score (0-1)
              </div>
              <p><strong>Problem:</strong> Income do të dominojë sepse ka vlera më të mëdha!</p>
            </div>

            <div style={{border: '2px solid #4caf50', padding: '15px', borderRadius: '8px'}}>
              <h5>✅ Me Scaling</h5>
              <div style={{backgroundColor: '#fff', padding: '10px', borderRadius: '4px', fontFamily: 'monospace'}}>
                Feature 1: Age (0-1)<br/>
                Feature 2: Income (0-1)<br/>
                Feature 3: Score (0-1)
              </div>
              <p><strong>Rezultat:</strong> Të gjitha features kanë peshë të barabartë!</p>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>🔧 Metodat e Scaling:</h4>
            
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', margin: '10px 0'}}>
              <h5>1. Min-Max Scaling (Normalization)</h5>
              <BlockMath math={String.raw`X_{scaled} = \frac{X - X_{min}}{X_{max} - X_{min}}`} />
              <p>Shkallë: [0, 1]</p>
            </div>

            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', margin: '10px 0'}}>
              <h5>2. Standardization (Z-score)</h5>
              <BlockMath math={String.raw`X_{scaled} = \frac{X - \mu}{\sigma}`} />
              <p>Mean = 0, Standard Deviation = 1</p>
            </div>

            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', margin: '10px 0'}}>
              <h5>3. Robust Scaling</h5>
              <BlockMath math={String.raw`X_{scaled} = \frac{X - median}{IQR}`} />
              <p>Rezistent ndaj outliers</p>
            </div>
          </div>

          <div style={{backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px'}}>
            <h4>✅ Përfitimet e Scaling për SVM:</h4>
            <ul>
              <li><strong>Konvergjenc më e shpejtë:</strong> Optimizimi punon më mirë</li>
              <li><strong>Accuracy më e mirë:</strong> Features kanë kontribut të barabartë</li>
              <li><strong>Kernel functions:</strong> RBF kernel funksionon saktë</li>
              <li><strong>Numerical stability:</strong> Shmang overflow/underflow</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      id: 8,
      question: "Multi-Head Attention: Struktura dhe Vizualizimi",
      answer: (
        <div>
          <div style={{backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🧠 Multi-Head Attention Mechanism</h4>
            <p>Lejon modelit të fokusohet në pjesë të ndryshme të input-it në të njëjtën kohë.</p>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>📐 Struktura Matematikore</h4>
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
              <BlockMath math={String.raw`\text{MultiHead}(Q,K,V) = \text{Concat}(head_1, ..., head_h)W^O`} />
              <BlockMath math={String.raw`head_i = \text{Attention}(QW_i^Q, KW_i^K, VW_i^V)`} />
              <BlockMath math={String.raw`\text{Attention}(Q,K,V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V`} />
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
            <div>
              <h4>🔄 Hapat e Procesimit</h4>
              <ol style={{backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ddd'}}>
                <li><strong>Linear Transformations:</strong> Q, K, V matrices</li>
                <li><strong>Split në h heads:</strong> Ndaj në grupe më të vogla</li>
                <li><strong>Parallel Attention:</strong> Çdo head kryen attention</li>
                <li><strong>Concatenate:</strong> Bashko rezultatet</li>
                <li><strong>Final Linear:</strong> W^O transformation</li>
              </ol>
            </div>

            <div>
              <h4>🎯 Parametrat Kryesorë</h4>
              <ul style={{backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #ddd'}}>
                <li><strong>h:</strong> Numri i heads (zakonisht 8 ose 12)</li>
                <li><strong>d_model:</strong> Dimensioni i modelit (512, 768)</li>
                <li><strong>d_k = d_v:</strong> d_model / h</li>
                <li><strong>d_ff:</strong> Feed-forward dimension</li>
              </ul>
            </div>
          </div>

          <div style={{backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🔍 Vizualizimi i Attention</h4>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', textAlign: 'center'}}>
              <div style={{border: '1px solid #ff9800', padding: '10px', borderRadius: '4px'}}>
                <strong>Head 1</strong><br/>
                📝 Syntax patterns
              </div>
              <div style={{border: '1px solid #4caf50', padding: '10px', borderRadius: '4px'}}>
                <strong>Head 2</strong><br/>
                🔗 Dependencies
              </div>
              <div style={{border: '1px solid #2196f3', padding: '10px', borderRadius: '4px'}}>
                <strong>Head 3</strong><br/>
                📖 Semantics
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#f3e5f5', padding: '15px', borderRadius: '8px'}}>
            <h4>💡 Avantazhet e Multi-Head</h4>
            <ul>
              <li><strong>Diversitet:</strong> Çdo head mëson patterns të ndryshme</li>
              <li><strong>Paralelizim:</strong> Mund të llogariten në paralel</li>
              <li><strong>Ekspresivitet:</strong> Më shumë kapacitet modelimi</li>
              <li><strong>Interpretueshmëri:</strong> Mund të analizosh çdo head veçmas</li>
            </ul>
          </div>

          <div style={{backgroundColor: '#e0f2f1', padding: '15px', borderRadius: '8px', marginTop: '15px'}}>
            <h4>🛠️ Implementim në PyTorch:</h4>
            <pre style={{backgroundColor: '#263238', color: '#fff', padding: '10px', borderRadius: '4px', fontSize: '12px'}}>
{`class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        self.d_model = d_model
        self.n_heads = n_heads
        self.d_k = d_model // n_heads
        
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
        
    def forward(self, query, key, value):
        batch_size = query.size(0)
        
        # Linear transformations
        Q = self.W_q(query)
        K = self.W_k(key)
        V = self.W_v(value)
        
        # Reshape for multi-head
        Q = Q.view(batch_size, -1, self.n_heads, self.d_k).transpose(1,2)
        K = K.view(batch_size, -1, self.n_heads, self.d_k).transpose(1,2)
        V = V.view(batch_size, -1, self.n_heads, self.d_k).transpose(1,2)
        
        # Attention
        attention = scaled_dot_product_attention(Q, K, V)
        
        # Concatenate heads
        attention = attention.transpose(1,2).contiguous()
        attention = attention.view(batch_size, -1, self.d_model)
        
        # Final linear
        output = self.W_o(attention)
        return output`}
            </pre>
          </div>
        </div>
      )
    },

    {
      id: 9,
      question: "Autoencoders: Struktura, Llojet dhe Aplikime",
      answer: (
        <div>
          <div style={{backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🔄 Çfarë janë Autoencoders?</h4>
            <p>Neural networks që mësojnë të <strong>kompresojnë</strong> dhe <strong>rekonstruktojnë</strong> të dhënat. 
            Objektivi: Input = Output</p>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>🏗️ Arkitektura</h4>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', textAlign: 'center'}}>
              <div style={{border: '2px solid #2196f3', padding: '15px', borderRadius: '8px'}}>
                <h5>📥 Encoder</h5>
                <p>Input → Latent Space</p>
                <div style={{backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '4px', margin: '10px 0'}}>
                  <strong>784 → 128 → 64 → 32</strong>
                </div>
                <p>Kompresim progresiv</p>
              </div>

              <div style={{border: '2px solid #FF9800', padding: '15px', borderRadius: '8px'}}>
                <h5>🎯 Latent Space</h5>
                <p>Përfaqësimi i kompresuar</p>
                <div style={{backgroundColor: '#fff3e0', padding: '10px', borderRadius: '4px', margin: '10px 0'}}>
                  <strong>32 dimensions</strong>
                </div>
                <p>Informacioni esencial</p>
              </div>

              <div style={{border: '2px solid #4caf50', padding: '15px', borderRadius: '8px'}}>
                <h5>📤 Decoder</h5>
                <p>Latent Space → Output</p>
                <div style={{backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '4px', margin: '10px 0'}}>
                  <strong>32 → 64 → 128 → 784</strong>
                </div>
                <p>Rekonstruksion progresiv</p>
              </div>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>📊 Llojet e Autoencoders</h4>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              <div style={{border: '1px solid #673ab7', padding: '15px', borderRadius: '8px'}}>
                <h5>🔍 Sparse Autoencoders</h5>
                <ul>
                  <li>Shtojnë regularization për sparsity</li>
                  <li>Mësojnë features më të interpretueshme</li>
                  <li>Loss: MSE + λ * sparsity_penalty</li>
                </ul>
              </div>

              <div style={{border: '1px solid #795548', padding: '15px', borderRadius: '8px'}}>
                <h5>🎭 Denoising Autoencoders</h5>
                <ul>
                  <li>Input: të dhëna me noise</li>
                  <li>Output: të dhëna të pastra</li>
                  <li>Mësojnë të filtrojnë noise</li>
                </ul>
              </div>

              <div style={{border: '1px solid #ff5722', padding: '15px', borderRadius: '8px'}}>
                <h5>📊 Variational Autoencoders (VAE)</h5>
                <ul>
                  <li>Encoder → distributa (μ, σ)</li>
                  <li>Sampling nga distributa</li>
                  <li>Mund të gjenerojnë të dhëna të reja</li>
                </ul>
              </div>

              <div style={{border: '1px solid #009688', padding: '15px', borderRadius: '8px'}}>
                <h5>🎨 Convolutional Autoencoders</h5>
                <ul>
                  <li>Për të dhëna imazhesh</li>
                  <li>Encoder: Conv + Pooling</li>
                  <li>Decoder: Deconv + Upsampling</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#f3e5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🎯 Aplikime të Autoencoders</h4>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              <ul>
                <li><strong>Dimension Reduction:</strong> Alternative për PCA</li>
                <li><strong>Anomaly Detection:</strong> Reconstruction error i lartë</li>
                <li><strong>Image Denoising:</strong> Pastrimi i imazheve</li>
                <li><strong>Feature Learning:</strong> Nxjerrja e features</li>
              </ul>
              <ul>
                <li><strong>Data Compression:</strong> Kompresim inteligjent</li>
                <li><strong>Generative Modeling:</strong> VAE për gjenerim</li>
                <li><strong>Pretraining:</strong> Inicialization i peshave</li>
                <li><strong>Super-resolution:</strong> Përmirësimi i imazheve</li>
              </ul>
            </div>
          </div>

          <div style={{backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px'}}>
            <h4>💡 Loss Function</h4>
            <BlockMath math={String.raw`L = \frac{1}{n} \sum_{i=1}^{n} ||x_i - \hat{x}_i||^2 + \lambda \cdot R(h)`} />
            <p>ku:</p>
            <ul>
              <li><strong>x_i:</strong> Input origjinal</li>
              <li><strong>x̂_i:</strong> Output i rekonstruktuar</li>
              <li><strong>R(h):</strong> Regularization term</li>
              <li><strong>λ:</strong> Regularization weight</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      id: 10,
      question: "Detyrë praktike: Llogaritni output-in për Neural Network",
      answer: (
        <div>
          <div style={{backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🧮 Neural Network Forward Pass</h4>
            <p>Le të llogarisim output-in për një rrjet 3-shtresor hap pas hapi.</p>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>📋 Të dhënat e problemit:</h4>
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
              <p><strong>Arkitektura:</strong> 2 → 3 → 1 (2 inputs, 3 hidden neurons, 1 output)</p>
              <p><strong>Input:</strong> X = [0.5, 0.8]</p>
              <p><strong>Activation function:</strong> Sigmoid për të gjitha shtresat</p>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>⚖️ Peshat dhe Bias-et:</h4>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              <div style={{border: '1px solid #2196f3', padding: '15px', borderRadius: '8px'}}>
                <h5>Input → Hidden Layer</h5>
                <div style={{backgroundColor: '#fff', padding: '10px', borderRadius: '4px', fontFamily: 'monospace'}}>
                  W₁ = [[0.1, 0.3, 0.5],<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[0.2, 0.4, 0.6]]<br/>
                  b₁ = [0.1, 0.2, 0.3]
                </div>
              </div>

              <div style={{border: '1px solid #4caf50', padding: '15px', borderRadius: '8px'}}>
                <h5>Hidden → Output Layer</h5>
                <div style={{backgroundColor: '#fff', padding: '10px', borderRadius: '4px', fontFamily: 'monospace'}}>
                  W₂ = [[0.7],<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[0.8],<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[0.9]]<br/>
                  b₂ = [0.5]
                </div>
              </div>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>🔢 Hapi 1: Input → Hidden Layer</h4>
            <div style={{backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px'}}>
              <p><strong>Linear transformation:</strong></p>
              <BlockMath math={String.raw`z_1 = XW_1 + b_1`} />
              
              <div style={{margin: '10px 0'}}>
                <p>z₁₁ = 0.5 × 0.1 + 0.8 × 0.2 + 0.1 = 0.05 + 0.16 + 0.1 = <strong>0.31</strong></p>
                <p>z₁₂ = 0.5 × 0.3 + 0.8 × 0.4 + 0.2 = 0.15 + 0.32 + 0.2 = <strong>0.67</strong></p>
                <p>z₁₃ = 0.5 × 0.5 + 0.8 × 0.6 + 0.3 = 0.25 + 0.48 + 0.3 = <strong>1.03</strong></p>
              </div>

              <p><strong>Activation (Sigmoid):</strong></p>
              <BlockMath math={String.raw`a_1 = \sigma(z_1) = \frac{1}{1 + e^{-z_1}}`} />
              
              <div style={{margin: '10px 0'}}>
                <p>a₁₁ = σ(0.31) = 1/(1 + e⁻⁰·³¹) ≈ <strong>0.577</strong></p>
                <p>a₁₂ = σ(0.67) = 1/(1 + e⁻⁰·⁶⁷) ≈ <strong>0.661</strong></p>
                <p>a₁₃ = σ(1.03) = 1/(1 + e⁻¹·⁰³) ≈ <strong>0.737</strong></p>
              </div>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>🔢 Hapi 2: Hidden → Output Layer</h4>
            <div style={{backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px'}}>
              <p><strong>Linear transformation:</strong></p>
              <BlockMath math={String.raw`z_2 = a_1W_2 + b_2`} />
              
              <div style={{margin: '10px 0'}}>
                <p>z₂ = 0.577 × 0.7 + 0.661 × 0.8 + 0.737 × 0.9 + 0.5</p>
                <p>z₂ = 0.404 + 0.529 + 0.663 + 0.5 = <strong>2.096</strong></p>
              </div>

              <p><strong>Final Activation:</strong></p>
              <BlockMath math={String.raw`output = \sigma(z_2) = \frac{1}{1 + e^{-2.096}}`} />
              
              <div style={{margin: '10px 0', padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '8px', textAlign: 'center'}}>
                <h4 style={{color: '#4caf50'}}>🎯 PËRGJIGJA PËRFUNDIMTARE</h4>
                <p><strong>Output = σ(2.096) ≈ 0.891</strong></p>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px'}}>
            <h4>📚 Përmbledhje e Formulave:</h4>
            <ul>
              <li><strong>Linear transformation:</strong> z = Wx + b</li>
              <li><strong>Sigmoid activation:</strong> σ(z) = 1/(1 + e⁻ᶻ)</li>
              <li><strong>Forward pass:</strong> Repeat për çdo shtresë</li>
              <li><strong>Chain rule:</strong> Përdoret për backpropagation</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      id: 11,
      question: "Stochastic Gradient Descent dhe Batch Stochastic Gradient Descent - Shembuj trajnimi",
      answer: (
        <div>
          <div style={{backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🎯 Llojet e Gradient Descent</h4>
            <p>Të gjitha metodat përdoren për të optimizuar funksionin e kostos në machine learning.</p>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
            <div style={{border: '2px solid #4CAF50', padding: '15px', borderRadius: '8px'}}>
              <h4 style={{color: '#4CAF50'}}>Stochastic Gradient Descent (SGD)</h4>
              <ul>
                <li><strong>Përditësimi:</strong> Një shembull në herë</li>
                <li><strong>Shpejtësia:</strong> Shumë e shpejtë</li>
                <li><strong>Memoria:</strong> E ulët</li>
                <li><strong>Konvergjenca:</strong> E zhurmshme</li>
              </ul>
              <div style={{backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '4px', marginTop: '10px'}}>
                <strong>Shembull trajnimi:</strong><br/>
                Dataset: 1,000,000 imazhe<br/>
                Batch size: 1<br/>
                Updates: 1,000,000 për epoch
              </div>
            </div>
            
            <div style={{border: '2px solid #2196F3', padding: '15px', borderRadius: '8px'}}>
              <h4 style={{color: '#2196F3'}}>Mini-Batch SGD</h4>
              <ul>
                <li><strong>Përditësimi:</strong> Grupe të vogla (32-256)</li>
                <li><strong>Shpejtësia:</strong> E balancuar</li>
                <li><strong>Memoria:</strong> E moderuar</li>
                <li><strong>Konvergjenca:</strong> E qëndrueshme</li>
              </ul>
              <div style={{backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '4px', marginTop: '10px'}}>
                <strong>Shembull trajnimi:</strong><br/>
                Dataset: 1,000,000 imazhe<br/>
                Batch size: 64<br/>
                Updates: 15,625 për epoch
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px'}}>
            <h4>📊 Krahasimi i Performancës</h4>
            <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '15px'}}>
              <thead>
                <tr style={{backgroundColor: '#f5f5f5'}}>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Metoda</th>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Batch Size</th>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Shpejtësia</th>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Stabiliteti</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>SGD</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>1</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>⭐⭐⭐</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>⭐</td>
                </tr>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>Mini-Batch</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>32-256</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>⭐⭐</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>⭐⭐⭐</td>
                </tr>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>Batch GD</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>Të gjitha</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>⭐</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>⭐⭐⭐</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
    },

    {
      id: 12,
      question: "Ridge dhe Lasso Regression - Teknika të Regularizimit",
      answer: (
        <div>
          <div style={{backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🎯 Çfarë është Regularization?</h4>
            <p>Teknika për të parandaluar <strong>overfitting</strong> duke shtuar një term penalizimi në funksionin e kostos.</p>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
            <div style={{border: '2px solid #4CAF50', padding: '15px', borderRadius: '8px'}}>
              <h4 style={{color: '#4CAF50'}}>Ridge Regression (L2)</h4>
              <BlockMath math={String.raw`J(\theta) = MSE + \alpha \sum_{i=1}^{n} \theta_i^2`} />
              <ul>
                <li><strong>Penalizimi:</strong> Katrori i peshave</li>
                <li><strong>Efekti:</strong> Zvogëlon peshat, por nuk i bën 0</li>
                <li><strong>Përdorimi:</strong> Kur të gjitha features janë relevante</li>
                <li><strong>Zgjidhja:</strong> Unikë dhe e qëndrueshme</li>
              </ul>
              <div style={{backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '4px', marginTop: '10px'}}>
                <strong>Shembull:</strong> α = 0.1<br/>
                Weights: [2.5, 1.8, 0.9, 1.2] → [1.2, 0.9, 0.4, 0.6]
              </div>
            </div>
            
            <div style={{border: '2px solid #FF9800', padding: '15px', borderRadius: '8px'}}>
              <h4 style={{color: '#FF9800'}}>Lasso Regression (L1)</h4>
              <BlockMath math={String.raw`J(\theta) = MSE + \alpha \sum_{i=1}^{n} |\theta_i|`} />
              <ul>
                <li><strong>Penalizimi:</strong> Vlera absolute e peshave</li>
                <li><strong>Efekti:</strong> Mund të bëjë disa peshat 0</li>
                <li><strong>Përdorimi:</strong> Feature selection automatike</li>
                <li><strong>Zgjidhja:</strong> Sparse (shumë zero)</li>
              </ul>
              <div style={{backgroundColor: '#fff3e0', padding: '10px', borderRadius: '4px', marginTop: '10px'}}>
                <strong>Shembull:</strong> α = 0.1<br/>
                Weights: [2.5, 1.8, 0.9, 1.2] → [1.8, 1.1, 0, 0.5]
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#f3e5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🔄 Elastic Net: Kombinimi i Ridge dhe Lasso</h4>
            <BlockMath math={String.raw`J(\theta) = MSE + \alpha_1 \sum_{i=1}^{n} \theta_i^2 + \alpha_2 \sum_{i=1}^{n} |\theta_i|`} />
            <p>Merr avantazhet e të dyjave: feature selection + stability</p>
          </div>

          <div style={{backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px'}}>
            <h4>📊 Si të zgjidhni α (alpha)?</h4>
            <ul>
              <li><strong>Cross-validation:</strong> Testoni vlera të ndryshme α</li>
              <li><strong>Learning curves:</strong> Plotoni training vs validation error</li>
              <li><strong>α të vogël:</strong> Pak regularization (risk overfitting)</li>
              <li><strong>α të madh:</strong> Shumë regularization (risk underfitting)</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      id: 13,
      question: "Llogaritja e Output-it në Neural Networks me ReLU",
      answer: (
        <div>
          <div style={{backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🧮 Neural Network me ReLU Activation</h4>
            <p>Llogaritja hap-pas-hapi e output për një rrjet neural me funksionin ReLU.</p>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>📋 Të dhënat e problemit:</h4>
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
              <p><strong>Input:</strong> X = [2, -1, 0.5]</p>
              <p><strong>Weights (W1):</strong> Hidden layer 3×4</p>
              <p><strong>Bias (b1):</strong> [0.1, -0.2, 0.3, 0.0]</p>
              <p><strong>Weights (W2):</strong> Output layer 4×1</p>
              <p><strong>Bias (b2):</strong> [0.2]</p>
              <p><strong>Activation:</strong> ReLU për hidden layer, Linear për output</p>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>⚖️ Weights dhe Bias:</h4>
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
              <p><strong>W1 (3×4):</strong></p>
              <BlockMath math={"W1 = \\begin{bmatrix} 0.5 & -0.3 & 0.8 & 0.2 \\\\ 0.1 & 0.6 & -0.4 & 0.7 \\\\ -0.2 & 0.4 & 0.3 & -0.1 \\end{bmatrix}"} />
              
              <p><strong>W2 (4×1):</strong></p>
              <BlockMath math={"W2 = \\begin{bmatrix} 0.8 \\\\ -0.5 \\\\ 0.3 \\\\ 0.6 \\end{bmatrix}"} />
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>📈 Forward Pass - Hapi 1: Hidden Layer</h4>
            <div style={{backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px'}}>
              <p><strong>Linear transformation:</strong> Z1 = X · W1 + b1</p>
              
              <BlockMath math={"Z1 = [2, -1, 0.5] \\cdot \\begin{bmatrix} 0.5 & -0.3 & 0.8 & 0.2 \\\\ 0.1 & 0.6 & -0.4 & 0.7 \\\\ -0.2 & 0.4 & 0.3 & -0.1 \\end{bmatrix} + [0.1, -0.2, 0.3, 0.0]"} />
              
              <p><strong>Llogaritja:</strong></p>
              <ul>
                <li>Z1[0] = (2×0.5) + (-1×0.1) + 0.5×-0.2 + 0.1 = 1.0 - 0.1 - 0.1 + 0.1 = <strong>0.9</strong></li>
                <li>Z1[1] = (2×-0.3) + (-1×0.6) + 0.5×0.4 + (-0.2) = -0.6 - 0.6 + 0.2 - 0.2 = <strong>-1.2</strong></li>
                <li>Z1[2] = (2×0.8) + (-1×-0.4) + 0.5×0.3 + 0.3 = 1.6 + 0.4 + 0.15 + 0.3 = <strong>2.45</strong></li>
                <li>Z1[3] = (2×0.2) + (-1×0.7) + 0.5×-0.1 + 0.0 = 0.4 - 0.7 - 0.05 + 0.0 = <strong>-0.35</strong></li>
              </ul>
              
              <p><strong>ReLU activation:</strong> A1 = max(0, Z1)</p>
              <p>A1 = [max(0, 0.9), max(0, -1.2), max(0, 2.45), max(0, -0.35)] = <strong>[0.9, 0, 2.45, 0]</strong></p>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>📊 Forward Pass - Hapi 2: Output Layer</h4>
            <div style={{backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px'}}>
              <p><strong>Linear transformation:</strong> Z2 = A1 · W2 + b2</p>
              
              <BlockMath math={"Z2 = [0.9, 0, 2.45, 0] \\cdot \\begin{bmatrix} 0.8 \\\\ -0.5 \\\\ 0.3 \\\\ 0.6 \\end{bmatrix} + 0.2"} />
              
              <p><strong>Llogaritja:</strong></p>
              <p>Z2 = (0.9×0.8) + (0×-0.5) + (2.45×0.3) + (0×0.6) + 0.2</p>
              <p>Z2 = 0.72 + 0 + 0.735 + 0 + 0.2 = <strong>1.655</strong></p>
              
              <p><strong>Output final (Linear activation):</strong></p>
              <div style={{textAlign: 'center', backgroundColor: '#e8f5e9', padding: '20px', borderRadius: '8px', marginTop: '15px'}}>
                <h4 style={{color: '#4caf50'}}>🎯 PËRGJIGJA PËRFUNDIMTARE</h4>
                <p><strong>Output = 1.655</strong></p>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#f3e5f5', padding: '15px', borderRadius: '8px'}}>
            <h4>💡 Karakteristikat e ReLU</h4>
            <ul>
              <li><strong>Formula:</strong> ReLU(x) = max(0, x)</li>
              <li><strong>Avantazhet:</strong> Eliminon vanishing gradient problem, është i shpejtë</li>
              <li><strong>Disavantazhet:</strong> "Dead neurons" kur input është negativ</li>
              <li><strong>Alternative:</strong> Leaky ReLU, ELU, Swish</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      id: 14,
      question: "Decision Trees - Struktura dhe Funksionimi",
      answer: (
        <div>
          <div style={{backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🌳 Çfarë është një Decision Tree?</h4>
            <p>Një model hierarkik që merr vendime duke ndjekur një seri pyetjesh të strukturuara si një pemë.</p>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
            <div style={{border: '2px solid #4CAF50', padding: '15px', borderRadius: '8px'}}>
              <h4 style={{color: '#4CAF50'}}>📊 Komponentët</h4>
              <ul>
                <li><strong>Root Node:</strong> Nyja kryesore (fillimi)</li>
                <li><strong>Internal Nodes:</strong> Pyetjet/testet</li>
                <li><strong>Branches:</strong> Degët (përgjigjet)</li>
                <li><strong>Leaf Nodes:</strong> Gjethet (vendimet finale)</li>
              </ul>
            </div>
            
            <div style={{border: '2px solid #2196F3', padding: '15px', borderRadius: '8px'}}>
              <h4 style={{color: '#2196F3'}}>⚙️ Si Funksionon</h4>
              <ol>
                <li>Fillo nga root node</li>
                <li>Evaluoj kushtin</li>
                <li>Ndjek degën përkatëse</li>
                <li>Përsërit deri në leaf</li>
                <li>Kthe vendimin final</li>
              </ol>
            </div>
          </div>

          <div style={{backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🎯 Shembull Praktik: Vendimi për të dalë jashtë</h4>
            <div style={{fontFamily: 'monospace', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', marginTop: '15px'}}>
              <pre>{`
              Moti i kthjellët?
                    /       \\
                  Po          Jo
                 /              \\
         Temperatura > 20°C?    Shi?
            /        \\          /    \\
          Po          Jo       Po     Jo
         /            \\       /       \\
    [Dal jashtë]  [Qëndro]  [Qëndro] [Mund të dalësh]
              `}</pre>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>📏 Algoritmat e Ndërtimit</h4>
            
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', margin: '10px 0'}}>
              <h5>1. Information Gain (ID3)</h5>
              <BlockMath math={String.raw`IG(S,A) = H(S) - \sum_{v \in Values(A)} \frac{|S_v|}{|S|} H(S_v)`} />
              <p>Ku H(S) është entropy e dataset-it</p>
            </div>

            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', margin: '10px 0'}}>
              <h5>2. Gini Impurity (CART)</h5>
              <BlockMath math={String.raw`Gini(S) = 1 - \sum_{i=1}^{c} p_i^2`} />
              <p>Ku p_i është proporcioni i klasës i</p>
            </div>

            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', margin: '10px 0'}}>
              <h5>3. Gain Ratio (C4.5)</h5>
              <BlockMath math={String.raw`GainRatio(S,A) = \frac{IG(S,A)}{SplitInfo(S,A)}`} />
              <p>Normalizon Information Gain për të shmangur bias-in</p>
            </div>
          </div>

          <div style={{backgroundColor: '#ffebee', padding: '15px', borderRadius: '8px'}}>
            <h4>⚠️ Overfitting dhe Pruning</h4>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px'}}>
              <div>
                <h5>Shkaqet e Overfitting:</h5>
                <ul>
                  <li>Pemë shumë të thella</li>
                  <li>Pak të dhëna për leaf</li>
                  <li>Noise në dataset</li>
                </ul>
              </div>
              <div>
                <h5>Teknikat e Pruning:</h5>
                <ul>
                  <li><strong>Pre-pruning:</strong> Ndalo rritjen e hershme</li>
                  <li><strong>Post-pruning:</strong> Prit degët pas ndërtimit</li>
                  <li><strong>Min samples split:</strong> Minimum të dhëna për split</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 15,
      question: "Dendogram dhe Hierarchical Clustering - Agglomerative Algorithm",
      answer: (
        <div>
          <div style={{backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🌲 Çfarë është një Dendogram?</h4>
            <p>Një diagram i tipit pemë që tregon marrëdhëniet hierarkike midis clusterëve në të dhëna.</p>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>🔄 Agglomerative Clustering Algorithm</h4>
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
              <ol>
                <li><strong>Inicialisht:</strong> Çdo pikë është një cluster i veçantë</li>
                <li><strong>Llogarit:</strong> Distancat midis të gjitha clusterëve</li>
                <li><strong>Bashko:</strong> Dy clusterat më të afërt</li>
                <li><strong>Përditëso:</strong> Matricën e distancave</li>
                <li><strong>Përsërit:</strong> Deri sa të formohet një cluster i vetëm</li>
              </ol>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>📏 Metodat e Linkage</h4>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              <div style={{border: '1px solid #4CAF50', padding: '15px', borderRadius: '8px'}}>
                <h5>Single Linkage</h5>
                <p>Distanca = minimum distance midis pikave</p>
                <BlockMath math={String.raw`d(C_i, C_j) = \min_{x \in C_i, y \in C_j} d(x,y)`} />
                <p>✅ Gjen clustera të çrregullt<br/>❌ Sensitive ndaj noise</p>
              </div>
              
              <div style={{border: '1px solid #FF9800', padding: '15px', borderRadius: '8px'}}>
                <h5>Complete Linkage</h5>
                <p>Distanca = maximum distance midis pikave</p>
                <BlockMath math={String.raw`d(C_i, C_j) = \max_{x \in C_i, y \in C_j} d(x,y)`} />
                <p>✅ Kompakt clustera<br/>❌ Sensitive ndaj outliers</p>
              </div>
              
              <div style={{border: '1px solid '#2196F3', padding: '15px', borderRadius: '8px'}}>
                <h5>Average Linkage</h5>
                <p>Distanca = mesatarja e të gjitha distancave</p>
                <BlockMath math={String.raw`d(C_i, C_j) = \frac{1}{|C_i||C_j|} \sum_{x \in C_i, y \in C_j} d(x,y)`} />
                <p>✅ E balancuar<br/>✅ Rezultate të qëndrueshme</p>
              </div>
              
              <div style={{border: '1px solid '#9C27B0', padding: '15px', borderRadius: '8px'}}>
                <h5>Ward Linkage</h5>
                <p>Minimizon variance brenda clusterit</p>
                <p>✅ Clustera sferë<br/>✅ Shumë efektiv</p>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>📊 Shembull Hap-pas-Hapi</h4>
            <p><strong>Të dhënat:</strong> Pikrat A(1,1), B(2,1), C(4,3), D(5,4)</p>
            
            <div style={{marginTop: '15px'}}>
              <strong>Hapi 1:</strong> Llogaritja e distancave<br/>
              <div style={{fontFamily: 'monospace', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', marginTop: '5px'}}>
                d(A,B) = 1.0, d(A,C) = 3.6, d(A,D) = 5.0<br/>
                d(B,C) = 2.8, d(B,D) = 4.2, d(C,D) = 1.4
              </div>
            </div>
            
            <div style={{marginTop: '15px'}}>
              <strong>Hapi 2:</strong> Bashko A dhe B (distanca më e vogël = 1.0)<br/>
              <strong>Hapi 3:</strong> Bashko C dhe D (distanca = 1.4)<br/>
              <strong>Hapi 4:</strong> Bashko (A,B) dhe (C,D)
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>✂️ Si të Formoni Clustera nga Dendogram</h4>
            <div style={{backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px'}}>
              <h5>Metodat e prerjes:</h5>
              <ol>
                <li><strong>Distance Threshold:</strong> Prit në një lartësi të caktuar</li>
                <li><strong>Number of Clusters:</strong> Përcakto numrin e clusterëve të dëshiruar</li>
                <li><strong>Inconsistency Method:</strong> Bazuar në ndryshimet e mëdha të distancës</li>
              </ol>
              
              <div style={{marginTop: '15px', padding: '10px', backgroundColor: '#f0f8ff', borderRadius: '4px'}}>
                <strong>Shembull:</strong> Nëse prisni dendogram-in në lartësinë 2.5, do të keni 2 clustera:<br/>
                - Cluster 1: {A, B}<br/>
                - Cluster 2: {C, D}
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#f3e5f5', padding: '15px', borderRadius: '8px'}}>
            <h4>💡 Avantazhet dhe Disavantazhet</h4>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              <div>
                <h5>✅ Avantazhet:</h5>
                <ul>
                  <li>Nuk ka nevojë për numrin e clusterëve paraprakisht</li>
                  <li>Dendogram jep insight të plotë</li>
                  <li>Deterministic (gjithmonë i njëjti rezultat)</li>
                  <li>Mund të gjejë clustera të formave të ndryshme</li>
                </ul>
              </div>
              <div>
                <h5>❌ Disavanthet:</h5>
                <ul>
                  <li>Kompleksitet O(n³) - i ngadaltë për dataset të mëdha</li>
                  <li>Sensitive ndaj noise dhe outliers</li>
                  <li>Vështirë të trajtojë dataset të mëdha (>1000 pikra)</li>
                  <li>Nuk mund të "korrigjojë" gabime të hershme</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 16,
      question: "A mund të bëhet reverse procesi i Dimensionality Reduction dhe pse?",
      answer: (
        <div>
          <div style={{backgroundColor: '#ffebee', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>❓ Pyetja Themelore</h4>
            <p>A mund të rikuperojmë të dhënat origjinale nga përfaqësimi i reduktuar në dimensione?</p>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
            <div style={{border: '2px solid #f44336', padding: '15px', borderRadius: '8px'}}>
              <h4 style={{color: '#f44336'}}>❌ Përgjigja e Shkurtër: JO (plotësisht)</h4>
              <p>Informacioni origjinal <strong>nuk mund të rikuperohet plotësisht</strong> sepse ka humbje të informacionit gjatë reduktimit.</p>
            </div>
            
            <div style={{border: '2px solid '#ff9800', padding: '15px', borderRadius: '8px'}}>
              <h4 style={{color: '#ff9800'}}>⚠️ Por... Ka përafrësim</h4>
              <p>Mund të <strong>përafrësojmë</strong> të dhënat origjinale, por jo të na kthejë saktësisht ato që kishim.</p>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>🔍 Analizë për Teknika të Ndryshme</h4>
            
            <div style={{backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', margin: '10px 0'}}>
              <h5>1. Principal Component Analysis (PCA)</h5>
              <div style={{backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', marginTop: '10px'}}>
                <strong>Forward:</strong> X → Z (reduced dimensions)<br/>
                <BlockMath math={String.raw`Z = XW \quad \text{(projektion në PC space)}`} />
                
                <strong>Reverse:</strong> Z → X̂ (approximation)<br/>
                <BlockMath math={String.raw`\hat{X} = ZW^T \quad \text{(back-projection)}`} />
                
                <div style={{backgroundColor: '#fff3e0', padding: '10px', borderRadius: '4px', marginTop: '10px'}}>
                  <strong>Shembull:</strong><br/>
                  Original: [2.1, 3.7, 1.9, 4.2, 0.8] (5D)<br/>
                  Reduced: [1.2, -0.3] (2D)<br/>
                  Reconstructed: [2.0, 3.9, 1.7, 4.0, 0.9] (5D) ≈ origjinal
                </div>
              </div>
            </div>

            <div style={{backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px', margin: '10px 0'}}>
              <h5>2. Autoencoders</h5>
              <div style={{backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', marginTop: '10px'}}>
                <strong>Encoder:</strong> X → Z (latent space)<br/>
                <strong>Decoder:</strong> Z → X̂ (reconstruction)
                
                <div style={{backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '4px', marginTop: '10px'}}>
                  <strong>Avantazhi:</strong> Mësojnë reconstruction në mënyrë optimale<br/>
                  <strong>Disavantazhi:</strong> Prapë ka humbje (reconstruction error)
                </div>
              </div>
            </div>

            <div style={{backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px', margin: '10px 0'}}>
              <h5>3. t-SNE dhe UMAP</h5>
              <div style={{backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', marginTop: '10px'}}>
                <strong>Problemi:</strong> Të optimizuara për vizualizim, jo për reconstruction<br/>
                <strong>Përfundimi:</strong> Reverse është shumë i vështirë ose i pamundur
                
                <div style={{backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', marginTop: '10px', color: '#d32f2f'}}>
                  <strong>⚠️ Kujdes:</strong> t-SNE nuk ruan distancat globale - reverse nuk është i besueshëm
                </div>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>📊 Faktori i Humbjes së Informacionit</h4>
            <BlockMath math={String.raw`\text{Information Loss} = \frac{||\text{Original} - \text{Reconstructed}||^2}{||\text{Original}||^2}`} />
            
            <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '15px'}}>
              <thead>
                <tr style={{backgroundColor: '#e0e0e0'}}>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Teknika</th>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Reverse Possible?</th>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Quality</th>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>PCA</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>✅ Po</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>⭐⭐⭐</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>Data Compression</td>
                </tr>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>Autoencoders</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>✅ Po</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>⭐⭐⭐⭐</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>Denoising</td>
                </tr>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>t-SNE</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>❌ Jo</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>⭐</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>Visualization</td>
                </tr>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>UMAP</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>⚠️ Limituar</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>⭐⭐</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>Visualization</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px'}}>
            <h4>🎯 Përfundimi Praktik</h4>
            <ul>
              <li><strong>Theoretical:</strong> Informacioni humbet gjatë reduktimit - reverse i plotë është i pamundur</li>
              <li><strong>Practical:</strong> Mund të përafrësojmë me sukses për shumë aplikime</li>
              <li><strong>Best Choice:</strong> Autoencoders për reconstruction, PCA për analiza të shpejta</li>
              <li><strong>Kujdes:</strong> Mos përdorni t-SNE për reconstruction - është për vizualizim!</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      id: 17,
      question: "Formula për Q-Learning dhe Reinforcement Learning",
      answer: (
        <div>
          <div style={{backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🎯 Q-Learning: Mësimi i Vlerave të Veprimeve</h4>
            <p>Algoritëm që mëson vlerat e veprimeve (Q-values) për të gjetur strategjinë optimale.</p>
          </div>

          <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>📐 Formula Kryesore e Q-Learning</h4>
            <div style={{textAlign: 'center', backgroundColor: '#e8f5e9', padding: '20px', borderRadius: '8px', marginTop: '15px'}}>
              <BlockMath math={String.raw`Q(s_t, a_t) \leftarrow Q(s_t, a_t) + \alpha \left[ r_{t+1} + \gamma \max_{a'} Q(s_{t+1}, a') - Q(s_t, a_t) \right]`} />
            </div>
            
            <div style={{marginTop: '20px'}}>
              <h5>🔤 Shpjegimi i Simboleve:</h5>
              <ul>
                <li><strong>Q(s,a):</strong> Q-value (vlera e veprimit a në gjendjen s)</li>
                <li><strong>α:</strong> Learning rate (0 < α ≤ 1)</li>
                <li><strong>r:</strong> Reward (shpërblimi i menjëhershëm)</li>
                <li><strong>γ:</strong> Discount factor (0 ≤ γ < 1)</li>
                <li><strong>s:</strong> State (gjendje aktuale)</li>
                <li><strong>a:</strong> Action (veprimi i zgjedhur)</li>
                <li><strong>s':</strong> Next state (gjendje e ardhshme)</li>
              </ul>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>🧮 Shembull Hap-pas-Hapi</h4>
            <div style={{backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px'}}>
              <strong>Skenari:</strong> Robot që mëson të navigojë në një dhomë<br/>
              <strong>Qëllimi:</strong> Të arrijë në destinacion duke shmangur pengesat
              
              <div style={{marginTop: '15px'}}>
                <strong>Parametrat:</strong><br/>
                α = 0.1 (learning rate)<br/>
                γ = 0.9 (discount factor)<br/>
                Q(s,a) initial = 0 për të gjitha kombinimet
              </div>
              
              <div style={{backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', marginTop: '15px'}}>
                <strong>Iteracioni 1:</strong><br/>
                Current state: s₁ = "pozicioni (1,1)"<br/>
                Action: a₁ = "lëviz djathtas"<br/>
                Reward: r = -1 (kosto për lëvizje)<br/>
                Next state: s₂ = "pozicioni (2,1)"<br/>
                
                <div style={{marginTop: '10px'}}>
                  Q(s₁, "djathtas") = 0 + 0.1 × [-1 + 0.9 × max(Q(s₂, të gjitha veprimet)) - 0]<br/>
                  Q(s₁, "djathtas") = 0 + 0.1 × [-1 + 0.9 × 0 - 0] = <strong>-0.1</strong>
                </div>
              </div>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>⚙️ Komponentët Kryesorë</h4>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              <div style={{border: '1px solid #4CAF50', padding: '15px', borderRadius: '8px'}}>
                <h5>🎯 Exploration vs Exploitation</h5>
                <p><strong>ε-greedy strategy:</strong></p>
                <ul>
                  <li>Probability ε: explore (random action)</li>
                  <li>Probability (1-ε): exploit (best known action)</li>
                </ul>
                <BlockMath math={String.raw`a = \begin{cases} \text{random action} & \text{if } \text{rand}() < \varepsilon \\ \arg\max_a Q(s,a) & \text{otherwise} \end{cases}`} />
              </div>
              
              <div style={{border: '1px solid '#FF9800', padding: '15px', borderRadius: '8px'}}>
                <h5>📊 Temporal Difference (TD) Error</h5>
                <p>Ndryshimi midis vlerës së pritur dhe asaj aktuale:</p>
                <BlockMath math={String.raw`\delta = r + \gamma \max_{a'} Q(s', a') - Q(s, a)`} />
                <p>Kjo është pjesa në kllapa në formulën kryesore.</p>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#f3e5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🔧 Variante të Q-Learning</h4>
            
            <div style={{marginBottom: '15px'}}>
              <h5>1. Deep Q-Network (DQN)</h5>
              <p>Përdor neural networks për të aproksimuar Q-function:</p>
              <BlockMath math={String.raw`Q(s, a; \theta) \approx Q^*(s, a)`} />
              <p>Ku θ janë parametrat e neural network</p>
            </div>
            
            <div style={{marginBottom: '15px'}}>
              <h5>2. Double Q-Learning</h5>
              <p>Përdor dy Q-tabela për të reduktuar overestimation bias:</p>
              <BlockMath math={String.raw`Q_1(s, a) \leftarrow Q_1(s, a) + \alpha [r + \gamma Q_2(s', \arg\max_{a'} Q_1(s', a')) - Q_1(s, a)]`} />
            </div>
            
            <div>
              <h5>3. SARSA (State-Action-Reward-State-Action)</h5>
              <p>On-policy alternative to Q-learning:</p>
              <BlockMath math={String.raw`Q(s, a) \leftarrow Q(s, a) + \alpha [r + \gamma Q(s', a') - Q(s, a)]`} />
              <p>Ku a' është veprimi aktual i zgjedhur (jo max)</p>
            </div>
          </div>

          <div style={{backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px'}}>
            <h4>💡 Aplikime Praktike</h4>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              <div>
                <h5>🎮 Gaming</h5>
                <ul>
                  <li>AlphaGo, AlphaStar</li>
                  <li>Atari games</li>
                  <li>Chess engines</li>
                </ul>
              </div>
              <div>
                <h5>🚗 Real World</h5>
                <ul>
                  <li>Autonomous vehicles</li>
                  <li>Trading algorithms</li>
                  <li>Resource allocation</li>
                  <li>Robotics navigation</li>
                </ul>
              </div>
            </div>
            
            <div style={{marginTop: '15px', padding: '10px', backgroundColor: '#f0f8ff', borderRadius: '4px'}}>
              <strong>🔑 Kyç Success Factors:</strong><br/>
              • Sufficient exploration (ε decay strategy)<br/>
              • Appropriate learning rate (α)<br/>
              • Balanced discount factor (γ)<br/>
              • Enough training iterations
            </div>
          </div>
        </div>
      )
    },

    {
      id: 18,
      question: "Grafe për Training dhe Validation Set - Ridge Regression Tuning",
      answer: (
        <div>
          <div style={{backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>📊 Validation Curves për Ridge Regression</h4>
            <p>Vizualizimi i performancës së modelit përmes vlerave të ndryshme të koeficientit Ridge (α).</p>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>🎯 Qëllimi i Analizës</h4>
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
              <ul>
                <li><strong>Bias-Variance Tradeoff:</strong> Gjeni balancën optimale</li>
                <li><strong>Hyperparameter Tuning:</strong> Zgjidhni α më të mirë</li>
                <li><strong>Overfitting Detection:</strong> Identifikoni overfitting dhe underfitting</li>
                <li><strong>Model Selection:</strong> Krahasoni modele të ndryshme</li>
              </ul>
            </div>
          </div>

          <div style={{backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>📈 Si të Krijoni Grafet</h4>
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px', marginTop: '15px'}}>
              <h5>Python Implementation:</h5>
              <pre style={{backgroundColor: '#282c34', color: '#abb2bf', padding: '15px', borderRadius: '8px', fontSize: '12px'}}>
{`import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import validation_curve
from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

# Konfigurimi i pipeline
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('ridge', Ridge())
])

# Range i vlerave për alpha
alpha_range = np.logspace(-4, 2, 50)  # 10^-4 to 10^2

# Llogaritja e validation curves
train_scores, val_scores = validation_curve(
    pipe, X, y, 
    param_name='ridge__alpha', 
    param_range=alpha_range,
    cv=5,  # 5-fold cross validation
    scoring='neg_mean_squared_error'
)

# Llogaritja e mesatarjeve dhe devijimeve
train_mean = -train_scores.mean(axis=1)
train_std = train_scores.std(axis=1)
val_mean = -val_scores.mean(axis=1)
val_std = val_scores.std(axis=1)

# Plotting
plt.figure(figsize=(10, 6))
plt.semilogx(alpha_range, train_mean, 'o-', color='blue', 
             label='Training Score')
plt.fill_between(alpha_range, train_mean - train_std, 
                 train_mean + train_std, alpha=0.1, color='blue')

plt.semilogx(alpha_range, val_mean, 'o-', color='red', 
             label='Validation Score')
plt.fill_between(alpha_range, val_mean - val_std, 
                 val_mean + val_std, alpha=0.1, color='red')

plt.xlabel('Alpha (Regularization Strength)')
plt.ylabel('Mean Squared Error')
plt.title('Validation Curve for Ridge Regression')
plt.legend()
plt.grid(True)
plt.show()`}
              </pre>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>📊 Interpretimi i Grafeve</h4>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px'}}>
              <div style={{border: '2px solid #f44336', padding: '15px', borderRadius: '8px'}}>
                <h5 style={{color: '#f44336'}}>🔴 α shumë i vogël</h5>
                <ul style={{fontSize: '14px'}}>
                  <li>Pak regularization</li>
                  <li>Training error i ulët</li>
                  <li>Validation error i lartë</li>
                  <li><strong>Overfitting!</strong></li>
                </ul>
                <div style={{backgroundColor: '#ffebee', padding: '8px', borderRadius: '4px', marginTop: '10px'}}>
                  Gap i madh midis kurbave
                </div>
              </div>
              
              <div style={{border: '2px solid #4CAF50', padding: '15px', borderRadius: '8px'}}>
                <h5 style={{color: '#4CAF50'}}>🟢 α optimal</h5>
                <ul style={{fontSize: '14px'}}>
                  <li>Balancë e mirë</li>
                  <li>Validation error minimal</li>
                  <li>Gap i vogël</li>
                  <li><strong>Sweet spot!</strong></li>
                </ul>
                <div style={{backgroundColor: '#e8f5e9', padding: '8px', borderRadius: '4px', marginTop: '10px'}}>
                  Punkt ku validation error është minimal
                </div>
              </div>
              
              <div style={{border: '2px solid '#FF9800', padding: '15px', borderRadius: '8px'}}>
                <h5 style={{color: '#FF9800'}}>🟡 α shumë i madh</h5>
                <ul style={{fontSize: '14px'}}>
                  <li>Shumë regularization</li>
                  <li>Training error i lartë</li>
                  <li>Validation error i lartë</li>
                  <li><strong>Underfitting!</strong></li>
                </ul>
                <div style={{backgroundColor: '#fff3e0', padding: '8px', borderRadius: '4px', marginTop: '10px'}}>
                  Të dyja kurbet janë të larta
                </div>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#f3e5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>📋 Shembull Rezultatesh</h4>
            <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '15px'}}>
              <thead>
                <tr style={{backgroundColor: '#e0e0e0'}}>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Alpha (α)</th>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Training MSE</th>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Validation MSE</th>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Interpretim</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>0.001</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>0.15</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>0.45</td>
                  <td style={{border: '1px solid #ddd', padding: '8px', color: '#f44336'}}>Overfitting</td>
                </tr>
                <tr style={{backgroundColor: '#e8f5e9'}}>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}><strong>0.1</strong></td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}><strong>0.22</strong></td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}><strong>0.25</strong></td>
                  <td style={{border: '1px solid #ddd', padding: '8px', color: '#4CAF50'}}><strong>Optimal!</strong></td>
                </tr>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>1.0</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>0.35</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>0.38</td>
                  <td style={{border: '1px solid #ddd', padding: '8px', color: '#FF9800'}}>Balanced</td>
                </tr>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>100</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>0.65</td>
                  <td style={{border: '1px solid #ddd', padding: '8px'}}>0.68</td>
                  <td style={{border: '1px solid #ddd', padding: '8px', color: '#f44336'}}>Underfitting</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px'}}>
            <h4>🎯 Vendimi Final</h4>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              <div>
                <h5>✅ Kritere për Zgjedhjen e α:</h5>
                <ul>
                  <li>Gjeni balancën midis bias dhe variance</li>
                  <li>Shikoni për overfitting ose underfitting</li>
                  <li>Zgjidhni α që minimizon validation error</li>
                </ul>
              </div>
              
              <div>
                <h5>📈 Monitorimi i Performancës:</h5>
                <ul>
                  <li>Përdorni validation curves për të vizualizuar performancën</li>
                  <li>Kontrolloni për stabilitetin e modelit</li>
                  <li>Sigurohuni që të dhënat e testit të kenë performancë të ngjashme</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 19,
      question: "Llogaritja e Output në Neural Networks me ReLU",
      answer: (
        <div>
          <div style={{backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🧮 Neural Network me ReLU Activation</h4>
            <p>Llogaritja hap-pas-hapi e output për një rrjet neural me funksionin ReLU.</p>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>📋 Të dhënat e problemit:</h4>
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
              <p><strong>Input:</strong> X = [2, -1, 0.5]</p>
              <p><strong>Weights (W1):</strong> Hidden layer 3×4</p>
              <p><strong>Bias (b1):</strong> [0.1, -0.2, 0.3, 0.0]</p>
              <p><strong>Weights (W2):</strong> Output layer 4×1</p>
              <p><strong>Bias (b2):</strong> [0.2]</p>
              <p><strong>Activation:</strong> ReLU për hidden layer, Linear për output</p>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>⚖️ Weights dhe Bias:</h4>
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
              <p><strong>W1 (3×4):</strong></p>
              <BlockMath math={"W1 = \\begin{bmatrix} 0.5 & -0.3 & 0.8 & 0.2 \\\\ 0.1 & 0.6 & -0.4 & 0.7 \\\\ -0.2 & 0.4 & 0.3 & -0.1 \\end{bmatrix}"} />
              
              <p><strong>W2 (4×1):</strong></p>
              <BlockMath math={"W2 = \\begin{bmatrix} 0.8 \\\\ -0.5 \\\\ 0.3 \\\\ 0.6 \\end{bmatrix}"} />
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>📈 Forward Pass - Hapi 1: Hidden Layer</h4>
            <div style={{backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px'}}>
              <p><strong>Linear transformation:</strong> Z1 = X · W1 + b1</p>
              
              <BlockMath math={"Z1 = [2, -1, 0.5] \\cdot \\begin{bmatrix} 0.5 & -0.3 & 0.8 & 0.2 \\\\ 0.1 & 0.6 & -0.4 & 0.7 \\\\ -0.2 & 0.4 & 0.3 & -0.1 \\end{bmatrix} + [0.1, -0.2, 0.3, 0.0]"} />
              
              <p><strong>Llogaritja:</strong></p>
              <ul>
                <li>Z1[0] = (2×0.5) + (-1×0.1) + 0.5×-0.2 + 0.1 = 1.0 - 0.1 - 0.1 + 0.1 = <strong>0.9</strong></li>
                <li>Z1[1] = (2×-0.3) + (-1×0.6) + 0.5×0.4 + (-0.2) = -0.6 - 0.6 + 0.2 - 0.2 = <strong>-1.2</strong></li>
                <li>Z1[2] = (2×0.8) + (-1×-0.4) + 0.5×0.3 + 0.3 = 1.6 + 0.4 + 0.15 + 0.3 = <strong>2.45</strong></li>
                <li>Z1[3] = (2×0.2) + (-1×0.7) + 0.5×-0.1 + 0.0 = 0.4 - 0.7 - 0.05 + 0.0 = <strong>-0.35</strong></li>
              </ul>
              
              <p><strong>ReLU activation:</strong> A1 = max(0, Z1)</p>
              <p>A1 = [max(0, 0.9), max(0, -1.2), max(0, 2.45), max(0, -0.35)] = <strong>[0.9, 0, 2.45, 0]</strong></p>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>📊 Forward Pass - Hapi 2: Output Layer</h4>
            <div style={{backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px'}}>
              <p><strong>Linear transformation:</strong> Z2 = A1 · W2 + b2</p>
              
              <BlockMath math={"Z2 = [0.9, 0, 2.45, 0] \\cdot \\begin{bmatrix} 0.8 \\\\ -0.5 \\\\ 0.3 \\\\ 0.6 \\end{bmatrix} + 0.2"} />
              
              <p><strong>Llogaritja:</strong></p>
              <p>Z2 = (0.9×0.8) + (0×-0.5) + (2.45×0.3) + (0×0.6) + 0.2</p>
              <p>Z2 = 0.72 + 0 + 0.735 + 0 + 0.2 = <strong>1.655</strong></p>
              
              <p><strong>Output final (Linear activation):</strong></p>
              <div style={{textAlign: 'center', backgroundColor: '#e8f5e9', padding: '20px', borderRadius: '8px', marginTop: '15px'}}>
                <h4 style={{color: '#4caf50'}}>🎯 PËRGJIGJA PËRFUNDIMTARE</h4>
                <p><strong>Output = 1.655</strong></p>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#f3e5f5', padding: '15px', borderRadius: '8px'}}>
            <h4>💡 Karakteristikat e ReLU</h4>
            <ul>
              <li><strong>Formula:</strong> ReLU(x) = max(0, x)</li>
              <li><strong>Avantazhet:</strong> Eliminon vanishing gradient problem, është i shpejtë</li>
              <li><strong>Disavantazhet:</strong> "Dead neurons" kur input është negativ</li>
              <li><strong>Alternative:</strong> Leaky ReLU, ELU, Swish</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      id: 20,
      question: "Çfarë është Overfitting dhe si mund ta parandalojmë?",
      answer: (
        <div>
          <div style={{backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>📉 Overfitting në Machine Learning</h4>
            <p>Kur modeli mëson detajet dhe zhurmën në të dhëna deri në një pikë që ndikon negativisht performancën në të dhëna të reja.</p>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>🔍 Si e identifikojmë Overfitting-un?</h4>
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
              <ul>
                <li><strong>Training Error:</strong> Shumë i ulët (modeli është shumë i përshtatur në të dhënat e trajnimit)</li>
                <li><strong>Validation Error:</strong> Rritet pas një pikë (modeli fillon të generalizojë keq)</li>
                <li><strong>Grafiku i Performancës:</strong> Training curve dhe validation curve divergojnë</li>
              </ul>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>🛠️ Si ta parandalojmë Overfitting-un?</h4>
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
              <ul>
                <li><strong>Regularization:</strong> Shtoni një term penalizimi (L1, L2, ose Elastic Net)</li>
                <li><strong>Cross-validation:</strong> Përdorni teknika si k-fold cross-validation</li>
                <li><strong>Early stopping:</strong> Ndalo trajnimin kur performanca në validation set fillon të përkeqësohet</li>
                <li><strong>Reduktimi i kompleksitetit të modelit:</strong> Zgjidhni një model më të thjeshtë</li>
                <li><strong>Data augmentation:</strong> Krijoni variacione të reja të të dhënave ekzistuese</li>
              </ul>
            </div>
          </div>

          <div style={{backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px'}}>
            <h4>📈 Shembuj të Overfitting dhe Si të Shmangni</h4>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              <div style={{border: '1px solid #f44336', padding: '15px', borderRadius: '8px'}}>
                <h5 style={{color: '#f44336'}}>🔴 Shembulli i 1: Modeli i Madh</h5>
                <p>Një model shumë i thellë ose kompleks për një dataset të vogël.</p>
                <BlockMath math={String.raw`f(x) = w_1x + w_2x^2 + ... + w_nx^n`} />
                <p><strong>Solucion:</strong> Përdorni një model më të thjeshtë (p.sh. reduktoni numrin e karakteristikave)</p>
              </div>
              
              <div style={{border: '1px solid #4CAF50', padding: '15px', borderRadius: '8px'}}>
                <h5 style={{color: '#4CAF50'}}>🟢 Shembulli i 2: Regularization i Duhur</h5>
                <p>Përdorimi i Ridge Regression për të reduktuar overfitting-un.</p>
                <BlockMath math={String.raw`J(\theta) = MSE + \alpha \sum_{i=1}^{n} \theta_i^2`} />
                <p><strong>Rezultati:</strong> Modeli më i thjeshtë dhe më i përgjegjshëm</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    {
      id: 21,
      question: "Tri grafe (tri lakore) për Precision-Recall Analysis",
      answer: (
        <div>
          <div style={{backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>📊 Precision-Recall Curve Analysis</h4>
            <p>Krahasimi i performancës së modeleve përmes precision-recall curves.</p>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>🎯 Çfarë është Precision-Recall Curve?</h4>
            <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
              <p><strong>Precision:</strong> TP / (TP + FP) - Saktësia e parashikimeve pozitive</p>
              <p><strong>Recall:</strong> TP / (TP + FN) - Përqindja e të gjitha pozitivëve të vërteta që janë gjetur</p>
            </div>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>📈 Interpretimi i Tre Modeleve</h4>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px'}}>
              <div style={{border: '2px solid #4CAF50', padding: '15px', borderRadius: '8px'}}>
                <h5>🟢 Model A (Optimal)</h5>
                <ul>
                  <li>Curve më afër këndit të sipërm të majtë</li>
                  <li>AUC-PR ≈ 0.95</li>
                  <li>Precision e lartë në recall të lartë</li>
                  <li><strong>Zgjidhja më e mirë</strong></li>
                </ul>
              </div>
              
              <div style={{border: '2px solid #FF9800', padding: '15px', borderRadius: '8px'}}>
                <h5>🟡 Model B (Mesatar)</h5>
                <ul>
                  <li>Performancë e moderuar</li>
                  <li>AUC-PR ≈ 0.75</li>
                  <li>Trade-off i balancuar</li>
                  <li>Alternativë e pranueshme</li>
                </ul>
              </div>
              
              <div style={{border: '2px solid #f44336', padding: '15px', borderRadius: '8px'}}>
                <h5>🔴 Model C (I dobët)</h5>
                <ul>
                  <li>Curve më afër baseline-it</li>
                  <li>AUC-PR ≈ 0.45</li>
                  <li>Precision bie shpejt me rritjen e recall</li>
                  <li>Nuk rekomandohet</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{backgroundColor: '#fff3e0', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>🔍 Si të Zgjidhni Modelin më të Mirë</h4>
            <ol>
              <li><strong>AUC-PR (Area Under Curve):</strong> Sa më e lartë, aq më mirë</li>
              <li><strong>F1-Score maksimal:</strong> Harmonic mean i precision dhe recall</li>
              <li><strong>Threshold optimal:</strong> Pikë që maksimizuon objektivin tuaj</li>
              <li><strong>Business requirements:</strong> A është precision apo recall më e rëndësishme?</li>
            </ol>
          </div>

          <div style={{backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px'}}>
            <h4>💡 Aplikimi Praktik</h4>
            <p><strong>Shembull:</strong> Në detektimin e email spam:</p>
            <ul>
              <li><strong>High Precision:</strong> Pakica e email-ave të shënuara si spam janë vërtet spam</li>
              <li><strong>High Recall:</strong> Pjesa më e madhe e spam-it kapet nga filtri</li>
              <li><strong>Trade-off:</strong> Precision e lartë mund të lëjë disa spam të kalojnë, recall i lartë mund të bllokojë email-a të vlefshme</li>
            </ul>
          </div>
        </div>
      )
    },

    {
      id: 21,
      question: "Llogaritja e Accuracy, Precision, Recall dhe F1-Score",
      answer: (
        <div>
          <div style={{backgroundColor: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
            <h4>📊 Metriken e Evaluimit të Modelit</h4>
            <p>Llogaritja hap-pas-hapi e metrikave kryesore të performancës.</p>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>📋 Confusion Matrix</h4>
            <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '15px'}}>
              <thead>
                <tr style={{backgroundColor: '#f5f5f5'}}>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}></th>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Predicted Positive</th>
                  <th style={{border: '1px solid #ddd', padding: '8px'}}>Predicted Negative</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px', fontWeight: 'bold'}}>Actual Positive</td>
                  <td style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#e8f5e9'}}>TP = 85</td>
                  <td style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#ffebee'}}>FN = 15</td>
                </tr>
                <tr>
                  <td style={{border: '1px solid #ddd', padding: '8px', fontWeight: 'bold'}}>Actual Negative</td>
                  <td style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#ffebee'}}>FP = 20</td>
                  <td style={{border: '1px solid #ddd', padding: '8px', backgroundColor: '#e8f5e9'}}>TN = 880</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4>🧮 Formulat dhe Llogaritjet</h4>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
                <h5>1. Accuracy</h5>
                <BlockMath math={"\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN}"} />
                <p><strong>Llogaritja:</strong></p>
                <p>Accuracy = (85 + 880) / (85 + 880 + 20 + 15) = 965/1000 = <strong>0.965 (96.5%)</strong></p>
              </div>
              
              <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
                <h5>2. Precision</h5>
                <BlockMath math={"\\text{Precision} = \\frac{TP}{TP + FP}"} />
                <p><strong>Llogaritja:</strong></p>
                <p>Precision = 85 / (85 + 20) = 85/105 = <strong>0.810 (81.0%)</strong></p>
              </div>
              
              <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
                <h5>3. Recall (Sensitivity)</h5>
                <BlockMath math={"\\text{Recall} = \\frac{TP}{TP + FN}"} />
                <p><strong>Llogaritja:</strong></p>
                <p>Recall = 85 / (85 + 15) = 85/100 = <strong>0.850 (85.0%)</strong></p>
              </div>
              
              <div style={{backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px'}}>
                <h5>4. F1-Score (Balancimi)</h5>
              >
                {showAnswers[q.id] ? 'Fshih Përgjigjen' : 'Shfaq Përgjigjen'}
              </button>
              
              {showAnswers[q.id] && (
                <div className="solution" style={{border: '2px solid #4CAF50', borderRadius: '8px', padding: '20px'}}>
                  {q.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          // Show single question
          <div className="exercise">
            <h3>Pyetja {questions[currentQuestion].id}: {questions[currentQuestion].question}</h3>
            
            <button 
              className="show-solution" 
              onClick={() => toggleAnswer(questions[currentQuestion].id)}
              style={{marginBottom: '20px'}}
            >
              {showAnswers[questions[currentQuestion].id] ? 'Fshih Përgjigjen' : 'Shfaq Përgjigjen'}
            </button>
            
            {showAnswers[questions[currentQuestion].id] && (
              <div className="solution" style={{border: '2px solid #4CAF50', borderRadius: '8px', padding: '20px'}}>
                {questions[currentQuestion].answer}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{marginTop: '40px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px'}}>
        <h3>📋 Përmbledhje e Temave:</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
          <ul>
            <li>1. Gradient Descent vs Gradient Ascent</li>
            <li>2. Decision Trees - Pro dhe Kundër</li>
            <li>3. Dimension Reduction - PCA & t-SNE</li>
            <li>4. Supervised vs Unsupervised Learning</li>
            <li>5. Linearly Separable Data Algorithms</li>
          </ul>
          <ul>
            <li>6. KNN Regression dhe vlera e k</li>
            <li>7. Feature Scaling për SVM</li>
            <li>8. Multi-Head Attention në Transformers</li>
            <li>9. Autoencoders dhe llojet e tyre</li>
            <li>10. Neural Network Forward Pass</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MachineLearningTest;