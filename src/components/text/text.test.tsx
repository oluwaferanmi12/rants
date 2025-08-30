import {render} from '@config';
import {LightModeColors as Colors} from '@library';
import React from 'react';
import {Text, StyledTextProps} from './text';

const TestProps: StyledTextProps = {
  children: 'Some title',
  color: Colors.TEXT_ICON_PRIMARY,
  type: 'BODY',
};

describe('Components > Text', () => {
  it('renders correctly', () => {
    const component = render(<Text {...TestProps} />);
    expect(component).toBeTruthy();
  });

  it('renders child text', () => {
    const {getByText} = render(<Text {...TestProps} />);
    expect(getByText(TestProps.children as string)).toBeDefined();
  });
});
