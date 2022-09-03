import React, { ReactElement } from 'react';
import { FlatList } from 'react-native';
import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';
import { Loading } from '@/components/atoms/loading';

export function List<T>(props: {
  data: T[];
  keyExtractor(item: T): string;
  renderItem(item: T): ReactElement;
  refreshing?: boolean;
  onRefresh?(): void;
  loadingMore?: boolean;
  onLoadMore?(): void;
  Header?: ReactElement;
}) {
  return (
    <FlatList
      data={props.data}
      keyExtractor={props.keyExtractor}
      showsVerticalScrollIndicator={false}
      refreshing={props.refreshing}
      onRefresh={props.onRefresh}
      onEndReachedThreshold={0.1}
      onEndReached={props.onLoadMore}
      renderItem={({ item }) => props.renderItem(item)}
      contentContainerStyle={{ flexGrow: props.data.length === 0 ? 1 : undefined }}
      ListHeaderComponent={props.Header}
      ItemSeparatorComponent={() => (
        <Box
          height="md"
          background="shape.500"
        />
      )}
      ListEmptyComponent={
        props.refreshing || props.loadingMore ? null : (
          <Box
            flex={1}
            justifyContent="center"
            alignItems="center">
            <Text
              size="sm"
              color="text.500"
              textAlign="center">
              Não há dados para serem exibidos
            </Text>
          </Box>
        )
      }
      ListFooterComponent={
        props.loadingMore ? (
          <Box padding="md">
            <Loading
              color="primary"
              size="lg"
            />
          </Box>
        ) : null
      }
    />
  );
}
