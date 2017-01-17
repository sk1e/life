/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';

import path from 'path';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import CellGrid from './index';

const shallowRenderer = ReactTestUtils.createRenderer();

describe('<CellGrid />', () => {
  it('should render correctly', () => {
    const tree = shallowRenderer.render(<CellGrid height={3} width={4} />);

    const snapshotFileName = path.join(__dirname, 'cell-grid.spec.snap');
    const snapshotName = 'CellGrid renders correctly';
    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });
});
