import React, { PropTypes } from 'react';
import Cell, { stylePropType } from '../cell';
import './cell-row.styl';


const CellRow = ({ width, cellStyle }) => (
  <div className="cell-row"> {
    Array.from({ length: width }, (_, i) => (
      <Cell key={i} style={cellStyle} live={false} />
    ))}
  </div>
);


CellRow.propTypes = {
  width: PropTypes.number.isRequired,
  cellStyle: stylePropType,
};

export default CellRow;

