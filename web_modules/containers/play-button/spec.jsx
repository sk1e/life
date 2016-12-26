/* eslint-env mocha */

import 'utils/setup-enzyme';

import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { match } from 'sinon';

import * as actions from 'actions';
import Root, { reducerSpy } from 'utils/mock-root-component';
import PlayButtonContainer from './index';


describe('<PlayButtonContainer />', () => {
  const wrapper = mount(
    <Root>
      <PlayButtonContainer />
    </Root>,
  );

  const $button = wrapper.find('button');

  context('on click', () => {
    const reducerAfterOneStep = resolve => setTimeout(() => resolve(reducerSpy), 600);

    context('first', () => {
      before(() => {
        reducerSpy.reset();
        $button.simulate('click');
      });

      it('initially should dispatch togglePlayStatus and nextStep action', () => {
        expect(reducerSpy).to.have.been.calledTwice
                          .and.calledWith(match.any, actions.togglePlayStatus())
                          .and.calledWith(match.any, actions.nextStep());
      });

      it('should enter loop of dispatching nextStep action', (done) => {
        reducerSpy.reset();
        expect(new Promise(reducerAfterOneStep)).to.eventually.have.been.calledOnce
                                                .and.calledWith(match.any, actions.nextStep())
                                                .notify(done);
      });
    });

    context('second', () => {
      before(() => {
        reducerSpy.reset();
        $button.simulate('click');
      });

      it('initially should dispatch togglePlayStatus', () => {
        expect(reducerSpy).to.have.been.calledOnce
                          .and.calledWith(match.any, actions.togglePlayStatus());
      });

      it('should not dispatching nextStep action anymore', (done) => {
        reducerSpy.reset();
        expect(new Promise(reducerAfterOneStep)).to.eventually.have.not.been.called.notify(done);
      });
    });
  });
});

