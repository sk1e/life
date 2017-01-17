/* eslint-env mocha */
/* eslint no-unused-expressions: "off" */

import 'utils/setup-chai-jest-snapshot';
import 'utils/setup-enzyme';

import path from 'path';
import React from 'react';
import renderer from 'react-test-renderer';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';


import Cell from './index';

describe('<Cell />', () => {
  const cellStyle = { width: '1px', height: '1px', maxWidth: '1px', maxHeight: '1px' };

  it('should render correctly on live status', () => {
    const tree = renderer.create(
      <Cell live style={cellStyle} onClick={() => {}} />,
    ).toJSON();

    const snapshotFileName = path.join(__dirname, 'live-cell.spec.snap');
    const snapshotName = 'Cell renders correctly on live status';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });

  it('should render correctly on dead status', () => {
    const tree = renderer.create(
      <Cell live={false} style={cellStyle} onClick={() => {}} />,
    ).toJSON();

    const snapshotFileName = path.join(__dirname, 'dead-cell.spec.snap');
    const snapshotName = 'Cell renders correctly on dead status';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });

  it('should attach onClick handler', () => {
    const onClick = spy();
    const $wrapper = mount(<Cell onClick={onClick} live style={cellStyle} />);
    const $cell = $wrapper.find('.cell');
    $cell.simulate('click');
    expect(onClick).to.have.been.calledOnce;
  });
});
