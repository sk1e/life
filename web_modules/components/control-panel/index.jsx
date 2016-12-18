import React, { PropTypes } from 'react';
import Input from '../input';
import './control-panel.styl';


const ControlPanel = ({ onHeightBlur, onWidthBlur }) => (
  <div className="control-panel">
    <Input placeholder="Grid height" onBlur={onHeightBlur} />
    <Input placeholder="Grid width" onBlur={onWidthBlur} />
  </div>
);


ControlPanel.propTypes = {
  onHeightBlur: PropTypes.func.isRequired,
  onWidthBlur: PropTypes.func.isRequired,
};


export default ControlPanel;

