import React from 'react';
import {render} from '@config';
import {Alert, AlertTypes} from './alert';
import {LightModeColors as Colors, TestIds} from '../../libs';

const TestProps = {
  title: 'Error Occured',
  type: AlertTypes.ERROR,
};

describe('Component > alert', () => {
  it('renders as it should', () => {
    const component = render(<Alert {...TestProps} />);
    expect(component).toBeTruthy();
  });
  it('should contain text', () => {
    const {getByText} = render(<Alert {...TestProps} />);
    expect(getByText(TestProps.title)).toBeDefined();
  });
  it('should be error and must have XIcon', () => {
    const {getByTestId} = render(<Alert {...TestProps} />);
    expect(getByTestId(TestIds.AlertWrapper)).toHaveStyle({
      backgroundColor: Colors.ERROR_900,
    });
    expect(getByTestId(TestIds.XIcon)).toBeDefined();
  });
  it('should be success and must have TickIcon', () => {
    const {getByTestId} = render(
      <Alert {...TestProps} type={AlertTypes.SUCCESS} />,
    );
    expect(getByTestId(TestIds.AlertWrapper)).toHaveStyle({
      backgroundColor: Colors.SUCCESS_900,
    });
    expect(getByTestId(TestIds.TickIcon)).toBeDefined();
  });
  it('should be warning and Warning Icon', () => {
    const {getByTestId} = render(
      <Alert {...TestProps} type={AlertTypes.WARNING} />,
    );
    expect(getByTestId(TestIds.AlertWrapper)).toHaveStyle({
      backgroundColor: Colors.CAUTION_900,
    });
    expect(getByTestId(TestIds.WarningIcon)).toBeDefined();
  });
});
