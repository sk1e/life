import React from 'react';
import ControlPanelContainer from 'containers/control-panel';
import CellGridContainer from 'containers/cell-grid';
import './game.styl';


const Game = () => (
  <div className="game">
    <ControlPanelContainer />
    <CellGridContainer />
  </div>
);

export default Game;

