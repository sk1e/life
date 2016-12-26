/* eslint-env browser */

import jsdom from 'jsdom';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiSinon from 'chai-sinon';
import chaiAsPromised from 'chai-as-promised';

global.document = jsdom.jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

chai.use(chaiEnzyme());
chai.use(chaiSinon);
chai.use(chaiAsPromised);
