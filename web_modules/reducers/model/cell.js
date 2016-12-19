import { List } from 'immutable';


function getTop(cell, grid) {
  const [row, column] = [cell.get('row'), cell.get('column')];
  return grid.getIn([row - 1, column]) || grid.last().get(column);
}


function getBottom(cell, grid) {
  const [row, column] = [cell.get('row'), cell.get('column')];
  return grid.getIn([row + 1, column]) || grid.first().get(column);
}

function getRight(cell, grid) {
  const [row, column] = [cell.get('row'), cell.get('column')];
  return grid.getIn([row, column + 1]) || grid.get(row).first();
}

function getLeft(cell, grid) {
  const [row, column] = [cell.get('row'), cell.get('column')];
  return grid.getIn([row, column - 1]) || grid.get(row).last();
}


function getNeighbours(cell, grid) {
  const [top, right, bottom, left] =
          [getTop, getRight, getBottom, getLeft].map(f => f(cell, grid));
  return List([
    top, getRight(top, grid),
    right, getBottom(right, grid),
    bottom, getLeft(bottom, grid),
    left, getTop(left, grid),
  ]);
}

const isLive = cell => cell.get('live');


export function rise(cell, state) {
  const cellPath = ['cells', cell.get('row'), cell.get('column')];
  const risedCell = state.getIn(cellPath).set('live', true);
  const deadNeighbours = getNeighbours(cell, state.get('cells')).filterNot(isLive);

  return state.setIn(cellPath, risedCell)
    .update('liveCells', x => x.add(risedCell))
    .update('riseCandidates', x => x.delete(cell).union(deadNeighbours));
}

export function die(cell, state) {
  const cellPath = ['cells', cell.get('row'), cell.get('column')];
  const diedCell = state.getIn(cellPath).set('live', false);

  return state.setIn(cellPath, diedCell)
    .update('liveCells', x => x.delete(cell))
    .update('riseCandidates', x => x.add(diedCell));
}

