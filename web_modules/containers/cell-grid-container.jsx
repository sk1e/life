import { connect } from 'react-redux';
import CellGrid from '../components/cell-grid';

function mapStateToProps(state) {
  if (state.getIn(['width', 'error']) === null &&
      state.getIn(['height', 'error']) === null) {
    return {
      width: state.getIn(['width', 'value']),
      height: state.getIn(['height', 'value']),
    };
  }
  return {};
}


const CellGridContainer = connect(mapStateToProps)(CellGrid);

export default CellGridContainer;
