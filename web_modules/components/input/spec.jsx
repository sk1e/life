/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';

import path from 'path';
import React from 'react';
import renderer from 'react-test-renderer';
import { expect } from 'chai';
import RootFactory, { reducerSpy } from 'utils/mock-root-factory';

import Input from './index';

const Root = RootFactory(reducerSpy);

describe('<Input />', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Root>
        <Input />
      </Root>,
    ).toJSON();

    const snapshotFileName = path.join(__dirname, 'input.spec.snap');
    const snapshotName = 'Input renders correctly';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });
});
