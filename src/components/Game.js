
import React, { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard';
import ResultModal from './ResultModal';

import logo from '../images/logo.svg';
import bgtriangle from '../images/bg-triangle.svg';

import rock from '../images/icon-rock.svg';
import paper from '../images/icon-paper.svg';
import scissors from '../images/icon-scissors.svg';

const Game = () => {
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userChoice, setUserChoice] = useState(null);
  const [userChoiceImage, setUserChoiceImage] = useState(null);
  const [userChoiceColor, setUserChoiceColor] = useState(null);

  const [computerChoice, setComputerChoice] = useState(null);
  const [computerChoiceImage, setComputerChoiceImage] = useState(null);
  const [computerChoiceColor, setComputerChoiceColor] = useState(null);

  const [showChoices, setShowChoices] = useState(true);
  const [showResult, setShowResult] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleChoiceClick = (choice) => {
    let choiceColorClass;

    switch (choice) {
      case 'rock':
        choiceColorClass = 'custom-choice-rock';
        break;
      case 'paper':
        choiceColorClass = 'custom-choice-paper';
        break;
      case 'scissors':
        choiceColorClass = 'custom-choice-scissors';
        break;
      default:
        choiceColorClass = null;
    }

    setUserChoiceColor(choiceColorClass);

    setUserChoice(choice);
    setUserChoiceImage(getImageURL(choice));
    generateComputerChoice();
    setShowChoices(false);
    setShowResult(true);
  };

  const handlePlayAgainClick = () => {
    setShowChoices(true);
    setShowResult(false);
    setResult(null);
  };

  useEffect(() => {
    if (userChoice !== null && computerChoice !== null) {
      determineWinner(userChoice, computerChoice);
    }
  }, [userChoice, computerChoice]);

  const generateComputerChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const randomChoice = choices[randomIndex];


    let choiceColorClass;

    switch (randomChoice) {
      case 'rock':
        choiceColorClass = 'custom-choice-rock';
        break;
      case 'paper':
        choiceColorClass = 'custom-choice-paper';
        break;
      case 'scissors':
        choiceColorClass = 'custom-choice-scissors';
        break;
      default:
        choiceColorClass = null;
    }

    setComputerChoice(randomChoice);
    setComputerChoiceImage(getImageURL(randomChoice));
    setComputerChoiceColor(choiceColorClass);
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult('It\'s a tie!');
    } else if ((user === 'rock' && computer === 'paper')) {
      setResult('YOU LOSE');
      setScore((prevScore) => prevScore - 1);
    } else if ((user === 'rock' && computer === 'scissors')) {
      setResult('YOU WIN');
      setScore((prevScore) => prevScore + 1);
    } else if ((user === 'paper' && computer === 'rock')) {
      setResult('YOU WIN');
      setScore((prevScore) => prevScore + 1);
    } else if ((user === 'paper' && computer === 'scissors')) {
      setResult('YOU LOSE');
      setScore((prevScore) => prevScore - 1);
    } else if ((user === 'scissors' && computer === 'paper')) {
      setResult('YOU WIN');
      setScore((prevScore) => prevScore + 1);
    } else if ((user === 'scissors' && computer === 'rock')) {
      setResult('YOU LOSE');
      setScore((prevScore) => prevScore - 1);
    } else {
      setResult('YOU LOSE');
      setScore((prevScore) => Math.max(0, prevScore - 1));
    }
  };

  const getImageURL = (choice) => {
    switch (choice) {
      case 'rock':
        return rock;
      case 'paper':
        return paper;
      case 'scissors':
        return scissors;
      default:
        return null;
    }
  };

  useEffect(() => {
    console.log('User Choice Color:', userChoiceColor);
  }, [userChoiceColor]);



  return (
    <div className="game-container">
      <div className="container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div>
          <Scoreboard score={score} />
        </div>
      </div>

      {showChoices && (
        <div className="choices-container">
          <div className="custom-choice-01">
            <div className="choice">
              <img src={rock} alt="Rock" className="element rock" onClick={() => handleChoiceClick('rock')} />
            </div>
          </div>
          <div className="custom-choice-02">
            <div className="choice">
              <img src={paper} alt="Paper" className="element paper" onClick={() => handleChoiceClick('paper')} />
            </div>
          </div>
          <div className="custom-choice-03">
            <div className="choice">
              <img src={scissors} alt="Scissors" className="element scissors" onClick={() => handleChoiceClick('scissors')} />
            </div>
          </div>

          <div className="bg-triangle-container">
            <img src={bgtriangle} alt="Logo" className="logo" />
          </div>
        </div>
      )}

      {showResult && (
        <div className="result-container">
          <div className="column-01">
            <p>YOU PICKED</p>
            <div className={userChoiceColor}>
              <div className="choice">
                <img src={userChoiceImage} alt={userChoice} />
              </div>
            </div>
            <h6 className='namehide'>YOU PICKED</h6>
          </div>
          <div className="column-02">
            <h3 className="result-text">{result}</h3>
            <button className="play-again-button" onClick={handlePlayAgainClick}>
              PLAY AGAIN
            </button>
          </div>
          <div className="column-03">
            <p>THE HOUSE PICKED</p>
            <div className={computerChoiceColor}>
              <div className="choice">
                <img src={computerChoiceImage} alt={computerChoice} />
              </div>
            </div>
            <h6 className='namehide'>THE HOUSE PICKED</h6>
          </div>
        </div>
      )}


      {showResult && (
        <div className="result-container">
          <div className="column-04">
            <h3 className="result-text">{result}</h3>
            <button className="play-again-button" onClick={handlePlayAgainClick}>
              PLAY AGAIN
            </button>
          </div>
        </div>
      )}

      <button className="open-modal-button" onClick={handleButtonClick}>
        RULES
      </button>
      {isModalOpen && <ResultModal result={result} closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Game;
