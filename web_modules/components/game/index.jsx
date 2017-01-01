import React from 'react';
import ControlPanel from 'components/control-panel';
import CellGridContainer from 'containers/cell-grid';

import './game.styl';


function Game() {
  return (
    <div className="game">
      <ControlPanel />
      <CellGridContainer />
    </div>
  );
}

export default Game;

