import React from "react";
import './Card.css';
import cover from '../assets/imgs/cover-2.jpg'

function Card({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    }

    return(
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
            <img className="front" src={card.src} alt="card front" />
            <img 
                className="back" 
                onClick={handleClick} 
                src={cover}
                alt="card back" 
                />
            </div>
        </div>
    )
}

export default Card;