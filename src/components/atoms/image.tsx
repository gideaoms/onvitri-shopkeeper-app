import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { Spinner } from 'phosphor-react-native';
import { useTheme } from 'styled-components/native';
import { Picture } from '@/types/picture';
import { Box } from '@/components/atoms/box';

export function Image(props: {
  variant: Picture.Variant;
  width?: number;
  height?: number;
  resizeMode?: 'cover' | 'contain';
}) {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <FastImage
      source={{
        uri: props.variant.url,
        priority: 'high',
      }}
      resizeMode={props.resizeMode}
      style={{
        width: props.width,
        height: props.height,
      }}
      onLoadEnd={() => {
        setIsLoading(false);
      }}>
      {isLoading && (
        <Box
          background="shape.500"
          flex={1}
          alignItems="center"
          justifyContent="center">
          <Spinner
            size={24}
            color={theme.colors['text.500']}
            weight="thin"
          />
        </Box>
      )}
    </FastImage>
  );
}
