import { connect } from 'react-redux';
import { setHeight, setWidth } from 'actions';
import ControlPanel from '../components/control-panel';

function makeSizeActionDispatcher(dispatch, action) {
  return function dispatchSizeAction(node) {
    const size = +node.value;
    if (!isNaN(size) && isFinite(size)) {
      dispatch(action(size));
    }
  };
}

const mapDispatchToProps = dispatch => ({
  onHeightBlur: makeSizeActionDispatcher(dispatch, setHeight),
  onWidthBlur: makeSizeActionDispatcher(dispatch, setWidth),
});

const ControlPanelContainer = connect(null, mapDispatchToProps)(ControlPanel);

export default ControlPanelContainer;

