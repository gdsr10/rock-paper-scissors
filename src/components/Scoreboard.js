
import React from 'react';
import './Scoreboard.css'; 

const Scoreboard = ({ score }) => {
  return (
    <div className="scoreboard">
      <p className="score-text">SCORE</p>
      <p className="score-value">{score}</p>
    </div>
  );
};

export default Scoreboard;
