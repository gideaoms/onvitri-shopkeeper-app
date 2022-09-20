import React from 'react';
import { ImageSquare } from 'phosphor-react-native';
import { Store } from '@/types/store';
import { City } from '@/types/city';
import { Pressable } from '@/components/atoms/pressable';
import { Text } from '@/components/atoms/text';
import { Product } from '@/types/product';
import { ProductModel } from '@/models/product';
import { Box } from '@/components/atoms/box';
import { PictureModel } from '@/models/picture';
import { Image } from '@/components/atoms/image';

const productModel = ProductModel();
const pictureModel = PictureModel();

export function ProductCard(props: {
  product: Product & { store: Store & { city: City } };
  onPress(productId: string): void;
}) {
  return (
    <Pressable
      onPress={() => props.onPress(props.product.id)}
      padding="md"
      background="shape.100">
      <Box
        direction="row"
        alignItems="center">
        {productModel.hasPicture(props.product) ? (
          <Box
            width={80}
            height={80}
            radius={5}
            alignItems="center"
            justifyContent="center"
            border={1}
            borderColor="text.300"
            background="shape.500">
            <Image
              variant={pictureModel.findVariant(props.product.pictures[0].variants, 'sm')}
              width={80}
              height={80}
            />
          </Box>
        ) : (
          <Box
            width={80}
            height={80}
            radius={5}
            alignItems="center"
            justifyContent="center"
            border={1}
            borderColor="text.300"
            background="shape.500">
            <ImageSquare
              size={24}
              weight="light"
            />
          </Box>
        )}
        <Box width="sm" />
        <Box flex={1}>
          <Text
            size="lg"
            color="text.500">
            {props.product.title}
          </Text>
          <Text
            size="sm"
            color="text.300">
            {props.product.store.fantasyName}
          </Text>
          {productModel.isActive(props.product) ? (
            <Text
              size="xs"
              color="primary">
              Publicado
            </Text>
          ) : (
            <Text
              size="xs"
              color="secondary">
              Rascunho
            </Text>
          )}
        </Box>
      </Box>
    </Pressable>
  );
}
