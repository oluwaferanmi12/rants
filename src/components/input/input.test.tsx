import {render} from '@config';
import React from 'react';
import {Input} from './input';
import {LightModeColors as Colors} from '@library';

const TestProps = {
  label: 'Some title',
  infoText: 'some info',
  isError: true,
};

describe('Components > Input', () => {
  it('renders correctly', () => {
    const component = render(<Input {...TestProps} />);
    expect(component).toBeTruthy();
  });

  it('renders label', () => {
    const {getByText} = render(<Input {...TestProps} />);
    expect(getByText(TestProps.label)).toBeDefined();
  });

  it('renders info text', () => {
    const {getByText} = render(<Input {...TestProps} />);
    expect(getByText(TestProps.infoText)).toBeDefined();
  });

  it('renders info text as error', () => {
    const {getByText} = render(<Input {...TestProps} />);
    expect(getByText(TestProps.infoText)).toHaveStyle({
      color: Colors.ERROR_900,
    });
  });
});
