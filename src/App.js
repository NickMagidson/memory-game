import React, { useState, useEffect } from 'react';
import './App.css'
import Card from './components/Card';



const cardImages = [
  { "src": "./imgs/alice.jpg", matched: false },
  { "src": "./imgs/cheshire-2.jpg", matched: false },
  { "src": "./imgs/hare.jpg", matched: false },
  { "src": "./imgs/hatter.jpg", matched: false },
  { "src": "./imgs/piller.jpg", matched: false },
  { "src": "./imgs/queen.jpg", matched: false }
]


function App() {
  const [cards, setCards] = useState([]);
  const [turns, SetTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [disabled, setDisabled] = useState(false);


  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    SetTurns(0);
  };


  // Handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  
  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {
                ...card,
                matched: true}
            } else {
              return card
            };
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000)
      };
    };
  }, [choiceOne, choiceTwo])

  console.log(cards);

  // Reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    SetTurns(prevturns => prevturns + 1);
    setDisabled(false);
  };


  // Start new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);


  return (
    <div className="App">
      <h1>Alice in Wonderland Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App