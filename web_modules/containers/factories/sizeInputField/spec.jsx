/* eslint-env mocha */

import 'utils/setup-enzyme';

import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { match } from 'sinon';

import * as actions from 'actions';
import RootFactory, { reducerSpy } from 'utils/mock-root-factory';

import * as products from './products.jsx';

const Root = RootFactory(reducerSpy);

describe('#sizeInputFieldContainerFactory()', () => {
  [
    ['<HeightInputFieldContainer />', products.HeightInputFieldContainer, actions.setHeight, 'setHeight'],
    ['<WidthInputFieldContainer />', products.WidthInputFieldContainer, actions.setWidth, 'setWidth'],
  ].forEach(([containerName, Container, action, actionName]) => {
    describe(containerName, () => {
      const wrapper = mount(
        <Root>
          <Container />
        </Root>,
      );
      const $input = wrapper.find('input');
      it(`should dispatch ${actionName} action on input blur`, () => {
        reducerSpy.reset();
        const n = '3';
        $input.get(0).value = n;
        $input.simulate('blur');
        expect(reducerSpy).to.have.been.calledOnce
                          .and.calledWith(match.any, action(n));
      });
    });
  });
});
