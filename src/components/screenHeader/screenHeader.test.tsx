import {render} from '@config';
import React from 'react';
import {ScreenHeader} from './screenHeader';

describe('Components > ScreenHeader', () => {
  it('renders correctly', () => {
    const component = render(<ScreenHeader />);
    expect(component).toBeTruthy();
  });
});
