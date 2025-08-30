import React from 'react';
import {render} from '@config';
import {Button, ButtonTypes} from './button';
import {LightModeColors as Colors, TestIds} from '@library';
import {FacebookIcon} from '../../assets';

const TestProps = {
  title: 'Some title',
  disabled: false,
  loading: false,
  type: ButtonTypes.PRIMARY,
  leftIcon: <FacebookIcon testID="Social-id" />,
  rightIcon: <FacebookIcon testID="RSocial-id" />,
};

describe('Components > button', () => {
  it('renders correctly', () => {
    const component = render(<Button {...TestProps} />);
    expect(component).toBeTruthy();
    expect(component.queryByTestId(TestIds.ActivityIndicator)).toBe(null);
  });

  it('renders activity indicator', () => {
    const {getByTestId} = render(<Button {...TestProps} loading />);
    expect(getByTestId(TestIds.ActivityIndicator)).toBeDefined();
  });

  it('should be disabled', () => {
    const {getByTestId} = render(<Button {...TestProps} disabled />);
    expect(getByTestId(TestIds.Container)).toBeDisabled();
  });

  it('should be primary', () => {
    const {getByTestId} = render(<Button {...TestProps} />);
    expect(getByTestId(TestIds.Container)).toHaveStyle({
      backgroundColor: Colors.PRIMARY_900,
    });
  });

  it('should contain text', () => {
    const {getByText} = render(<Button {...TestProps} />);
    expect(getByText(TestProps.title)).toBeDefined();
  });

  it('should render left icon', () => {
    const {getByTestId} = render(<Button {...TestProps} />);
    expect(getByTestId('Social-id')).toBeDefined();
  });
  it('should render right icon', () => {
    const {getByTestId} = render(<Button {...TestProps} />);
    expect(getByTestId('RSocial-id')).toBeDefined();
  });

  it('should be secondary', () => {
    const {getByTestId} = render(
      <Button {...TestProps} type={ButtonTypes.SECONDARY} />,
    );
    expect(getByTestId(TestIds.Container)).toHaveStyle({
      backgroundColor: Colors.TRANSPARENT,
    });
  });
});
