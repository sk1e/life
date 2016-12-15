import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '../grid/grid.jsx';
import './game.styl';


class Game extends React.Component {


  render() {
    return (
      <div className="game">
        <Grid />
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('game'),
);
