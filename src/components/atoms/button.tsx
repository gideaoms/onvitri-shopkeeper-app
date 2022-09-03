import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';
import { Loading } from '@/components/atoms/loading';
import { Text } from '@/components/atoms/text';
import { theme } from '@/theme';

const ButtonContainer = styled.View<{ _borderColor?: keyof typeof theme.colors }>`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  overflow: hidden;

  ${({ _borderColor }) =>
    _borderColor &&
    css`
      border-width: 1px;
      border-color: ${({ theme }) => theme.colors[_borderColor]};
    `}
`;

const BaseButton = styled(RectButton)<{
  _background?: keyof typeof theme.colors;
  _borderColor?: keyof typeof theme.colors;
}>`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: ${({ theme }) => theme.spaces.sm}px;

  ${({ _background }) =>
    _background &&
    css`
      background-color: ${({ theme }) => theme.colors[_background]};
    `}
`;

export function Button(props: {
  onPress(): void;
  color: keyof typeof theme.colors;
  title: string;
  background?: keyof typeof theme.colors;
  loading?: boolean;
  borderColor?: keyof typeof theme.colors;
}) {
  return (
    <ButtonContainer _borderColor={props.borderColor}>
      <BaseButton
        onPress={props.onPress}
        _background={props.background}>
        {props.loading ? (
          <Loading
            color={props.color}
            size="sm"
          />
        ) : (
          <Text
            size="sm"
            color={props.color}
            uppercase>
            {props.title}
          </Text>
        )}
      </BaseButton>
    </ButtonContainer>
  );
}
