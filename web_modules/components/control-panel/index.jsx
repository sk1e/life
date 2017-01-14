import React, { PropTypes } from 'react';
import PlayButtonContainer from 'containers/play-button';
import {
  HeightInputFieldContainer,
  WidthInputFieldContainer,
} from 'containers/factories/sizeInputField/products';

import './control-panel.styl';


function ControlPanel() {
  return (
    <div className="control-panel">
      <HeightInputFieldContainer />
      <WidthInputFieldContainer />
      <PlayButtonContainer />
    </div>
  );
}

export default ControlPanel;

