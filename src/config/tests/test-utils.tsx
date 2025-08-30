import React, {ReactElement} from 'react';

import {render} from '@testing-library/react-native';
import {ThemeProvider} from '@data';

type ProviderProps = {
  children: React.ReactElement;
};

const AllTheProviders = ({children}: ProviderProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, {wrapper: AllTheProviders, ...options});

export const mockNavigate = jest.fn();

export const sleep = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const getNavigationProps = ({mockNavigation = {}, mockRoute = {}}) => ({
  route: mockRoute as any,
  navigation: mockNavigation as any,
});

export * from '@testing-library/react-native';
export {customRender as render};
