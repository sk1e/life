import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import InputField from 'components/input-field';

export default function sizeInputFieldContainerFactory(sizeType, action) {
  function sizeInputFieldContainer({ error, onBlur }) {
    return <InputField placeholder={`Grid ${sizeType}`} error={error} onBlur={onBlur} />;
  }

  sizeInputFieldContainer.propTypes = {
    onBlur: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

  sizeInputFieldContainer.defaultProps = {
    error: '',
  };

  function mapStateToProps(state) {
    return ({ error: state.getIn([sizeType, 'error']) });
  }

  function mapDispatchToProps(dispatch) {
    return ({ onBlur: node => dispatch(action(node.value)) });
  }

  return connect(mapStateToProps, mapDispatchToProps)(sizeInputFieldContainer);
}

