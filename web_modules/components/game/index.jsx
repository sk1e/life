import React from 'react';
import ControlPanelContainer from 'containers/control-panel-container';
import CellGridContainer from 'containers/cell-grid-container';
import './game.styl';


const Game = () => (
  <div className="game">
    <ControlPanelContainer />
    <CellGridContainer />
  </div>
);

export default Game;

