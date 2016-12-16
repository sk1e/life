import * as types from 'constants/action-types';

export const setHeight = height => ({
  type: types.SET_HEIGHT,
  height,
});

export const setWidth = width => ({
  type: types.SET_WIDTH,
  width,
});

