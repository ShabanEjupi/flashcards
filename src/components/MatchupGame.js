import React, { useState, useEffect } from 'react';
import { shuffleArray } from '../utils/helpers';

const MatchupGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  
  const concepts = [
    { id: 1, concept: "Marketingu Mix", definition: "4P: Produkti, Çmimi, Promovimi, Distribuimi" },
    { id: 2, concept: "Segmentimi", definition: "Ndarja e tregut në grupe më të vogla dhe homogjene" },
    { id: 3, concept: "Matrica e Ansoffit", definition: "Strategjia e pushtimit të tregut, zhvillimit të tregut, zhvillimit të produktit, diversifikimi" },
    { id: 4, concept: "Kërkesa Efektive", definition: "Konsumatorët me dëshirë, mundësi financiare dhe gatishmëri për blerje" },
    { id: 5, concept: "Pika kritike e rentabilitetit", definition: "Niveli i shitjeve ku të hyrat totale barazohen me shpenzimet totale" },
    { id: 6, concept: "Marketingu Holistik", definition: "Integron të gjitha aspektet e marketingut" }
  ];
  
  useEffect(() => {
    const gameCards = [...concepts.map(item => ({
      id: `c${item.id}`,
      content: item.concept,
      matched: false
    })), ...concepts.map(item => ({
      id: `d${item.id}`,
      content: item.definition,
      matched: false
    }))];
    
    setCards(shuffleArray(gameCards));
  }, []);
  
  const handleCardClick = (id) => {
    if (flipped.length === 0) {
      setFlipped([id]);
    } else if (flipped.length === 1) {
      if (flipped[0] === id) return;
      
      setFlipped([flipped[0], id]);
      setMoves(moves + 1);
      
      // Check for match
      const flippedCard = cards.find(card => card.id === flipped[0]);
      const currentCard = cards.find(card => card.id === id);
      
      // If one is concept and one is definition with same number
      if (
        (flippedCard.id.startsWith('c') && currentCard.id.startsWith('d') && 
         flippedCard.id.substring(1) === currentCard.id.substring(1)) ||
        (flippedCard.id.startsWith('d') && currentCard.id.startsWith('c') &&
         flippedCard.id.substring(1) === currentCard.id.substring(1))
      ) {
        setSolved([...solved, flippedCard.id, currentCard.id]);
      }
      
      // Reset flipped after 1 second
      setTimeout(() => setFlipped([]), 1000);
    }
  };
  
  return (
    <div className="matchup-game">
      <h2>Loja e Përputhjeve të Koncepteve</h2>
      <p>Lëvizjet: {moves} | Përputhjet: {solved.length/2} nga {concepts.length}</p>
      
      <div className="card-grid">
        {cards.map(card => (
          <div 
            key={card.id}
            className={`game-card ${flipped.includes(card.id) ? 'flipped' : ''} ${solved.includes(card.id) ? 'matched' : ''}`}
            onClick={() => !solved.includes(card.id) && !flipped.includes(card.id) && handleCardClick(card.id)}
          >
            <div className="card-back">?</div>
            <div className="card-front">{card.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchupGame;