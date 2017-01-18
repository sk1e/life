/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';

import path from 'path';
import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import ControlPanel from './index';


describe('<ControlPanel />', () => {
  it('should render correctly', () => {
    const tree = toJson(shallow(<ControlPanel />));

    const snapshotFileName = path.join(__dirname, 'control-panel.spec.snap');
    const snapshotName = 'ControlPanel renders correctly';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });
});
