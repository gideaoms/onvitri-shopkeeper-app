import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';
import { ImageSquare } from 'phosphor-react-native';
import { Store } from '@/types/store';
import { City } from '@/types/city';
import { Pressable } from '@/components/atoms/pressable';
import { Text } from '@/components/atoms/text';
import { Product } from '@/types/product';
import { ProductModel } from '@/models/product';
import { Box } from '@/components/atoms/box';
import { PictureModel } from '@/models/picture';

const productModel = ProductModel();
const pictureModel = PictureModel();

const ImageContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors['text.300']};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

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
          <ImageContainer>
            <Image
              source={{
                uri: pictureModel.findVariant(props.product.pictures[0].variants, 'sm').url,
                width: 80,
                height: 80,
              }}
            />
          </ImageContainer>
        ) : (
          <ImageContainer>
            <ImageSquare
              size={24}
              weight="light"
            />
          </ImageContainer>
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
