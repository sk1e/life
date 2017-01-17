/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';

import path from 'path';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';

import ControlPanel from './index';

const shallowRenderer = ReactTestUtils.createRenderer();

describe('<ControlPanel />', () => {
  it('should render correctly', () => {
    const tree = shallowRenderer.render(<ControlPanel />);

    const snapshotFileName = path.join(__dirname, 'control-panel.spec.snap');
    const snapshotName = 'ControlPanel renders correctly';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });
});
