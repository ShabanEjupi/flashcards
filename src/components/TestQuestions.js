const TestQuestions = () => {
  const questions = [
    {
      question: "Qa dallon gradient descent me gradient ascent?",
      answer: "Gradient descent is an optimization algorithm used to minimize a function by iteratively moving in the direction of the steepest descent, while gradient ascent is used to maximize a function by moving in the direction of the steepest ascent."
    },
    {
      question: "3 avantazhe dhe 3 disavantazhe te descent tree?",
      answer: "Avantazhet: 1) Lehtësisht interpretuese, 2) Mund të trajtojë të dhëna të përziera, 3) Nuk kërkon normalizim të të dhënave. Disavantazhet: 1) Prirja për overfitting, 2) Ndjeshmëri ndaj ndryshimeve të vogla në të dhëna, 3) Mund të jetë joefikas për dataset të mëdha."
    },
    {
      question: "Dy detyra me rretheku per dimension reduction?",
      answer: "1) Përdorimi i PCA (Principal Component Analysis) për të reduktuar dimensionet e të dhënave, 2) Përdorimi i t-SNE për vizualizimin e të dhënave me dimensione të larta në një hapësirë të ulët."
    },
    {
      question: "Ni detyre me graf me e qellu cila o supervised cila unsupervised?",
      answer: "Krijoni një graf që tregon dallimin midis algoritmeve të mësimit të mbikëqyrur (si regresioni linear) dhe atyre të mësimit të pa mbikëqyrur (si k-means clustering)."
    },
    {
      question: "Ni dataset vwa me plusa minusa edhe outputa -1 1 dhe me i përmend 4 algorime që ju del accuracy 100 përqind në këtë rast?",
      answer: "1) Logistic Regression, 2) Support Vector Machine, 3) Decision Tree, 4) k-Nearest Neighbors."
    },
    {
      question: "Me vizatu funksionin e KNN regression për vlera të ndryshme të k?",
      answer: "Vizato funksionin e KNN duke ndryshuar vlerat e k dhe shiko si ndikon në parashikimet e modelit."
    },
    {
      question: "Pse duhet të bëhet scaling para aplikimit të SVM algorithm?",
      answer: "Scaling është e nevojshme sepse SVM është ndjeshëm ndaj shkallës së të dhënave; pa scaling, karakteristikat me vlera më të mëdha do të ndikojnë më shumë në vendimet e modelit."
    },
    {
      question: "Multi head attention - struktura, vizualizimi e plot sene për to me shkru?",
      answer: "Multi-head attention është një mekanizëm në rrjetet neuronale që lejon modelin të fokusohet në pjesë të ndryshme të sekuencës së inputit në mënyrë të pavarur."
    },
    {
      question: "Diqka për autoencoders?",
      answer: "Autoencoders janë rrjete neuronale që mësojnë të kodojnë të dhënat në një përfaqësim më të ulët dimensional dhe pastaj të rikonstruktojnë të dhënat origjinale nga ky përfaqësim."
    },
    {
      question: "Ni detyre sikur në qershor me llogaritë outputin për neural networks?",
      answer: "Krijoni një detyrë që kërkon llogaritjen e outputit të një rrjeti neuronale duke përdorur një dataset të dhënë dhe duke aplikuar funksionin e aktivizimit."
    }
  ];

  return (
    <div className="test-questions">
      <h2>Test Questions</h2>
      <ul>
        {questions.map((q, index) => (
          <li key={index}>
            <strong>{q.question}</strong><br />
            {q.answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestQuestions;