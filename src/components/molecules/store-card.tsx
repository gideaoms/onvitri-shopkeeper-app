import React from 'react';
import { Store } from '@/types/store';
import { City } from '@/types/city';
import { Pressable } from '@/components/atoms/pressable';
import { Text } from '@/components/atoms/text';

export function StoreCard(props: { store: Store & { city: City }; onPress(store: Store): void }) {
  return (
    <Pressable
      onPress={() => props.onPress(props.store)}
      padding="md"
      background="shape.100">
      <Text
        size="lg"
        color="text.500">
        {props.store.fantasyName}
      </Text>
      <Text
        size="sm"
        color="text.300">
        {props.store.street}, {props.store.number} - {props.store.neighborhood}
      </Text>
      <Text
        size="sm"
        color="text.300">
        {props.store.city.name} - {props.store.city.initials}
      </Text>
    </Pressable>
  );
}
