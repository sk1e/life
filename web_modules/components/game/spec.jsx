/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';

import path from 'path';
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Game from './index';


describe('<Game />', () => {
  it('should render correctly', () => {
    const tree = toJson(shallow(<Game />));

    const snapshotFileName = path.join(__dirname, 'game.spec.snap');
    const snapshotName = 'Game renders correctly';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });
});
