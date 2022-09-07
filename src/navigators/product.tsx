import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { PlusCircle, Storefront } from 'phosphor-react-native';
import { ProductsPage } from '@/pages/products';
import { ProductPage } from '@/pages/product';
import { Box } from '@/components/atoms/box';

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
            <Box direction="row">
              <BorderlessButton
                onPress={() => navigation.navigate('navigators/stack', { screen: 'pages/stores' })}>
                <Storefront
                  size={28}
                  weight="light"
                />
              </BorderlessButton>
              <Box width="md" />
              <BorderlessButton
                onPress={() => navigation.navigate('pages/product', { productId: undefined })}>
                <PlusCircle
                  size={28}
                  weight="light"
                />
              </BorderlessButton>
            </Box>
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
