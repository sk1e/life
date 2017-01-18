import thunk from 'redux-thunk';
import React, { PropTypes } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { spy } from 'sinon';
import configurationReducer from 'reducers/configuration';

export const reducerSpy = spy(configurationReducer);

export default function RootFactory(reducer) {
  const store = createStore(reducer, applyMiddleware(thunk));
  function Root({ children }) {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }

  Root.store = store;
  Root.propTypes = {
    children: PropTypes.element.isRequired,
  };

  return Root;
}

