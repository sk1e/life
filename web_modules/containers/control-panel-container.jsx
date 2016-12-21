import { connect } from 'react-redux';
import { setHeight, setWidth } from 'actions';
import ControlPanel from '../components/control-panel';

const makeSizeActionDispatcher = (dispatch, action) => node => dispatch(action(node.value));

function mapStateToProps(state) {
  return {
    heightError: state.getIn(['height', 'error']),
    widthError: state.getIn(['width', 'error']),
  };
}

const mapDispatchToProps = dispatch => ({
  onHeightBlur: makeSizeActionDispatcher(dispatch, setHeight),
  onWidthBlur: makeSizeActionDispatcher(dispatch, setWidth),
});

function mergeProps({ heightError, widthError }, { onHeightBlur, onWidthBlur }) {
  return {
    height: { onBlur: onHeightBlur, error: heightError },
    width: { onBlur: onWidthBlur, error: widthError },
  };
}


const ControlPanelContainer = connect(mapStateToProps,
                                      mapDispatchToProps,
                                      mergeProps)(ControlPanel);

export default ControlPanelContainer;

