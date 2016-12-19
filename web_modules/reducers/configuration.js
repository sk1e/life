import { List, Set, Map } from 'immutable';
import * as types from 'constants/action-types';
import { makeGrid } from './model/grid';
import { rise, die } from './model/cell';


function setHeight(state, { height }) {
  if (state.get('height') === height) {
    return state;
  }
  if (height > 0 && state.get('width') > 0) {
    return state.set('cells', makeGrid(height, state.get('width')))
      .set('height', height);
  }
  return state.set('height', height);
}


function setWidth(state, { width }) {
  if (state.get('width') === width) {
    return state;
  }
  if (width > 0 && state.get('height') > 0) {
    return state.set('cells', makeGrid(state.get('height'), width))
      .set('width', width);
  }
  return state.set('width', width);
}


function toggleLive(state, { row, column }) {
  const cell = state.getIn(['cells', row, column]);
  return (cell.get('live') ? die : rise)(cell, state);
}


const initialState = Map({
  cells: List(),
  liveCells: Set(),
  riseCandidates: Set(),
  width: 0,
  height: 0,
});

function configuration(state = initialState, action) {
  switch (action.type) {
    case types.SET_HEIGHT:
      return setHeight(state, action);

    case types.SET_WIDTH:
      return setWidth(state, action);

    case types.TOGGLE_LIVE:
      return toggleLive(state, action);

    default:
      return state;
  }
}

export default configuration;
