/* eslint-env mocha */

import 'utils/setup-enzyme';

import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { match } from 'sinon';

import * as actions from 'actions';
import RootFactory, { reducerSpy } from 'utils/mock-root-factory';
import CellContainer from './index';

const Root = RootFactory(reducerSpy);

Root.store.dispatch(actions.setHeight('3'));
Root.store.dispatch(actions.setWidth('3'));

describe('<CellContainer />', () => {
  const wrapper = mount(
    <Root>
      <CellContainer
        style={{ width: '1px', height: '1px', maxWidth: '1px', maxHeight: '1px' }}
        row={0}
        column={0}
      />
    </Root>,
  );

  const $cell = wrapper.find('.cell');

  it('should dispatch toggleLive action on click', () => {
    reducerSpy.reset();
    $cell.simulate('click');
    expect(reducerSpy).to.have.been.calledOnce
                      .and.calledWith(match.any, actions.toggleLive(0, 0));
  });
});

