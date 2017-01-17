/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';

import path from 'path';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Game from './index';


const shallowRenderer = ReactTestUtils.createRenderer();

describe('<Game />', () => {
  it('should render correctly', () => {
    const tree = shallowRenderer.render(<Game />);

    const snapshotFileName = path.join(__dirname, 'game.spec.snap');
    const snapshotName = 'Game renders correctly';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });
});
