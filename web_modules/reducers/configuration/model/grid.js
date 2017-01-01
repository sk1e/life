import { List, Map } from 'immutable';

export default function makeGrid(height, width) {
  return List({ length: height })
    .map((_, row) => List({ length: width })
         .map((__, column) => Map({ live: false, row, column })));
}
