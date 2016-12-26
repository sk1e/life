/* eslint-env mocha */

import 'utils/setup-enzyme';

import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { match } from 'sinon';

import * as actions from 'actions';
import Root, { reducerSpy } from 'utils/mock-root-component';
import ControlPanelContainer from './index';


describe('<ControlPanelContainer />', () => {
  const wrapper = mount(
    <Root>
      <ControlPanelContainer />
    </Root>,
  );
  const inputs = wrapper.find('input');
  const [$heightInput, $widthInput] = [inputs.at(0), inputs.at(1)];

  it('should dispatch setHeight action on height input blur', () => {
    reducerSpy.reset();
    const n = '3';
    $heightInput.get(0).value = n;
    $heightInput.simulate('blur');
    expect(reducerSpy).to.have.been.calledOnce
                      .and.calledWith(match.any, actions.setHeight(n));
  });

  it('should dispatch setWidth action on width input blur', () => {
    reducerSpy.reset();
    const n = '4';
    $widthInput.get(0).value = n;
    $widthInput.simulate('blur');
    expect(reducerSpy).to.have.been.calledOnce
                      .and.calledWith(match.any, actions.setWidth(n));
  });
});
