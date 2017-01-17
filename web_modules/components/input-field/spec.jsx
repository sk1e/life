/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';
import 'utils/setup-enzyme';

import path from 'path';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import InputField from './index';


const shallowRenderer = ReactTestUtils.createRenderer();

describe('<InputField />', () => {
  it('should render correctly without error', () => {
    const tree = shallowRenderer.render(<InputField />);

    const snapshotFileName = path.join(__dirname, 'input-field-errorless.spec.snap');
    const snapshotName = 'InputField renders correctly without error';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });

  it('should render correctly with error', () => {
    const tree = shallowRenderer.render(<InputField error="so bad" />);


    const snapshotFileName = path.join(__dirname, 'input-field-errorfull.spec.snap');
    const snapshotName = 'InputField renders correctly with error';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });
});
