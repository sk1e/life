import React from 'react';
import ControlPanel from 'containers/control-panel';
import Grid from '../grid';
import './game.styl';


const Game = () => (
  <div className="game">
    <ControlPanel />
    <Grid />
  </div>
);

export default Game;

