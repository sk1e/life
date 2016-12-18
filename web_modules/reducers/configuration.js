import { List, Set } from 'immutable';
import * as types from 'constants/action-types';

const defaultState = {
  cells: List(),
  liveCells: Set(),
  riseCandidates: Set(),
  width: 0,
  height: 0,
};

const makeCells = (height, width) => (
  List({ length: height })
    .map((_, row) => List({ length: width })
         .map((__, column) => ({ row, column, live: false })))
);

function configuration(state = defaultState, action) {

  switch (action.type) {
    case types.SET_HEIGHT:
      if (action.height > 0 && state.width > 0) {
        return {
          ...state,
          height: action.height,
          cells: makeCells(action.height, state.width),
        };
      }

      return { ...state, height: action.height };
    case types.SET_WIDTH:
      if (state.height > 0 && action.width > 0) {
        return {
          ...state,
          width: action.width,
          cells: makeCells(state.height, action.width),
        };
      }

      return { ...state, width: action.width };
    default:
      return state;
  }
}

export default configuration;
