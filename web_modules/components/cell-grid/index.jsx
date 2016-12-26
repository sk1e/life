import React, { PropTypes } from 'react';
import CellContainer from 'containers/cell';
import gameConstants from '../game/constants.json';
import playButtonConstants from '../play-button/constants.json';
import gridConstants from './constants.json';
import './cell-grid.styl';


const yOffset =
  parseInt(gridConstants['cell-grid-margin-top'], 10)
  + parseInt(playButtonConstants['play-button-height'], 10)
  + (parseInt(gameConstants['game-padding'], 10) * 2);

const xOffset = parseInt(gameConstants['game-padding'], 10) * 2;


function cellStyle(height, width) {
  const xSize = `calc(100vw / ${width} - ${xOffset / width}rem)`;
  const ySize = `calc(100vh / ${height} - ${yOffset / height}rem)`;

  return {
    width: xSize,
    height: xSize,
    maxWidth: ySize,
    maxHeight: ySize,
  };
}


function CellGrid({ height, width }) {
  const style = cellStyle(height, width);
  return (
    <div className="cell-grid"> {
      Array.from({ length: height }, (_, row) => (
        <div key={row} className="cell-grid__row"> {
          Array.from({ length: width }, (__, column) => (
            <CellContainer key={column} style={style} row={row} column={column} />
          ))}
        </div>
      ))}
    </div>
  );
}

CellGrid.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};


export default CellGrid;

