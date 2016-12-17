import React, { PropTypes } from 'react';
import './input.styl';


const Input = ({ placeholder, onBlur }) => {
  let input;

  return (
    <input
      className="input"
      placeholder={placeholder}
      onBlur={() => onBlur(input)}
      ref={(node) => { input = node; }}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
};


export default Input;
