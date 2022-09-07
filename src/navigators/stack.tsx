import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { StoresPage } from '@/pages/stores';

const Stack = createNativeStackNavigator();

export function StackNavigator() {
  const theme = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={StoresPage.URL}
        component={StoresPage}
        options={{
          title: 'Lojas',
          headerTintColor: theme.colors['text.500'],
        }}
      />
    </Stack.Navigator>
  );
}

StackNavigator.URL = 'navigators/stack';
