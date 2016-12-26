/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';

import path from 'path';
import React from 'react';
import renderer from 'react-test-renderer';
import { expect } from 'chai';
import * as actions from 'actions';
import RootFactory, { reducerSpy } from 'utils/mock-root-factory';

import CellGrid from './index';

const Root = RootFactory(reducerSpy);

Root.store.dispatch(actions.setHeight('3'));
Root.store.dispatch(actions.setWidth('4'));

describe('<CellGrid />', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Root>
        <CellGrid height={3} width={4} />
      </Root>,
    ).toJSON();
    const snapshotFileName = path.join(__dirname, 'cell-grid.spec.snap');
    const snapshotName = 'CellGrid renders correctly';
    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });
});
