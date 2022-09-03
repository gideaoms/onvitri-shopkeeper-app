import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProductCard } from '@/components/molecules/product-card';
import { List } from '@/components/atoms/list';
import { ProductRepository } from '@/repositories/product';
import { isSuccess } from '@/either';
import { useProduct } from '@/contexts/product';

const productRepository = ProductRepository();

export function ProductsPage() {
  const navigation = useNavigation();
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const products = useProduct((context) => context.products);
  const setProducts = useProduct((context) => context.setProducts);

  function onPress(productId: string) {
    navigation.navigate('pages/product', { productId: productId });
  }

  async function refresh() {
    setIsRefreshing(true);
    setErrorMessage('');
    const page = 1;
    const result = await productRepository.findMany(page);
    if (isSuccess(result)) {
      setProducts(result.success.items);
      setPage((page) => page + 1);
      setHasMore(result.success.hasMore);
    } else {
      setErrorMessage(result.failure.message);
    }
    setIsRefreshing(false);
  }

  async function loadMore() {
    if (isRefreshing) return;
    if (!hasMore) return;
    setIsLoadingMore(true);
    const result = await productRepository.findMany(page);
    if (isSuccess(result)) {
      setProducts([...products, ...result.success.items]);
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
      data={products}
      keyExtractor={(item) => item.id}
      onRefresh={refresh}
      refreshing={isRefreshing}
      renderItem={(item) => (
        <ProductCard
          product={item}
          onPress={onPress}
        />
      )}
      loadingMore={isLoadingMore}
      onLoadMore={loadMore}
    />
  );
}

ProductsPage.URL = 'pages/products';
