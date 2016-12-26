/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';

import path from 'path';
import React from 'react';
import renderer from 'react-test-renderer';
import { expect } from 'chai';
import RootFactory, { reducerSpy } from 'utils/mock-root-factory';

import ControlPanel from './index';

const Root = RootFactory(reducerSpy);

describe('<ControlPanel />', () => {
  it('should render correctly', () => {
    const nullInputProperty = { onBlur: null, error: null };
    const tree = renderer.create(
      <Root>
        <ControlPanel height={nullInputProperty} width={nullInputProperty} />
      </Root>,
    ).toJSON();

    const snapshotFileName = path.join(__dirname, 'control-panel.spec.snap');
    const snapshotName = 'ControlPanel renders correctly';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });
});
