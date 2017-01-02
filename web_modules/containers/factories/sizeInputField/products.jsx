import { setHeight, setWidth } from 'actions';
import sizeInputFieldContainerFactory from './factory';

export const [HeightInputFieldContainer, WidthInputFieldContainer] =
  [
    ['height', setHeight],
    ['width', setWidth],
  ].map(([sizeType, action]) => sizeInputFieldContainerFactory(sizeType, action));

