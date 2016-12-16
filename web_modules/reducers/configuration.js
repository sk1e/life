import { List, Set } from 'immutable';

function configuration(state = {
  cells: new List(),
  liveCells: new Set(),
  riseCandidates: new Set(),
}, action) {
  return state;
}

export default configuration;
