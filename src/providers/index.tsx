import {AppProvider} from './AppProvider';
import type {ReactNode} from 'react';
import React from 'react';
import {DoobooProvider} from 'dooboo-ui';
import type {ThemeType} from 'dooboo-ui';
import {theme} from '../theme';

interface Props {
  initialThemeType?: ThemeType;
  children?: ReactNode;
}

// Add providers here
const RootProvider = ({
  initialThemeType,
  children,
}: Props): React.ReactElement => {
  return (
    <DoobooProvider
      themeConfig={{
        initialThemeType: initialThemeType ?? 'light',
        customTheme: theme,
      }}
    >
      <AppProvider>{children}</AppProvider>
    </DoobooProvider>
  );
};

export default RootProvider;
