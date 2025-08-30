import {render} from '@config';
import React from 'react';
import {AuthHeader} from './authHeader';

const TestProps = {
  headerText: 'Some title',
  description: 'some info',
};

describe('Components > AuthHeader', () => {
  it('renders correctly', () => {
    const component = render(<AuthHeader {...TestProps} />);
    expect(component.getByText(TestProps.headerText)).toBeDefined();
    expect(component.getByText(TestProps.description)).toBeDefined();
    expect(component).toBeTruthy();
  });
});
