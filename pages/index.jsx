/* eslint-env browser */

import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducer from 'reducers/configuration';
import Game from 'components/game';
import 'theme/global.styl';
import 'theme/fonts.styl';

const store = createStore(reducer, applyMiddleware(thunk));

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('game'),
);
