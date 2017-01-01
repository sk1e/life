import { setHeight, setWidth } from 'actions';
import sizeInputFieldContainerFactory from './factory.jsx';

export const [HeightInputFieldContainer, WidthInputFieldContainer] =
  [
    ['height', setHeight],
    ['width', setWidth],
  ].map(([sizeType, action]) => sizeInputFieldContainerFactory(sizeType, action));

