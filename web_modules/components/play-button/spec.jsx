/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';

import path from 'path';
import React from 'react';
import renderer from 'react-test-renderer';
import { expect } from 'chai';
import RootFactory, { reducerSpy } from 'utils/mock-root-factory';

import PlayButton from './index';

const Root = RootFactory(reducerSpy);

describe('<PlayButton />', () => {
  it('should render correctly on play status', () => {
    const tree = renderer.create(
      <Root>
        <PlayButton isPlay onClick={() => {}} />
      </Root>,
    ).toJSON();

    const snapshotFileName = path.join(__dirname, 'play-button-on-play.spec.snap');
    const snapshotName = 'PlayButton renders correctly on play status';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName, true);
  });

  it('should render correctly on pause status', () => {
    const tree = renderer.create(
      <Root>
        <PlayButton isPlay={false} onClick={() => {}} />
      </Root>,
    ).toJSON();

    const snapshotFileName = path.join(__dirname, 'play-button-on-pause.spec.snap');
    const snapshotName = 'PlayButton renders correctly on pause status';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName, true);
  });
});
