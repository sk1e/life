import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleLive } from 'actions';
import Cell, { stylePropType } from 'components/cell';

const CellContainer = ({ style, live, row, column, toggle }) => (
  <Cell style={style} live={live} onClick={() => toggle(row, column)} />
);


function mapStateToProps(state, { row, column }) {
  return { live: state.getIn(['cells', row, column, 'live']) };
}


CellContainer.propTypes = {
  live: PropTypes.bool.isRequired,
  style: stylePropType.isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { toggle: toggleLive })(CellContainer);

