import { List, Set, Map } from 'immutable';
import * as types from 'constants/action-types';
import { makeGrid } from './model/grid';
import { rise, die, nextStep } from './model/cell';


const initialState = Map({
  cells: List(),
  liveCells: Set(),
  riseCandidates: Set(),
  width: Map({ value: null, error: null }),
  height: Map({ value: null, error: null }),
  isPlay: false,
});

const SIZE_ERROR = 'Expected a natural number > 2';

function makeSizeSetter(sizeType, oppositeSizeType, gridMaker) {
  return function sizeSetter(state, action) {
    const n = +action[sizeType];
    if (!Number.isInteger(n) || n < 3) {
      return state.setIn([sizeType, 'error'], SIZE_ERROR);
    }
    return (() => {
      const valueKeyPath = [sizeType, 'value'];
      if (state.getIn(valueKeyPath) === n) {
        return state;
      }

      const oppositeValueKeyPath = [oppositeSizeType, 'value'];
      const oppositeN = state.getIn(oppositeValueKeyPath);
      if (oppositeN !== null) {
        return initialState.set('cells', gridMaker(n, oppositeN))
          .setIn(valueKeyPath, n).setIn(oppositeValueKeyPath, oppositeN);
      }
      return state.setIn(valueKeyPath, n);
    })().setIn([sizeType, 'error'], null);
  };
}
const setWidth = makeSizeSetter('width', 'height', (width, height) => makeGrid(height, width));
const setHeight = makeSizeSetter('height', 'width', (height, width) => makeGrid(height, width));


function toggleLive(state, { row, column }) {
  const cell = state.getIn(['cells', row, column]);
  return (cell.get('live') ? die : rise)(cell, state);
}

function configuration(state = initialState, action) {

  switch (action.type) {
    case types.NEXT_STEP:
      return nextStep(state);

    case types.SET_HEIGHT:
      return setHeight(state, action);

    case types.SET_WIDTH:
      return setWidth(state, action);

    case types.TOGGLE_LIVE:
      return toggleLive(state, action);

    case types.TOGGLE_PLAY_STATUS:
      return state.update('isPlay', x => !x);

    default:
      return state;
  }
}

export default configuration;
