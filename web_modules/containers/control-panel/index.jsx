import { connect } from 'react-redux';
import { setHeight, setWidth } from 'actions';
import ControlPanel from 'components/control-panel';

const makeSizeActionDispatcher = (dispatch, action) => node => dispatch(action(node.value));

function mapStateToProps(state) {
  return {
    height: { error: state.getIn(['height', 'error']) },
    width: { error: state.getIn(['width', 'error']) },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    height: { onBlur: makeSizeActionDispatcher(dispatch, setHeight) },
    width: { onBlur: makeSizeActionDispatcher(dispatch, setWidth) },
  };
}

const ControlPanelContainer = connect(mapStateToProps, mapDispatchToProps)(ControlPanel);

export default ControlPanelContainer;

