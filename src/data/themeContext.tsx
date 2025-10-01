import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useState,
} from 'react';
import {DarkModeColors} from './darkModeColors';
import {LightModeColors} from './lightModeColors';

type AppTheme = typeof DarkModeColors;

interface ContextValue {
  Colors: AppTheme;
  toggleTheme: () => void;
}

interface Props {
  children?: React.ReactNode;
}

const ThemeContext = createContext<ContextValue>({
  Colors: {} as AppTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = memo<Props>(({children}) => {
  const [theme, setTheme] = useState<AppTheme>(
    LightModeColors as unknown as AppTheme,
  );
  const ToggleThemeCallback = useCallback(() => {
    setTheme(() => {
      if (theme.TEXT_ICON_PRIMARY !== '#FFFFFF') {
        return DarkModeColors as unknown as AppTheme;
      } else {
        return LightModeColors as unknown as AppTheme;
      }
    });
  }, [theme]);

  const MemoizedVContextValue = React.useMemo(() => {
    const value: ContextValue = {
      Colors: theme,
      toggleTheme: ToggleThemeCallback,
    };
    return value;
  }, [theme, ToggleThemeCallback]);

  return (
    <ThemeContext.Provider value={MemoizedVContextValue}>
      {children}
    </ThemeContext.Provider>
  );
});

export const useTheme = () => useContext(ThemeContext);
