import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const MatrixExercisesMobile = () => {
  const [activeCategory, setActiveCategory] = useState('idempotent');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  
  // Përkufizimi i detyrave për secilën kategori
  const exercises = {
    idempotent: [
      {
        id: 49,
        question: "A është matrica idempotentet?",
        matrix: "\\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix}",
        options: ["Po", "Jo"],
        answer: "Jo",
        solution: "Llogarisim A^2:\\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix} \\cdot \\begin{bmatrix} 0 & 1 \\\\ 0 & 0 \\end{bmatrix} = \\begin{bmatrix} 0 & 0 \\\\ 0 & 0 \\end{bmatrix}\\neq A"
      },
      {
        id: 50,
        question: "A është matrica idempotentet?",
        matrix: "\\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}",
        options: ["Po", "Jo"],
        answer: "Po",
        solution: "Llogarisim A^2:\\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix} \\cdot \\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 0 \\end{bmatrix}= A"
      },
      {
        id: 51,
        question: "A është matrica idempotentet?",
        matrix: "\\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix}",
        options: ["Po", "Jo"],
        answer: "Jo",
        solution: "Llogarisim A^2:\\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix} \\cdot \\begin{bmatrix} 2 & 1 \\\\ 3 & 2 \\end{bmatrix} = \\begin{bmatrix} 2\\cdot2 + 1\\cdot3 & 2\\cdot1 + 1\\cdot2 \\\\ 3\\cdot2 + 2\\cdot3 & 3\\cdot1 + 2\\cdot2 \\end{bmatrix} = \\begin{bmatrix} 4+3 & 2+2 \\\\ 6+6 & 3+4 \\end{bmatrix} = \\begin{bmatrix} 7 & 4 \\\\ 12 & 7 \\end{bmatrix}\\neq A"
      },
      {
        id: 52,
        question: "A është matrica idempotentet?",
        matrix: "\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix}",
        options: ["Po", "Jo"],
        answer: "Po",
        solution: "Llogarisim A^2:\\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} \\cdot \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = A"
      },
      {
        id: 53,
        question: "A është matrica idempotentet?",
        matrix: "\\begin{bmatrix} 0 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 1 & 0 & 0 \\end{bmatrix}",
        options: ["Po", "Jo"],
        answer: "Jo",
        solution: "Llogarisim A^2:\\begin{bmatrix} 0 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 1 & 0 & 0 \\end{bmatrix} \\cdot \\begin{bmatrix} 0 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 1 & 0 & 0 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{bmatrix}\\neq A"
      },
      {
        id: 54,
        question: "A është matrica idempotentet?",
        matrix: "\\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix}",
        options: ["Po", "Jo"],
        answer: "Po",
        solution: "Llogarisim A^2:\\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} \\cdot \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} = \\begin{bmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} = A"
      },
      {
        id: 55,
        question: "Cilat janë vlerat e a dhe b për të cilat matrica është idempotentet?",
        matrix: "\\begin{bmatrix} 1 & a \\\\ 0 & b \\end{bmatrix}",
        options: [
          "a=0, b=0", 
          "a çfarëdo, b=0", 
          "a=0, b=1", 
          "Të gjitha opsionet e mësipërme"
        ],
        answer: "Të gjitha opsionet e mësipërme",
        solution: "Llogarisim A^2:\\begin{bmatrix} 1 & a \\\\ 0 & b \\end{bmatrix} \\cdot \\begin{bmatrix} 1 & a \\\\ 0 & b \\end{bmatrix} = \\begin{bmatrix} 1 & a+ab \\\\ 0 & b^2 \\end{bmatrix}. Për të qenë A idempotentet, duhet të kemi: A^2=A. Pra: a+ab=a dhe b^2=b. Nga ekuacioni i parë: ab=0, që do të thotë a=0 ose b=0. Nga ekuacioni i dytë: b(b-1)=0, që do të thotë b=0 ose b=1. Kështu që zgjidhjet janë: a=0, b=0 ose a çfarëdo, b=0 ose a=0, b=1."
      },
      {
        id: 57,
        question: "Nëse A është matricë idempotentet dhe e invertueshme, atëherë:",
        matrix: "",
        options: ["A = I", "A² = I", "A = 0", "A = A^T"],
        answer: "A = I",
        solution: "Nga A^2 = A, kemi: A^2 - A = 0 ose A(A - I) = 0. Meqenëse A është e invertueshme, A ≠ 0. Prandaj, A - I = 0, që do të thotë A = I."
      },
      {
        id: 58,
        question: "A është idempotentet vetëm dhe vetëm nëse:",
        matrix: "",
        options: ["A^T është idempotentet", "A^{-1} është idempotentet", "A^2 = I", "A = I"],
        answer: "A^T është idempotentet",
        solution: "Nëse A është idempotentet, pra A^2 = A, atëherë (A^T)^2 = A^T \\cdot A^T = (A\\cdot A)^T = (A^2)^T = A^T. Dhe anasjelltas, nëse A^T është idempotentet, atëherë A^2 = A duke përdorur të njëjtin arsyetim."
      },
      {
        id: 59,
        question: "Nëse A dhe B janë idempotentet dhe AB = BA, atëherë:",
        matrix: "",
        options: ["AB është idempotentet", "A + B është idempotentet", "A - B është idempotentet", "Asnjë nga këto"],
        answer: "AB është idempotentet",
        solution: "(AB)^2 = AB \\cdot AB = A(BA)B = A(AB)B = A^2B^2 = A \\cdot B = AB"
      }
    ],
    stochastic: [
      {
        id: "stochastic1",
        question: "Llogarisni numrin e abonentëve pas një viti:",
        context: "Matrica e tranzicionit është: \\begin{bmatrix} 0.70 & 0.15 & 0.15 \\\\ 0.20 & 0.80 & 0.15 \\\\ 0.10 & 0.05 & 0.70 \\end{bmatrix}",
        initialState: "\\begin{bmatrix} 15,000 \\\\ 20,000 \\\\ 65,000 \\end{bmatrix}",
        options: [
          "\\begin{bmatrix} 23,250 \\\\ 28,750 \\\\ 48,000 \\end{bmatrix}",
          "\\begin{bmatrix} 24,500 \\\\ 27,000 \\\\ 48,500 \\end{bmatrix}",
          "\\begin{bmatrix} 22,000 \\\\ 30,000 \\\\ 48,000 \\end{bmatrix}",
        ],
        answer: "\\begin{bmatrix} 23,250 \\\\ 28,750 \\\\ 48,000 \\end{bmatrix}",
        solution: "Shumëzojmë matricën e tranzicionit me vektorin fillestar: P \\cdot X = \\begin{bmatrix} 0.70 & 0.15 & 0.15 \\\\ 0.20 & 0.80 & 0.15 \\\\ 0.10 & 0.05 & 0.70 \\end{bmatrix} \\cdot \\begin{bmatrix} 15,000 \\\\ 20,000 \\\\ 65,000 \\end{bmatrix} = \\begin{bmatrix} 10,500 + 3,000 + 9,750 \\\\ 3,000 + 16,000 + 9,750 \\\\ 1,500 + 1,000 + 45,500 \\end{bmatrix} = \\begin{bmatrix} 23,250 \\\\ 28,750 \\\\ 48,000 \\end{bmatrix}"
      },
      {
        id: "stochastic2",
        question: "Pas 3 vitesh, numri i abonentëve do të jetë:",
        context: "Matrica e tranzicionit është: \\begin{bmatrix} 0.70 & 0.15 & 0.15 \\\\ 0.20 & 0.80 & 0.15 \\\\ 0.10 & 0.05 & 0.70 \\end{bmatrix}",
        initialState: "\\begin{bmatrix} 15,000 \\\\ 20,000 \\\\ 65,000 \\end{bmatrix}",
        options: [
          "\\begin{bmatrix} 30,283 \\\\ 39,042 \\\\ 30,675 \\end{bmatrix}",
          "\\begin{bmatrix} 28,500 \\\\ 37,500 \\\\ 34,000 \\end{bmatrix}",
          "\\begin{bmatrix} 31,000 \\\\ 40,000 \\\\ 29,000 \\end{bmatrix}",
        ],
        answer: "\\begin{bmatrix} 30,283 \\\\ 39,042 \\\\ 30,675 \\end{bmatrix}",
        solution: "Pas 3 vitesh, gjendja është P^3 \\cdot X = P^2 \\cdot (P \\cdot X) = P^2 \\cdot \\begin{bmatrix} 23,250 \\\\ 28,750 \\\\ 48,000 \\end{bmatrix} = \\begin{bmatrix} 30,283 \\\\ 39,042 \\\\ 30,675 \\end{bmatrix}"
      },
      {
        id: "stochastic3",
        question: "Pas 5 vitesh, numri i abonentëve do të jetë:",
        context: "Matrica e tranzicionit është: \\begin{bmatrix} 0.70 & 0.15 & 0.15 \\\\ 0.20 & 0.80 & 0.15 \\\\ 0.10 & 0.05 & 0.70 \\end{bmatrix}",
        initialState: "\\begin{bmatrix} 15,000 \\\\ 20,000 \\\\ 65,000 \\end{bmatrix}",
        options: [
          "\\begin{bmatrix} 32,411 \\\\ 43,812 \\\\ 23,777 \\end{bmatrix}",
          "\\begin{bmatrix} 32,000 \\\\ 44,000 \\\\ 24,000 \\end{bmatrix}",
          "\\begin{bmatrix} 33,000 \\\\ 42,000 \\\\ 25,000 \\end{bmatrix}",
        ],
        answer: "\\begin{bmatrix} 32,411 \\\\ 43,812 \\\\ 23,777 \\end{bmatrix}",
        solution: "Pas 5 vitesh, gjendja është P^5 \\cdot X = \\begin{bmatrix} 32,411 \\\\ 43,812 \\\\ 23,777 \\end{bmatrix}"
      },
      {
        id: "stochastic4",
        question: "Gjendja e qëndrueshme përfundimtare e sistemit do të jetë afërsisht:",
        context: "Matrica e tranzicionit është: \\begin{bmatrix} 0.70 & 0.15 & 0.15 \\\\ 0.20 & 0.80 & 0.15 \\\\ 0.10 & 0.05 & 0.70 \\end{bmatrix}",
        initialState: "\\begin{bmatrix} 15,000 \\\\ 20,000 \\\\ 65,000 \\end{bmatrix}",
        options: [
          "\\begin{bmatrix} 33,333 \\\\ 47,619 \\\\ 19,048 \\end{bmatrix}",
          "\\begin{bmatrix} 35,000 \\\\ 45,000 \\\\ 20,000 \\end{bmatrix}",
          "\\begin{bmatrix} 30,000 \\\\ 50,000 \\\\ 20,000 \\end{bmatrix}",
        ],
        answer: "\\begin{bmatrix} 33,333 \\\\ 47,619 \\\\ 19,048 \\end{bmatrix}",
        solution: "Gjendja e qëndrueshme është kur P \\cdot X = X. Duke zgjidhur këtë ekuacion, marrim gjendjen e qëndrueshme \\begin{bmatrix} 33,333 \\\\ 47,619 \\\\ 19,048 \\end{bmatrix}"
      }
    ],
    cryptography: [
      {
        id: "crypto1",
        question: "Enkodoni mesazhin 'MEET' duke përdorur matricën:",
        matrix: "\\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 1 & 1 \\\\ 2 & 3 & 4 \\end{bmatrix}",
        context: "M=13, E=5, E=5, T=20. Ndajmë në një grup: [13 5 5]",
        options: [
          "[33 33 38]",
          "[23 33 38]",
          "[33 23 38]",
          "[33 33 28]"
        ],
        answer: "[33 33 38]",
        solution: "[13 5 5] \\times \\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 1 & 1 \\\\ 2 & 3 & 4 \\end{bmatrix} = [13+10+10, 13+5+15, 13+5+20] = [33, 33, 38]"
      },
      {
        id: "crypto2",
        question: "Enkodoni mesazhin 'T_M' duke përdorur matricën:",
        matrix: "\\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 1 & 1 \\\\ 2 & 3 & 4 \\end{bmatrix}",
        context: "T=20, _=0, M=13. Ndajmë në një grup: [20 0 13]",
        options: [
          "[46 59 72]",
          "[46 59 62]",
          "[46 49 72]",
          "[56 59 72]"
        ],
        answer: "[46 59 72]",
        solution: "[20 0 13] \\times \\begin{bmatrix} 1 & 1 & 1 \\\\ 2 & 1 & 1 \\\\ 2 & 3 & 4 \\end{bmatrix} = [20+0+26, 20+0+39, 20+0+52] = [46, 59, 72]"
      },
      {
        id: "crypto3",
        question: "Dekodoni grupin [13 26 21] duke përdorur matricën inverse:",
        matrix: "\\begin{bmatrix} -1 & 1 & 0 \\\\ -10 & 6 & 1 \\\\ 8 & -5 & -1 \\end{bmatrix}",
        context: "Duhet të shumëzojmë grupin me matricën inverse dhe të konvertojmë numrat në shkronja",
        options: [
          "[13 5 5] = MEE",
          "[12 5 5] = LEE",
          "[13 5 6] = MEF",
          "[13 6 5] = MFE"
        ],
        answer: "[13 5 5] = MEE",
        solution: "[13 26 21] \\times \\begin{bmatrix} -1 & 1 & 0 \\\\ -10 & 6 & 1 \\\\ 8 & -5 & -1 \\end{bmatrix} = [-13-260+168, 13+156-105, 0+26-21] = [-105, 64, 5] ≡ [13, 5, 5] = MEE"
      },
      {
        id: "crypto4",
        question: "Dekodoni grupin [33 53 12] duke përdorur matricën inverse:",
        matrix: "\\begin{bmatrix} -1 & 1 & 0 \\\\ -10 & 6 & 1 \\\\ 8 & -5 & -1 \\end{bmatrix}",
        context: "Duhet të shumëzojmë grupin me matricën inverse dhe të konvertojmë numrat në shkronja",
        options: [
          "[20 0 13] = T_M",
          "[20 0 12] = T_L",
          "[20 1 13] = TAM",
          "[19 0 13] = S_M"
        ],
        answer: "[20 0 13] = T_M",
        solution: "[33 53 12] \\times \\begin{bmatrix} -1 & 1 & 0 \\\\ -10 & 6 & 1 \\\\ 8 & -5 & -1 \\end{bmatrix} = [-33-530+96, 33+318-60, 0+53-12] = [-467, 291, 41] ≡ [20, 0, 13] = T_M"
      }
    ],
    leontief: [
      {
        id: "leontief1",
        question: "Në modelin Leontief, nëse matrica input-output është:",
        matrix: "D = \\begin{bmatrix} 0.1 & 0.43 & 0 \\\\ 0.15 & 0 & 0.37 \\\\ 0.23 & 0.03 & 0.02 \\end{bmatrix}",
        context: "dhe kërkesat e jashtme janë E = \\begin{bmatrix} 20,000 \\\\ 30,000 \\\\ 25,000 \\end{bmatrix}",
        options: [
          "X = \\begin{bmatrix} 46,616 \\\\ 51,058 \\\\ 38,014 \\end{bmatrix}",
          "X = \\begin{bmatrix} 45,000 \\\\ 50,000 \\\\ 40,000 \\end{bmatrix}",
          "X = \\begin{bmatrix} 47,000 \\\\ 52,000 \\\\ 38,000 \\end{bmatrix}"
        ],
        answer: "X = \\begin{bmatrix} 46,616 \\\\ 51,058 \\\\ 38,014 \\end{bmatrix}",
        solution: "Për të gjetur outputin total, duhet të zgjidhim ekuacionin: (I - D)X = E. I - D = \\begin{bmatrix} 0.9 & -0.43 & 0 \\\\ -0.15 & 1 & -0.37 \\\\ -0.23 & -0.03 & 0.98 \\end{bmatrix}. Duke zgjidhur sistemin me eliminimin Gauss-Jordan, marrim X = \\begin{bmatrix} 46,616 \\\\ 51,058 \\\\ 38,014 \\end{bmatrix}"
      },
      {
        id: "leontief2",
        question: "Outputi i industrisë A që nevojitet për të përmbushur kërkesat e jashtme:",
        matrix: "D = \\begin{bmatrix} 0.1 & 0.43 & 0 \\\\ 0.15 & 0 & 0.37 \\\\ 0.23 & 0.03 & 0.02 \\end{bmatrix}",
        context: "dhe kërkesat e jashtme janë E = \\begin{bmatrix} 20,000 \\\\ 30,000 \\\\ 25,000 \\end{bmatrix}",
        options: [
          "46,616 njësi",
          "51,058 njësi",
          "38,014 njësi"
        ],
        answer: "46,616 njësi",
        solution: "Duke zgjidhur sistemin (I - D)X = E, komponenti i parë i vektorit të outputit është 46,616, që është outputi i nevojshëm për industrinë A."
      },
      {
        id: "leontief3",
        question: "Outputi i industrisë B që nevojitet për të përmbushur kërkesat e jashtme:",
        matrix: "D = \\begin{bmatrix} 0.1 & 0.43 & 0 \\\\ 0.15 & 0 & 0.37 \\\\ 0.23 & 0.03 & 0.02 \\end{bmatrix}",
        context: "dhe kërkesat e jashtme janë E = \\begin{bmatrix} 20,000 \\\\ 30,000 \\\\ 25,000 \\end{bmatrix}",
        options: [
          "46,616 njësi",
          "51,058 njësi",
          "38,014 njësi"
        ],
        answer: "51,058 njësi",
        solution: "Duke zgjidhur sistemin (I - D)X = E, komponenti i dytë i vektorit të outputit është 51,058, që është outputi i nevojshëm për industrinë B."
      }
    ],
    orthogonal: [
      {
        id: "orthogonal1",
        question: "Nëse A është matricë ortogonale, atëherë:",
        matrix: "",
        options: [
          "A^T dhe A^{-1} janë ortogonale",
          "Vetëm A^T është ortogonale",
          "Vetëm A^{-1} është ortogonale",
          "As A^T as A^{-1} nuk janë ortogonale"
        ],
        answer: "A^T dhe A^{-1} janë ortogonale",
        solution: "Nëse A është ortogonale, A^T = A^{-1} dhe A^T A = A A^T = I. Për A^T: (A^T)^T (A^T) = A A^T = I dhe A^T (A^T)^T = A^T A = I, pra A^T është ortogonale. Për A^{-1}: Duke ditur që A^T = A^{-1} dhe A^T është ortogonale, edhe A^{-1} është ortogonale."
      },
      {
        id: "orthogonal2",
        question: "Cila nga këto matrica është ortogonale?",
        options: [
          "\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}",
          "\\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\end{bmatrix}",
          "\\begin{bmatrix} 2 & 0 \\\\ 0 & 2 \\end{bmatrix}",
          "\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 \\end{bmatrix}"
        ],
        answer: "\\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}",
        solution: "Për matricën \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}, A^T A = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix} \\cdot \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix} = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} = I. Gjithashtu, A A^T = I. Pra, matrica është ortogonale."
      },
      {
        id: "orthogonal3",
        question: "Cila është një veti e rëndësishme e matricave ortogonale?",
        options: [
          "Ruajnë gjatësitë dhe këndet ndërmjet vektorëve",
          "Kanë determinant gjithmonë zero",
          "Kanë rangun gjithmonë të plotë",
          "Janë gjithmonë diagonale"
        ],
        answer: "Ruajnë gjatësitë dhe këndet ndërmjet vektorëve",
        solution: "Një veti e rëndësishme e matricave ortogonale është se transformimet ortogonale ruajnë gjatësitë dhe këndet ndërmjet vektorëve. Kjo ndodh sepse ||A\\vec{x}||^2 = (A\\vec{x})^T(A\\vec{x}) = \\vec{x}^T A^T A \\vec{x} = \\vec{x}^T \\vec{x} = ||\\vec{x}||^2."
      }
    ]
  };

  const currentExercises = exercises[activeCategory] || [];
  const currentExercise = currentExercises[currentExerciseIndex] || {};
  
  const checkAnswer = () => {
    if (userAnswer === currentExercise.answer) {
      setFeedback({ correct: true, message: "Përgjigje e saktë!" });
    } else {
      setFeedback({ correct: false, message: "Përgjigje e pasaktë. Provoni përsëri ose shikoni zgjidhjen." });
    }
  };
  
  const nextExercise = () => {
    if (currentExerciseIndex < currentExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      setCurrentExerciseIndex(0); // Kthehemi në fillim nëse kemi mbaruar të gjitha
    }
    setShowSolution(false);
    setUserAnswer('');
    setFeedback(null);
  };
  
  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    } else {
      setCurrentExerciseIndex(currentExercises.length - 1); // Shkojmë te detyra e fundit
    }
    setShowSolution(false);
    setUserAnswer('');
    setFeedback(null);
  };
  
  return (
    <div className="matrix-exercises-mobile">
      <h2>Detyra të Zgjidhura për Matricat</h2>
      
      <div className="category-navigation-mobile">
        <select 
          value={activeCategory}
          onChange={(e) => {
            setActiveCategory(e.target.value);
            setCurrentExerciseIndex(0);
            setShowSolution(false);
            setUserAnswer('');
            setFeedback(null);
          }}
        >
          <option value="idempotent">Matricat Idempotentet</option>
          <option value="stochastic">Matricat Stokastike</option>
          <option value="cryptography">Kriptografia</option>
          <option value="leontief">Modelet Leontief</option>
          <option value="orthogonal">Matricat Ortogonale</option>
        </select>
      </div>
      
      <div className="exercise-container-mobile">
        <div className="exercise-counter">
          Detyra {currentExerciseIndex + 1} nga {currentExercises.length}
        </div>
        
        <div className="exercise-content-mobile">
          <h3>{currentExercise.question}</h3>
          
          {currentExercise.context && (
            <div className="exercise-context">
              <BlockMath math={currentExercise.context} />
            </div>
          )}
          
          {currentExercise.matrix && (
            <div className="exercise-matrix">
              <BlockMath math={currentExercise.matrix} />
            </div>
          )}
          
          {currentExercise.initialState && (
            <div className="exercise-initial-state">
              <p>Gjendja fillestare:</p>
              <BlockMath math={currentExercise.initialState} />
            </div>
          )}
          
          <div className="answer-options">
            {currentExercise.options && currentExercise.options.map((option, index) => (
              <div key={index} className="answer-option">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="answer"
                  value={option}
                  checked={userAnswer === option}
                  onChange={() => setUserAnswer(option)}
                />
                <label htmlFor={`option-${index}`}>
                  {option.includes("\\begin") ? (
                    <BlockMath math={option} />
                  ) : (
                    option
                  )}
                </label>
              </div>
            ))}
          </div>
          
          <div className="exercise-actions">
            <button onClick={checkAnswer}>Kontrollo</button>
            <button onClick={() => setShowSolution(!showSolution)}>
              {showSolution ? 'Fshih Zgjidhjen' : 'Shfaq Zgjidhjen'}
            </button>
          </div>
          
          {feedback && (
            <div className={`feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>
              {feedback.message}
            </div>
          )}
          
          {showSolution && (
            <div className="solution-mobile">
              <h4>Zgjidhja:</h4>
              <BlockMath math={currentExercise.solution} />
            </div>
          )}
        </div>
        
        <div className="navigation-buttons">
          <button onClick={prevExercise}>Detyra e Mëparshme</button>
          <button onClick={nextExercise}>Detyra Tjetër</button>
        </div>
      </div>
    </div>
  );
};

export default MatrixExercisesMobile;