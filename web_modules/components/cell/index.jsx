/* eslint jsx-a11y/no-static-element-interactions: "off" */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './cell.styl';


function Cell({ live, style, onClick }) {
  return (
    <div
      className={classNames('cell', { cell_live: live })}
      style={style}
      onClick={onClick}
    />
  );
}

const stylePropType = PropTypes.shape({
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  maxWidth: PropTypes.string.isRequired,
  maxHeight: PropTypes.string.isRequired,
});

Cell.propTypes = {
  live: PropTypes.bool.isRequired,
  style: stylePropType.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cell;
export { stylePropType };
