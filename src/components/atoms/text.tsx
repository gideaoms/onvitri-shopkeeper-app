import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components/native';
import { theme } from '@/theme';

type Alignment = 'left' | 'center' | 'right';

type Family = 'heading' | 'body';

const TextContainer = styled.Text<{
  _size: keyof typeof theme.sizes | number;
  _color: keyof typeof theme.colors;
  _textAlign?: Alignment;
  _uppercase?: boolean;
  _bold?: boolean;
  _decoration?: boolean;
  _family?: Family;
}>`
  font-family: ${({ theme, _family }) => theme.fonts[_family ?? 'body']};
  font-size: ${({ theme, _size }) => (typeof _size === 'number' ? _size : theme.sizes[_size])}px;
  color: ${({ theme, _color }) => theme.colors[_color]};

  ${({ _textAlign }) =>
    _textAlign &&
    css`
      text-align: ${_textAlign};
    `};

  ${({ _uppercase }) =>
    _uppercase &&
    css`
      text-transform: uppercase;
    `};

  ${({ _bold }) =>
    _bold &&
    css`
      font-weight: bold;
    `}

  ${({ _decoration }) =>
    _decoration &&
    css`
      text-decoration: underline;
    `}
`;

export function Text(props: {
  children: ReactNode;
  size: keyof typeof theme.sizes | number;
  color: keyof typeof theme.colors;
  textAlign?: Alignment;
  uppercase?: boolean;
  bold?: boolean;
  decoration?: boolean;
  family?: Family;
}) {
  return (
    <TextContainer
      _size={props.size}
      _color={props.color}
      _textAlign={props.textAlign}
      _uppercase={props.uppercase}
      _bold={props.bold}
      _decoration={props.decoration}
      _family={props.family}>
      {props.children}
    </TextContainer>
  );
}
