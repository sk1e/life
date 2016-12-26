import React, { PropTypes } from 'react';
import classNames from 'classnames';
import 'font-awesome.css';
import './play-button.styl';

function PlayButton({ isPlay, onClick }) {
  return (
    <button
      className={classNames('play-button', 'fa', isPlay ? 'fa-pause' : 'fa-play')}
      onClick={onClick}
    />
  );
}

PlayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isPlay: PropTypes.bool.isRequired,
};


export default PlayButton;
