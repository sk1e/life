/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';

import path from 'path';
import React from 'react';
import renderer from 'react-test-renderer';
import { expect } from 'chai';

import Cell from './index';

describe('<Cell />', () => {
  const buttonStyle = { width: '1px', height: '1px', maxWidth: '1px', maxHeight: '1px' };

  it('should render correctly on live status', () => {
    const tree = renderer.create(
      <Cell live style={buttonStyle} onClick={() => {}} />,
    ).toJSON();

    const snapshotFileName = path.join(__dirname, 'live-cell.spec.snap');
    const snapshotName = 'Cell renders correctly on live status';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });

  it('should render correctly on dead status', () => {
    const tree = renderer.create(
      <Cell live={false} style={buttonStyle} onClick={() => {}} />,
    ).toJSON();

    const snapshotFileName = path.join(__dirname, 'dead-cell.spec.snap');
    const snapshotName = 'Cell renders correctly on dead status';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });
});
