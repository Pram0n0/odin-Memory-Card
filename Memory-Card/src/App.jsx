import { useState, useEffect } from 'react';
import Card from './components/card';
import Scoreboard from './components/scoreboard'
import { fetchPokemonData } from './services/api';

const App = () => {
  const [cards, setCards] = useState([]);
  const [cardList, setCardList] = useState([])
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemonData();
      // setCards(data);  
      shuffleCards(data);
    };

    fetchData();
  }, []);

  const shuffleCards = (cardsArray) => {
    const shuffledCards = [...cardsArray].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  };

  const handleCardClick = (clickedCard) => {
    // Check if the clicked card is already in the cardList
    if (cardList.some((card) => card.id === clickedCard.id)) {
      // Reset the game if the clicked card is already in the list
      setCurrentScore(0);
      setCardList([]);
    } else {
      // Add the clicked card to the cardList
      setCardList([...cardList, clickedCard]);
      // Update the current score
      setCurrentScore(currentScore + 1);
      // Update the best score if needed
      if (currentScore + 1 > bestScore) {
        setBestScore(currentScore + 1);
      }
    }

    // Shuffle the cards for the next round
    shuffleCards(cards);
  };

  return (
    <div className="app">
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      <div className="cards-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            imageUrl={card.imageUrl}
            text={card.text}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;