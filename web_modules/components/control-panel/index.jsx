import React, { PropTypes } from 'react';
import PlayButtonContainer from 'containers/play-button';
import InputField from '../input-field';
import './control-panel.styl';


const ControlPanel = ({ height, width }) => (
  <div className="control-panel">
    <InputField placeholder="Grid height" onBlur={height.onBlur} error={height.error} />
    <InputField placeholder="Grid width" onBlur={width.onBlur} error={width.error} />
    <PlayButtonContainer />
  </div>
);

const sizeInputPropTypeShape = PropTypes.shape({
  onBlur: PropTypes.func,
  error: PropTypes.string,
});

ControlPanel.propTypes = {
  height: sizeInputPropTypeShape,
  width: sizeInputPropTypeShape,
};


export default ControlPanel;

