import React, { PropTypes } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { spy } from 'sinon';
import reducer from 'reducers/configuration';

export const reducerSpy = spy(reducer);
export const store = createStore(reducerSpy);

const Root = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

Root.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Root;
