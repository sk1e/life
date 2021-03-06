import React, { PropTypes } from 'react';
import Input from '../input';
import './input-field.styl';


function InputField({ placeholder, onBlur, error }) {
  return (
    <div className="input-field">
      <Input placeholder={placeholder} onBlur={onBlur} />
      <div className="input-field__error">{error}</div>
    </div>
  );
}

InputField.propTypes = {
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  error: PropTypes.string,
};


InputField.defaultProps = {
  placeholder: '',
  onBlur: () => {},
  error: '',
};

export default InputField;
