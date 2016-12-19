import { connect } from 'react-redux';
import CellGrid from '../components/cell-grid';

const mapStateToProps = state => ({
  width: state.get('width'), height: state.get('height'),
});


const CellGridContainer = connect(mapStateToProps)(CellGrid);

export default CellGridContainer;
