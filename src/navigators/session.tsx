import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { SessionPage } from '@/pages/session';

const Stack = createNativeStackNavigator();

export function SessionNavigator() {
  const theme = useTheme();

  return (
    <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: theme.colors['shape.100'] } }}>
      <Stack.Screen
        name={SessionPage.URL}
        component={SessionPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

SessionNavigator.URL = 'navigators/session';
