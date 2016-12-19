import * as types from 'constants/action-types';

export const setHeight = height => ({
  type: types.SET_HEIGHT,
  height,
});

export const setWidth = width => ({
  type: types.SET_WIDTH,
  width,
});

export const toggleLive = (row, column) => ({
  type: types.TOGGLE_LIVE,
  row,
  column,
});

