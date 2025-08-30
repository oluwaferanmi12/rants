import React, {
  createContext,
  memo,
  useCallback,
  useMemo,
  useState,
} from 'react';

import {
  AuthConfig,
  InitialAppState,
  initialAppState,
} from './initial-app-state';

interface ProviderProps {
  value?: {
    authConfig: AuthConfig;
  };
  children?: React.ReactNode;
}

export const AppContext = createContext<InitialAppState>(initialAppState);

export const AppProvider = memo<ProviderProps>(({children, value}) => {
  const [values, setValues] = useState<InitialAppState>({
    ...initialAppState,
    ...value,
  });

  const dispatch = useCallback((newState: Partial<InitialAppState>) => {
    setValues(prevState => ({...prevState, ...newState}));
  }, []);

  const contextValue = useMemo(
    () => ({
      ...values,
      dispatch,
      initialAppState,
    }),
    [values, dispatch],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
});
