import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './cell.styl';

const Cell = ({ live, style }) => (
  <div className={classNames('cell', { cell_live: live })} style={style} />
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
};

export default Cell;
export { stylePropType };

