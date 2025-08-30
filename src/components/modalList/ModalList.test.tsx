import {render} from '@config';
import React from 'react';
import {ModalList} from './ModalList';

describe('Components > ModalList', () => {
  it('renders correctly', () => {
    const component = render(<ModalList text="Some text" />);
    expect(component).toBeTruthy();
  });
});
