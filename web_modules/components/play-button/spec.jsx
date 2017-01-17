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


import PlayButton from './index';

describe('<PlayButton />', () => {
  it('should render correctly on play status', () => {
    const tree = renderer.create(
      <PlayButton isPlay onClick={() => {}} />,
    ).toJSON();

    const snapshotFileName = path.join(__dirname, 'play-button-on-play.spec.snap');
    const snapshotName = 'PlayButton renders correctly on play status';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });

  it('should render correctly on pause status', () => {
    const tree = renderer.create(
      <PlayButton isPlay={false} onClick={() => {}} />,
    ).toJSON();

    const snapshotFileName = path.join(__dirname, 'play-button-on-pause.spec.snap');
    const snapshotName = 'PlayButton renders correctly on pause status';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });

  it('should attach onClick handler', () => {
    const onClick = spy();
    const $wrapper = mount(<PlayButton onClick={onClick} />);
    const $button = $wrapper.find('button');
    $button.simulate('click');
    expect(onClick).to.have.been.calledOnce;
  });
});
