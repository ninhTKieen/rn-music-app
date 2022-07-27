import React from 'react';

import { Provider } from 'src/provider';
import { ApplicationProvider as UiKittenProvider } from '@ui-kitten/components';
import { Provider as ReduxProvider } from 'react-redux';

import { StatusBar } from 'react-native';
import * as eva from '@eva-design/eva';
import { Provider as PaperProvider, DarkTheme } from 'react-native-paper';

import { store } from 'src/features/store';
import { Colors } from './constants';
import AppNavigation from 'src/navigations';

import Toast from 'react-native-toast-message';

interface Props {}

export const App: React.FC<Props> = () => {
  const theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: Colors.primary,
      secondary: 'yellow',
    },
  };

  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <UiKittenProvider {...eva} theme={eva.dark}>
          <Provider>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="light-content"
            />
            <AppNavigation />
            <Toast />
          </Provider>
        </UiKittenProvider>
      </PaperProvider>
    </ReduxProvider>
  );
};
