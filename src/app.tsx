import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { preventAutoHideAsync } from 'expo-splash-screen';
import { init } from '@sentry/react-native';
import { Navigator } from '@/navigator';
import { theme } from '@/theme';
import { config } from '@/config';

preventAutoHideAsync();

init({
  dsn: config.SENTRY_DSN,
});

export function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar style="dark" />
        <Navigator />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
