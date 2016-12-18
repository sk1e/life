import React from 'react';
import SetSize from 'containers/set-size';
import InitCellGrid from 'containers/init-cell-grid';
import './game.styl';


const Game = () => (
  <div className="game">
    <SetSize />
    <InitCellGrid />
  </div>
);

export default Game;

