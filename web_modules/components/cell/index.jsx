import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './cell.styl';


const Cell = ({ live, style, onClick }) => (
  <div
    className={classNames('cell', { cell_live: live })}
    style={style}
    onClick={onClick}
  />
);

const stylePropType = PropTypes.shape({
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  maxWidth: PropTypes.string.isRequired,
  maxHeight: PropTypes.string.isRequired,
}).isRequired;

Cell.propTypes = {
  live: PropTypes.bool.isRequired,
  style: stylePropType,
  onClick: PropTypes.func.isRequired,
};

export default Cell;
export { stylePropType };
