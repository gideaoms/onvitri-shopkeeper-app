import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';
import { Handbag, User } from 'phosphor-react-native';
import { ProfileNavigator } from '@/navigators/profile';
import { ProductNavigator } from '@/navigators/product';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={ProductNavigator.URL}
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors['text.300'],
      }}>
      <Tab.Screen
        name={ProductNavigator.URL}
        component={ProductNavigator}
        options={{
          title: 'Produtos',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Handbag
              color={color}
              size={size}
              weight="light"
            />
          ),
        }}
      />
      <Tab.Screen
        name={ProfileNavigator.URL}
        component={ProfileNavigator}
        options={{
          title: 'Perfil',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <User
              color={color}
              size={size}
              weight="light"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

TabNavigator.URL = 'navigators/tab';
