import * as types from 'constants/action-types';

export const setHeight = height => ({
  type: types.SET_HEIGHT,
  payload: {
    height,
  },
});

export const setWidth = width => ({
  type: types.SET_WIDTH,
  payload: {
    width,
  },
});

export const toggleLive = (row, column) => ({
  type: types.TOGGLE_LIVE,
  payload: {
    row,
    column,
  },
});

export const togglePlayStatus = () => ({
  type: types.TOGGLE_PLAY_STATUS,
});

export const nextStep = () => ({
  type: types.NEXT_STEP,
});
