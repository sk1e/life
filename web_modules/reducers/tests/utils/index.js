import { Map, List } from 'immutable';
import { initialState } from 'reducers/configuration';


export default function textualGridToState(grid) {
  return grid
    .reduce((state, string, row) =>
            Array.from(string).reduce((substate, char, column) => {
              const pushCell = cell => substate.updateIn(['cells', row], x => x.push(cell));
              const makeCell = live => Map({ live, row, column });
              switch (char) {
                case 'X': {
                  const cell = makeCell(true);
                  return pushCell(cell).update('liveCells', x => x.add(cell));
                }
                case '=': {
                  const cell = makeCell(false);
                  return pushCell(cell).update('riseCandidates', x => x.add(cell));
                }
                case '-':
                  return pushCell(makeCell(false));
                default:
                  throw new RangeError(`invalid textual grid character - "${char}"`);
              }
            }, state.update('cells', x => x.push(List()))),
            initialState.set('height', grid.length).set('width', (grid[0] && grid[0].length) || null));
}

