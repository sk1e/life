import React from 'react';
import ReactDOM from 'react-dom';
import './game.styl';

class Game extends React.Component {


  render() {
    return (
      <div className="game" />
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('game'),
);
