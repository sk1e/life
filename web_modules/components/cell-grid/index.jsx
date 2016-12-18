import React, { PropTypes } from 'react';
import CellRow from '../cell-row';
import gameConstants from '../game/constants.json';
import inputConstants from '../input/constants.json';
import gridConstants from './constants.json';
import './cell-grid.styl';


const yOffset =
  parseInt(gridConstants['cell-grid-margin-top'], 10) +
  parseInt(inputConstants['input-height'], 10) +
  (parseInt(gameConstants['game-padding'], 10) * 2);

const xOffset = parseInt(gameConstants['game-padding'], 10) * 2;


function cellStyle(width, height) {
  const xSize = `calc(100vw / ${width} - ${xOffset / width}rem)`;
  const ySize = `calc(100vh / ${height} - ${yOffset / height}rem)`;

  return {
    width: xSize,
    height: xSize,
    maxWidth: ySize,
    maxHeight: ySize,
  };
}


const CellGrid = ({ height, width }) => (
  <div className="cell-grid"> {
    Array.from({ length: height }, (_, i) => (
      <CellRow key={i} width={width} cellStyle={cellStyle(width, height)} />
    ))}
  </div>
);


CellGrid.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};


export default CellGrid;

