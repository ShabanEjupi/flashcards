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
              <div style={{border: '2px solid '#FF9800', padding: '20px', borderRadius: '8px', backgroundColor: '#FFF3E0'}}>
                <p><strong>Nuk ka target labels</strong></p>
                <ul style={{textAlign: 'left'}}>
                  <li>K-Means Clustering</li>
                  <li>Hierarchical Clustering</li>
                  <li>PCA</li>
                  <li>t-SNE</li>
                  <li>Autoencoders</li>
                  <li>DBSCAN</li>
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

            <div style={{border: '1px solid '#FF9800', padding: '15px', borderRadius: '8px'}}>
              <h5>3. Logistic Regression</h5>
              <p>Me iterime të mjaftueshme në të dhëna separable</p>
              <BlockMath math={String.raw`P(y=1) = \frac{1}{1 + e^{-(w^T x + b)}}`} />
            </div>

            <div style={{border: '1px solid '#9C27B0', padding: '15px', borderRadius: '8px'}}>
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

              <div style={{border: '2px solid '#ff9800', padding: '15px', borderRadius: '8px'}}>
                <h5>🎯 Latent Space</h5>
                <p>Përfaqësimi i kompresuar</p>
                <div style={{backgroundColor: '#fff3e0', padding: '10px', borderRadius: '4px', margin: '10px 0'}}>
                  <strong>32 dimensions</strong>
                </div>
                <p>Informacioni esencial</p>
              </div>

              <div style={{border: '2px solid '#4caf50', padding: '15px', borderRadius: '8px'}}>
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
    }
  ];

  return (
    <div className="math-module-container">
      <h2>Machine Learning Test</h2>
      <p style={{textAlign: 'center', marginBottom: '30px', fontSize: '18px', color: '#666'}}>
        Test i plotë për Machine Learning me 10 pyetje të detajuara
      </p>

      <div className="chapter-navigation">
        <button 
          className={showAllQuestions ? '' : 'active'}
          onClick={() => setShowAllQuestions(false)}
        >
          Pyetje të Veçanta
        </button>
        <button 
          className={showAllQuestions ? 'active' : ''}
          onClick={() => setShowAllQuestions(true)}
        >
          Të Gjitha Pyetjet
        </button>
      </div>

      {!showAllQuestions && (
        <div style={{textAlign: 'center', marginBottom: '20px'}}>
          <div className="navigation">
            <button 
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              ← Pyetja e Mëparshme
            </button>
            <span style={{margin: '0 20px', fontSize: '18px', fontWeight: 'bold'}}>
              Pyetja {currentQuestion + 1} nga {questions.length}
            </span>
            <button 
              onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
              disabled={currentQuestion === questions.length - 1}
            >
              Pyetja e Ardhshme →
            </button>
          </div>
        </div>
      )}

      <div className="chapter-content">
        {showAllQuestions ? (
          // Show all questions
          questions.map((q) => (
            <div key={q.id} className="exercise" style={{marginBottom: '40px'}}>
              <h3>Pyetja {q.id}: {q.question}</h3>
              
              <button 
                className="show-solution" 
                onClick={() => toggleAnswer(q.id)}
                style={{marginBottom: '20px'}}
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