import { connect } from 'react-redux';
import CellGrid from 'components/cell-grid';

function mapStateToProps(state) {
  return {
    width: state.getIn(['width', 'value']),
    height: state.getIn(['height', 'value']),
  };
}


const CellGridContainer = connect(mapStateToProps)(CellGrid);

export default CellGridContainer;
