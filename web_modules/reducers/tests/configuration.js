/* eslint-env mocha */
/* eslint no-unused-expressions: "off" */

import { Map, Set } from 'immutable';
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import * as actions from 'actions';
import configurationReducer, { initialState, SIZE_ERROR } from '../configuration';


chai.use(chaiImmutable);

function reduceActions(...reducerActions) {
  return reducerActions.reduce((state, action) => configurationReducer(state, action),
                               initialState);
}

describe('configurationReducer', () => {
  context('#setHeight()', () => {
    context('for integer less than min', () => {
      it('should set value of that integer ', () => {
        expect(reduceActions(actions.setHeight(2)).getIn(['height', 'value']))
          .to.equal(2);
      });
      it('should set error', () => {
        expect(reduceActions(actions.setHeight(2)).getIn(['height', 'error']))
          .to.equal(SIZE_ERROR);
      });
    });

    context('for float', () => {
      it('should set value of that float ', () => {
        expect(reduceActions(actions.setHeight(5.2)).getIn(['height', 'value']))
          .to.equal(5.2);
      });
      it('should set error', () => {
        expect(reduceActions(actions.setHeight(5.2)).getIn(['height', 'error']))
          .to.equal(SIZE_ERROR);
      });
    });

    context('for not a number', () => {
      it('should set value of NaN ', () => {
        expect(reduceActions(actions.setHeight('hello')).getIn(['height', 'value']))
          .to.be.NaN;
      });
      it('should set error', () => {
        expect(reduceActions(actions.setHeight('hello')).getIn(['height', 'error']))
          .to.equal(SIZE_ERROR);
      });
    });

    context('for integer > 2', () => {
      context('and height state without error', () => {
        it('should set value of that integer ', () => {
          expect(reduceActions(actions.setHeight(3)).getIn(['height', 'value']))
            .to.equal(3);
        });
        it('should not set error', () => {
          expect(reduceActions(actions.setHeight(3)).getIn(['height', 'error']))
            .to.equal(null);
        });
      });
      context('and height state with error', () => {
        it('should set value of that integer ', () => {
          expect(reduceActions(actions.setHeight(1), actions.setHeight(3))
                 .getIn(['height', 'value']))
            .to.equal(3);
        });
        it('should not have error', () => {
          expect(reduceActions(actions.setHeight(1), actions.setHeight(3))
                 .getIn(['height', 'error']))
            .to.equal(null);
        });
      });
    });
  });

  context('#setHeight & #setWidth()', () => {
    context('on both calls', () => {
      context('with both valid values', () => {
        const cells = reduceActions(actions.setHeight(3), actions.setWidth(4)).get('cells');
        it('should generate a grid of cells with corresponding length', () => {
          expect(cells).to.have.size(3);
        });
        it('should generate a grid of cells with rows of corresponding lengths', () => {
          cells.forEach(x => expect(x).to.have.size(4));
        });
      });
      context('with one valid value', () => {
        it('should not generate a grid of cells', () => {
          const cells = reduceActions(actions.setHeight(2), actions.setWidth(4)).get('cells');
          expect(cells).to.have.size(0);
        });
      });
    });
    context('with one call', () => {
      it('should not generate a grid of cells', () => {
        const cells = reduceActions(actions.setHeight(3)).get('cells');
        expect(cells).to.have.size(0);
      });
    });
  });

  context('#toggleLive()', () => {
    context('on a dead cell', () => {
      context('for a non-edge case', () => {
        const state = reduceActions(actions.setHeight(3),
                                    actions.setWidth(4),
                                    actions.toggleLive(1, 1));
        const cell = state.getIn(['cells', 1, 1]);
        it('should make it alive', () => {
          expect(cell.get('live')).to.be.true;
        });
        it('should not make riseCandidates to contain this cell', () => {
          expect(state.get('riseCandidates')).to.not.include(cell);
        });
        it('should add its neighbours to the riseCandidates', () => {
          const neighbours = Set([
            [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0], [0, 0],
          ].map(([row, column]) => Map({ live: false, row, column })));
          expect(state.get('riseCandidates')).to.equal(neighbours);
        });
      });
      context('for the edge case', () => {
        it("should add its neighbours to the riseCandidates with respect to the grid's toroidal array model", () => {
          const state = reduceActions(actions.setHeight(3),
                                      actions.setWidth(4),
                                      actions.toggleLive(0, 0));
          const neighbours = Set([
            [2, 0], [2, 1], [0, 1], [1, 1], [1, 0], [1, 3], [0, 3], [2, 3],
          ].map(([row, column]) => Map({ live: false, row, column })));
          expect(state.get('riseCandidates')).to.equal(neighbours);
        });
      });
    });
    context('on a live cell', () => {
      const state = reduceActions(actions.setHeight(3),
                                  actions.setWidth(4),
                                  actions.toggleLive(1, 1),
                                  actions.toggleLive(1, 1));
      const cell = state.getIn(['cells', 1, 1]);
      it('should make it dead', () => {
        expect(cell.get('live')).to.be.false;
      });
      it('should make riseCandidates to contain this cell', () => {
        expect(state.get('riseCandidates')).to.include(cell);
      });
      it('should leave its neighbours in the riseCandidates', () => {
        const neighbours = Set([
          [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0], [0, 0],
        ].map(([row, column]) => Map({ live: false, row, column })));
        expect(state.get('riseCandidates').isSuperset(neighbours)).to.be.true;
      });
    });
    context('on a rise candidate', () => {
      it('should exclude it from riseCandidates', () => {
        const state = reduceActions(actions.setHeight(3),
                                    actions.setWidth(4),
                                    actions.toggleLive(1, 1),
                                    actions.toggleLive(1, 0));
        const cell = state.getIn(['cells', 1, 0]);
        expect(state.get('riseCandidates')).to.not.include(cell);
      });
    });
  });
});

