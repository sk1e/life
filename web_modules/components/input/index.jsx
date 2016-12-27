import React, { PropTypes } from 'react';
import './input.styl';


function Input({ placeholder, onBlur }) {
  let input;

  return (
    <input
      className="input"
      placeholder={placeholder}
      onBlur={() => onBlur(input)}
      ref={(node) => { input = node; }}
    />
  );
}

Input.propTypes = {
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
};


export default Input;
