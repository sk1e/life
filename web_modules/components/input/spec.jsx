/* eslint-env mocha */

import 'utils/setup-chai-jest-snapshot';
import 'utils/setup-enzyme';

import path from 'path';
import React from 'react';
import renderer from 'react-test-renderer';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import Input from './index';


describe('<Input />', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Input />).toJSON();

    const snapshotFileName = path.join(__dirname, 'input.spec.snap');
    const snapshotName = 'Input renders correctly';

    expect(tree).to.matchSnapshot(snapshotFileName, snapshotName);
  });

  it("should attach onBlur handler for input element with input's node as handler's argument", () => {
    const onBlur = spy();
    const $wrapper = mount(<Input onBlur={onBlur} />);
    const $input = $wrapper.find('input');
    $input.simulate('blur');
    expect(onBlur).to.have.been.calledOnce
                  .and.calledWith($input.get(0));
  });
});

