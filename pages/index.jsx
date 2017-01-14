/* eslint-env browser */

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from 'reducers/configuration';
import Game from 'components/game';
import 'theme/global.styl';
import 'theme/fonts.styl';

const store = createStore(reducer);

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('game'),
);
