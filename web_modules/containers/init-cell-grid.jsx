import { connect } from 'react-redux';
import CellGrid from '../components/cell-grid';

const mapStateToProps = (state) => {
  return { width: state.width, height: state.height };
};

const InitCellGrid = connect(mapStateToProps)(CellGrid);

export default InitCellGrid;
