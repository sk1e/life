/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';

import path from 'path';
import React from 'react';
import renderer from 'react-test-renderer';
import { expect } from 'chai';

import Input from './index';


describe('<Input />', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Input />,
    ).toJSON();

    const snapshotFileName = path.join(__dirname, 'input.spec.snap');
    const snapshotName = 'Input renders correctly';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });
});
