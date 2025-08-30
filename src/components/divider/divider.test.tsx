import {render} from '@config';
import React from 'react';
import {Divider} from './divider';

describe('Components > Divider', () => {
  it('renders correctly', () => {
    const component = render(<Divider />);
    expect(component).toBeTruthy();
  });
});
