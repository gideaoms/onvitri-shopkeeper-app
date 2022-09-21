import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { List } from '@/components/atoms/list';
import { ListOf } from '@/utils';
import { Store } from '@/types/store';
import { StoreRepository } from '@/repositories/store';
import { isSuccess } from '@/either';
import { StoreCard } from '@/components/molecules/store-card';
import { City } from '@/types/city';
import { KeeperProvider } from '@/providers/keeper';
import { useStore } from '@/contexts/store';

const storeRepository = StoreRepository();
const keeperProvider = KeeperProvider();

export function StoresPage() {
  const [stores, setStores] = useState<ListOf<Store & { city: City }>>([]);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const setStore = useStore((context) => context.setStore);
  const navigation = useNavigation();

  async function setCurrentStore(store: Store) {
    const stringifiedStore = JSON.stringify(store);
    await keeperProvider.save(KeeperProvider.KEY_STORE, stringifiedStore);
    setStore(store);
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  async function refresh() {
    setIsRefreshing(true);
    setErrorMessage('');
    const page = 1;
    const result = await storeRepository.findMany(page);
    if (isSuccess(result)) {
      setStores(result.success.items);
      setPage((page) => page + 1);
      setHasMore(result.success.hasMore);
      const hasOnlyOne = result.success.items.length === 1;
      if (hasOnlyOne) {
        const [store] = result.success.items;
        setCurrentStore(store);
      }
    } else {
      setErrorMessage(result.failure.message);
    }
    setIsRefreshing(false);
  }

  async function loadMore() {
    if (isRefreshing) return;
    if (!hasMore) return;
    setIsLoadingMore(true);
    const result = await storeRepository.findMany(page);
    if (isSuccess(result)) {
      setStores((stores) => [...stores, ...result.success.items]);
      setPage((page) => page + 1);
      setHasMore(result.success.hasMore);
    } else {
      setErrorMessage(result.failure.message);
    }
    setIsLoadingMore(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (errorMessage) Alert.alert('Atenção', errorMessage);
  }, [errorMessage]);

  return (
    <List
      data={stores}
      keyExtractor={(item) => item.id}
      onRefresh={refresh}
      refreshing={isRefreshing}
      renderItem={(item) => (
        <StoreCard
          store={item}
          onPress={setCurrentStore}
        />
      )}
      loadingMore={isLoadingMore}
      onLoadMore={loadMore}
    />
  );
}

StoresPage.URL = 'pages/stores';
