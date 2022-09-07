import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { hideAsync } from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { useSession } from '@/contexts/session';
import { KeeperProvider } from '@/providers/keeper';
import { SessionRepository } from '@/repositories/session';
import { isSuccess } from '@/either';
import { http } from '@/libs/axios';
import { SessionNavigator } from '@/navigators/session';
import { TabNavigator } from '@/navigators/tab';
import { StackNavigator } from '@/navigators/stack';
import { Store } from '@/types/store';
import { useStore } from '@/contexts/store';
import { StoresPage } from '@/pages/stores';

const Stack = createNativeStackNavigator();
const keeperProvider = KeeperProvider();
const sessionRepository = SessionRepository();

export function Navigator() {
  const theme = useTheme();
  const [isFontLoaded] = useFonts({ NunitoRegular: Nunito_400Regular, NunitoBold: Nunito_700Bold });
  const isLoading = useSession((context) => context.isLoading);
  const setIsLoading = useSession((context) => context.setIsLoading);
  const setUser = useSession((context) => context.setUser);
  const user = useSession((context) => context.user);
  const setStore = useStore((context) => context.setStore);
  const store = useStore((context) => context.store);

  async function onStart() {
    const token = await keeperProvider.find(KeeperProvider.KEY_TOKEN);
    if (token) {
      const user = await sessionRepository.findOne(token);
      if (isSuccess(user)) {
        http.defaults.headers.common.Authorization = `Bearer ${token}`;
        setUser(user.success);
        const stringifiedStore = await keeperProvider.find(KeeperProvider.KEY_STORE);
        if (stringifiedStore) {
          const store: Store = JSON.parse(stringifiedStore);
          setStore(store);
        }
      } else {
        await keeperProvider.remove(KeeperProvider.KEY_TOKEN);
      }
    }
    setIsLoading(false);
  }

  const onLayoutRootView = useCallback(() => {
    if (!isLoading && isFontLoaded) hideAsync();
  }, [isLoading, isFontLoaded]);

  useEffect(() => {
    onStart();
  }, []);

  if (isLoading) {
    return null;
  }

  if (!user) {
    return (
      <View
        style={{ flex: 1 }}
        onLayout={onLayoutRootView}>
        <NavigationContainer>
          <SessionNavigator />
        </NavigationContainer>
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1 }}
      onLayout={onLayoutRootView}>
      <NavigationContainer>
        {store.id ? (
          <Stack.Navigator
            initialRouteName={TabNavigator.URL}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name={TabNavigator.URL}
              component={TabNavigator}
            />
            <Stack.Screen
              name={StackNavigator.URL}
              component={StackNavigator}
            />
          </Stack.Navigator>
        ) : (
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
        )}
      </NavigationContainer>
    </View>
  );
}
