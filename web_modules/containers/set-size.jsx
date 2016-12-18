import { connect } from 'react-redux';
import { setHeight, setWidth } from 'actions';
import ControlPanel from '../components/control-panel';


const mapDispatchToProps = dispatch => ({
  onHeightBlur: (node) => {
    const height = +node.value;
    if (!isNaN(height) && isFinite(height)) {
      dispatch(setHeight(height));
    }
  },
  onWidthBlur: (node) => {
    const width = +node.value;
    if (!isNaN(width) && isFinite(width)) {
      dispatch(setWidth(width));
    }
  },
});

const SetSize = connect(null, mapDispatchToProps)(ControlPanel);

export default SetSize;
