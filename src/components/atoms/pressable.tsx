import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';
import { theme } from '@/theme';

const ButtonContainer = styled(RectButton)<{
  _background?: keyof typeof theme.colors;
  _padding?: keyof typeof theme.spaces;
}>`
  overflow: hidden;

  ${({ _background }) =>
    _background &&
    css`
      background-color: ${({ theme }) => theme.colors[_background]};
    `}

  ${({ _padding }) =>
    _padding &&
    css`
      padding: ${({ theme }) => theme.spaces[_padding]}px;
    `}
`;

export function Pressable(props: {
  children: ReactNode;
  onPress: () => void;
  padding?: keyof typeof theme.spaces;
  background?: keyof typeof theme.colors;
}) {
  return (
    <ButtonContainer
      onPress={props.onPress}
      _padding={props.padding}
      _background={props.background}>
      <View
        accessible
        accessibilityRole="button">
        {props.children}
      </View>
    </ButtonContainer>
  );
}
