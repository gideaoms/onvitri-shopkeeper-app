import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { PlusCircle } from 'phosphor-react-native';
import { ProductsPage } from '@/pages/products';
import { ProductPage } from '@/pages/product';

const Stack = createNativeStackNavigator();

export function ProductNavigator() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: theme.colors['shape.100'] } }}>
      <Stack.Screen
        name={ProductsPage.URL}
        component={ProductsPage}
        options={{
          title: 'Produtos',
          headerTintColor: theme.colors['text.500'],
          headerRight: () => (
            <BorderlessButton onPress={() => navigation.navigate('pages/product', {})}>
              <PlusCircle
                size={28}
                weight="light"
              />
            </BorderlessButton>
          ),
        }}
      />
      <Stack.Screen
        name={ProductPage.URL}
        component={ProductPage}
        options={{
          title: 'Produto',
          headerTintColor: theme.colors['text.500'],
        }}
      />
    </Stack.Navigator>
  );
}

ProductNavigator.URL = 'navigators/product';
