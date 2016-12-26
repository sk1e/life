/* eslint-env mocha */
/* eslint no-unused-expressions: "off" */

import { Map, Set, List } from 'immutable';
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';
import * as actions from 'actions';
import configurationReducer, { initialState, SIZE_ERROR } from '../configuration';
import textualGridToState from './utils';


chai.use(chaiImmutable);

function reduceActions(...reducerActions) {
  return reducerActions.reduce((state, action) => configurationReducer(state, action),
                               initialState);
}

describe('configurationReducer', () => {
  describe('#setHeight()', () => {
    context('for integer less than min', () => {
      it('should set value of that integer ', () => {
        expect(reduceActions(actions.setHeight(2)).getIn(['height', 'value']))
          .to.be.null;
      });
      it('should set error', () => {
        expect(reduceActions(actions.setHeight(2)).getIn(['height', 'error']))
          .to.equal(SIZE_ERROR);
      });
    });

    context('for float', () => {
      it('should set value to null ', () => {
        expect(reduceActions(actions.setHeight(5.2)).getIn(['height', 'value']))
          .to.be.null;
      });
      it('should set error', () => {
        expect(reduceActions(actions.setHeight(5.2)).getIn(['height', 'error']))
          .to.equal(SIZE_ERROR);
      });
    });

    context('for not a number', () => {
      it('should set value of NaN ', () => {
        expect(reduceActions(actions.setHeight('hello')).getIn(['height', 'value']))
          .to.be.null;
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

  describe('#setHeight & #setWidth()', () => {
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

  describe('#toggleLive()', () => {
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

  describe('#textualGridToState() utility', () => {
    context('on valid grid', () => {
      const state = textualGridToState([
        '--===--',
        '-==X==-',
        '-=XXX=-',
        '-==X==-',
        '--===--',
      ]);
      it('should add a grid with corresponding length', () => {
        expect(state.get('cells')).to.have.size(5);
      });
      it('should add a grid with rows of corresponding lengths', () => {
        state.get('cells').forEach(x => expect(x).to.have.size(7));
      });
      it('should fill liveCells with corresponding cells', () => {
        const expectedLiveCells = [[2, 2], [1, 3], [2, 3], [3, 3], [2, 4]]
                .map(([row, column]) => Map({ live: true, row, column }));
        expect(state.get('liveCells')).to.equal(Set(expectedLiveCells));
      });
      it('should fill riseCandidates with corresponding cells', () => {
        const expectedRiseCandidates =
                [[0, 2], [0, 3], [0, 4], [1, 1], [1, 2], [1, 4], [1, 5], [2, 1],
                 [2, 5], [3, 1], [3, 2], [3, 4], [3, 5], [4, 2], [4, 3], [4, 4]]
                .map(([row, column]) => Map({ live: false, row, column }));
        expect(state.get('riseCandidates')).to.equal(Set(expectedRiseCandidates));
      });
    });

    context('on invalid grid', () => {
      it('should throw RangeError', () => {
        expect(() => textualGridToState([
          '--===--',
          '-==X==-',
          '-=X+X=-',
          '-==X==-',
          '--===--',
        ])).to.throw(RangeError);
      });
    });
  });

  describe('#nextStep()', () => {
    context('glider pattern', () => {
      const gliderFlow = List.of(
        [
          '--------',
          '--===---',
          '--=X==--',
          '-===X=--',
          '-=XXX=--',
          '-=====--',
          '--------',
        ],
        [
          '--------',
          '--------',
          '-=====--',
          '-=X=X=--',
          '-==XX=--',
          '--=X==--',
          '--===---',
        ],
        [
          '--------',
          '--------',
          '---===--',
          '-===X=--',
          '-=X=X=--',
          '-==XX=--',
          '--====--',
        ],
        [
          '--------',
          '--------',
          '--===---',
          '--=X===-',
          '--==XX=-',
          '--=XX==-',
          '--====--',
        ],
        [
          '--------',
          '--------',
          '---===--',
          '---=X==-',
          '--===X=-',
          '--=XXX=-',
          '--=====-',
        ],
        [
          '---===--',
          '--------',
          '--------',
          '--=====-',
          '--=X=X=-',
          '--==XX=-',
          '---=X==-',
        ],
        [
          '---====-',
          '--------',
          '--------',
          '----===-',
          '--===X=-',
          '--=X=X=-',
          '--==XX=-',
        ],
        [
          '---====-',
          '--------',
          '--------',
          '---===--',
          '---=X===',
          '---==XX=',
          '---=XX==',
        ],
        [
          '---=====',
          '--------',
          '--------',
          '----===-',
          '----=X==',
          '---===X=',
          '---=XXX=',
        ],
        [
          '----=X==',
          '----===-',
          '--------',
          '--------',
          '---=====',
          '---=X=X=',
          '---==XX=',
        ],
        [
          '---==XX=',
          '----====',
          '--------',
          '--------',
          '-----===',
          '---===X=',
          '---=X=X=',
        ],
        [
          '=---=XX=',
          '----====',
          '--------',
          '--------',
          '----===-',
          '=---=X==',
          '=---==XX',
        ],
        [
          '=---=XXX',
          '=---====',
          '--------',
          '--------',
          '-----===',
          '=----=X=',
          '=---===X',
        ],
        [
          '=---==XX',
          '=----=X=',
          '-----===',
          '--------',
          '--------',
          '=---====',
          '=---=X=X',
        ],
        [
          '=---=X=X',
          '=---==XX',
          '=----===',
          '--------',
          '--------',
          '=-----==',
          '=---===X',
        ],
        [
          'X=---==X',
          '==---=XX',
          '=----===',
          '--------',
          '--------',
          '-----===',
          '==---=X=',
        ],
        [
          'X=---===',
          'X=---=XX',
          '==---===',
          '--------',
          '--------',
          '=-----==',
          '==----=X',
        ],
        [
          'X=---=X=',
          'X=---==X',
          '==----=X',
          '=-----==',
          '--------',
          '--------',
          '==---===',
        ],
        [
          'X=---===',
          'X=---=X=',
          'X=---==X',
          '==----==',
          '--------',
          '--------',
          '==-----=',
        ],
        [
          '===---=X',
          'XX=---==',
          'X==---=X',
          '==----==',
          '--------',
          '--------',
          '=-----==',
        ],
        [
          'X==----=',
          '=X=---==',
          'XX=---=X',
          '===---==',
          '--------',
          '--------',
          '==-----=',
        ],
        [
          '===---==',
          '=X=---=X',
          'XX=---==',
          'X==----=',
          '==-----=',
          '--------',
          '--------',
        ],
        [
          '===-----',
          '=X=---==',
          '=X=---=X',
          'XX=---==',
          '===----=',
          '--------',
          '--------',
        ],
        [
          '==-----=',
          'X===---=',
          '=XX=---=',
          'XX==---=',
          '===----=',
          '--------',
          '--------',
        ],
      );

      gliderFlow.rest().reduce((state, x, i) => {
        const nextState = configurationReducer(state, actions.nextStep());
        context(`on step ${i + 1}`, () => {
          ['liveCells', 'riseCandidates'].forEach((attr) => {
            it(`should reduce to state with correct ${attr}`,
               () => expect(nextState.get(attr)).to.equal(textualGridToState(x).get(attr)));
          });
        });
        return nextState;
      }, textualGridToState(gliderFlow.first()));
    });
  });
});
