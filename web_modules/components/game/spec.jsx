/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';

import path from 'path';
import React from 'react';
import renderer from 'react-test-renderer';
import { expect } from 'chai';
import RootFactory, { reducerSpy } from 'utils/mock-root-factory';

import Game from './index';

const Root = RootFactory(reducerSpy);

describe('<Game />', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Root>
        <Game />
      </Root>,
    ).toJSON();

    const snapshotFileName = path.join(__dirname, 'game.spec.snap');
    const snapshotName = 'Game renders correctly';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName, true);
  });
});
