import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { useSession } from '@/contexts/session';
import { KeeperProvider } from '@/providers/keeper';
import { SessionRepository } from '@/repositories/session';
import { isSuccess } from '@/either';
import { http } from '@/libs/axios';
import { SessionNavigator } from '@/navigators/session';
import { StoreRepository } from '@/repositories/store';
import { useStore } from '@/contexts/store';
import { TabNavigator } from '@/navigators/tab';

const keeperProvider = KeeperProvider();
const sessionRepository = SessionRepository();
const storeRepository = StoreRepository();

export function Navigator() {
  const [isFontLoaded] = useFonts({ NunitoRegular: Nunito_400Regular, NunitoBold: Nunito_700Bold });
  const isLoading = useSession((context) => context.isLoading);
  const setIsLoading = useSession((context) => context.setIsLoading);
  const setUser = useSession((context) => context.setUser);
  const user = useSession((context) => context.user);
  const setStores = useStore((context) => context.setStores);

  async function onStart() {
    // copiar os detalhes do projeto consumer
    await preventAutoHideAsync();
    const token = await keeperProvider.find(KeeperProvider.KEY_TOKEN);
    if (token) {
      const user = await sessionRepository.findOne(token);
      if (isSuccess(user)) {
        http.defaults.headers.common.Authorization = `Bearer ${token}`;
        setUser(user.success);
      } else {
        await keeperProvider.remove(KeeperProvider.KEY_TOKEN);
      }
      const page = 1;
      const stores = await storeRepository.findMany(page);
      if (isSuccess(stores)) {
        setStores(stores.success.items);
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

  return (
    <View
      style={{ flex: 1 }}
      onLayout={onLayoutRootView}>
      <NavigationContainer>{!user ? <SessionNavigator /> : <TabNavigator />}</NavigationContainer>
    </View>
  );
}
