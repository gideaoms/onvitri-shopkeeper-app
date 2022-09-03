import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { SessionStepOnePage } from '@/pages/session-step-one';
import { SessionStepTwoPage } from '@/pages/session-step-two';

const Stack = createNativeStackNavigator();

export function SessionNavigator() {
  const theme = useTheme();

  return (
    <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: theme.colors['shape.100'] } }}>
      <Stack.Screen
        name={SessionStepOnePage.URL}
        component={SessionStepOnePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SessionStepTwoPage.URL}
        component={SessionStepTwoPage}
        options={{
          title: 'Código de validação',
        }}
      />
    </Stack.Navigator>
  );
}

SessionNavigator.URL = 'navigators/session';
