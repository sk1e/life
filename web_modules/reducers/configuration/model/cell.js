import { List } from 'immutable';


function makeCellGetter(gridKey) {
  return function cellGetter(cell, grid) {
    const [row, column] = [cell.get('row'), cell.get('column')];
    return gridKey(grid, row, column);
  };
}

const [getTop, getBottom, getRight, getLeft] = [
  (grid, row, column) => grid.getIn([row - 1, column]) || grid.last().get(column),
  (grid, row, column) => grid.getIn([row + 1, column]) || grid.first().get(column),
  (grid, row, column) => grid.getIn([row, column + 1]) || grid.get(row).first(),
  (grid, row, column) => grid.getIn([row, column - 1]) || grid.get(row).last(),
].map(makeCellGetter);


function getNeighbours(cell, grid) {
  const [top, right, bottom, left] =
          [getTop, getRight, getBottom, getLeft].map(f => f(cell, grid));
  return List.of(top, getRight(top, grid),
                 right, getBottom(right, grid),
                 bottom, getLeft(bottom, grid),
                 left, getTop(left, grid));
}

const isLive = cell => cell.get('live');

function rise(cell, state) {
  const cellPath = ['cells', cell.get('row'), cell.get('column')];
  const risenCell = state.getIn(cellPath).set('live', true);
  const deadNeighbours = getNeighbours(cell, state.get('cells')).filterNot(isLive);

  return state.setIn(cellPath, risenCell)
    .update('liveCells', x => x.add(risenCell))
    .update('riseCandidates', x => x.delete(cell).union(deadNeighbours));
}

function die(cell, state) {
  const cellPath = ['cells', cell.get('row'), cell.get('column')];
  const diedCell = state.getIn(cellPath).set('live', false);

  return state.setIn(cellPath, diedCell)
    .update('liveCells', x => x.delete(cell))
    .update('riseCandidates', x => x.add(diedCell));
}

const getLiveNeighboursNumber = (cell, grid) => getNeighbours(cell, grid).filter(isLive).size;


function makeRequalifier(requalifyPredicate, stateTransformer) {
  return function requalifier(cell, sourceState, transformedState) {
    const n = getLiveNeighboursNumber(cell, sourceState.get('cells'));
    return requalifyPredicate(n) ? stateTransformer(cell, transformedState) : transformedState;
  };
}

const [requalifyLive, requalifyCandidateRising, requalifyCandidateRemoval] = [
  [n => n < 2 || n > 3, die],
  [n => n === 3, rise],
  [n => n === 0, (cell, state) => state.update('riseCandidates', x => x.delete(cell))],
].map(([predicate, transformer]) => makeRequalifier(predicate, transformer));

function requalifyState(sourceState, transformedState, cellSet, requalifier) {
  return cellSet.reduce((state, cell) => requalifier(cell, sourceState, state),
                        transformedState);
}

export function nextStep(state) {
  const liveCells = state.get('liveCells');
  const riseCandidates = state.get('riseCandidates');

  const stateStage2 = requalifyState(state, state, riseCandidates, requalifyCandidateRising);
  const stateStage3 = requalifyState(state, stateStage2, liveCells, requalifyLive);
  return requalifyState(stateStage3, stateStage3, riseCandidates, requalifyCandidateRemoval);
}

export function toggleLive(state, { row, column }) {
  const cell = state.getIn(['cells', row, column]);
  return (cell.get('live') ? die : rise)(cell, state);
}
