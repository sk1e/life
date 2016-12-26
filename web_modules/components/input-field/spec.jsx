/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';

import path from 'path';
import React from 'react';
import renderer from 'react-test-renderer';
import { expect } from 'chai';
import RootFactory, { reducerSpy } from 'utils/mock-root-factory';

import InputField from './index';

const Root = RootFactory(reducerSpy);

describe('<InputField />', () => {
  it('should render correctly without error', () => {
    const tree = renderer.create(
      <Root>
        <InputField />
      </Root>,
    ).toJSON();

    const snapshotFileName = path.join(__dirname, 'input-field-errorless.spec.snap');
    const snapshotName = 'InputField renders correctly without error';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });

  it('should render correctly with error', () => {
    const tree = renderer.create(
      <Root>
        <InputField error="too bad" />
      </Root>,
    ).toJSON();

    const snapshotFileName = path.join(__dirname, 'input-field-errorfull.spec.snap');
    const snapshotName = 'InputField renders correctly with error';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });
});
