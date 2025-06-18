import React from 'react';

const QuizMode = () => {
  const additionalQuestions = [
    "1. Stochastic gradient descent dhe batch stochastic gradient descent, çka janë shembuj trajnimi?",
    "2. Ridge dhe lasso, çfarë janë dhe si funksionojnë?",
    "3. Si llogaritet outputi nëse i jepen weights dhe inputi në neural networks, duke përdorur funksionin ReLU?",
    "4. Çfarë është një decision tree dhe si funksionon?",
    "5. Si të vizatoni një dendogram dhe të formoni disa clustera në bazë të algoritmit agglomerative?",
    "6. A mund të bëhet procesi i reversimit të dimensionality reduction dhe pse?",
    "7. Cila është formula për Q learning?",
    "8. Grafiku për training dhe validation set për vlera të ndryshme të koeficientëve ridge, duke treguar cili është më i mirë?",
    "9. Tri grafe (tri lakore) ku në boshtin x është precision dhe në boshtin y është recall, dhe si të zgjidhni cili model ka qenë më i miri?",
    "10. Si të llogariten accuracy, precision, recall dhe balancimi?",
    "11. Çfarë është overfitting dhe si mund të shmanget atëherë kur trajnohet një model?",
    "12. Shpjegoni konceptin e 'cross-validation' dhe pse është i rëndësishëm.",
    "13. Çfarë bën funksioni 'dropout' në një rrjet nervor?",
    "14. Si ndihmon normalizimi i të dhënave në përmirësimin e performancës së modelit?",
    "15. Çfarë është një 'confusion matrix' dhe si interpretohet ajo?',
    "16. Si funksionon algoritmi i k-nearest neighbors (k-NN)?",
    "17. Çfarë është një 'support vector machine' (SVM) dhe si përdoret për klasifikim?",
    "18. Shpjegoni dallimin midis klasifikimit dhe regresionit në mësimin e makinerive.",
    "19. Çfarë është një 'neural network' dhe si ndryshon nga një rrjet i zakonshëm?",
    "20. Si ndihmon 'feature scaling' në përmirësimin e saktësisë së modelit?"
  ];

  return (
    <div className="quiz-container">
      <h2>Quiz Mode</h2>
      <p>Test your knowledge with these questions.</p>
      <ul>
        {additionalQuestions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuizMode;