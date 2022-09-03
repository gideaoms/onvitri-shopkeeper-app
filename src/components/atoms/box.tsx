import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components/native';
import { theme } from '@/theme';

type JustifyContent = 'flex-start' | 'center' | 'space-between' | 'flex-end';

type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch';

type Direction = 'column' | 'row';

const Container = styled.View<{
  _padding?: keyof typeof theme.spaces;
  _flex?: number;
  _justifyContent?: JustifyContent;
  _alignItems?: AlignItems;
  _height?: keyof typeof theme.spaces | number;
  _background?: keyof typeof theme.colors;
  _direction?: Direction;
  _width?: keyof typeof theme.spaces | number;
  _border?: number;
  _radius?: number;
  _borderColor?: keyof typeof theme.colors;
}>`
  overflow: hidden;

  ${({ theme, _padding }) =>
    _padding &&
    css`
      padding: ${theme.spaces[_padding]}px;
    `}

  ${({ _flex }) =>
    _flex &&
    css`
      flex: ${_flex};
    `}

  ${({ _justifyContent }) =>
    _justifyContent &&
    css`
      justify-content: ${_justifyContent};
    `}

  ${({ _alignItems }) =>
    _alignItems &&
    css`
      align-items: ${_alignItems};
    `}

  ${({ theme, _height }) =>
    _height &&
    css`
      height: ${typeof _height === 'number' ? _height : theme.spaces[_height]}px;
    `}

  ${({ theme, _background }) =>
    _background &&
    css`
      background: ${theme.colors[_background]};
    `}

  ${({ _direction }) =>
    _direction &&
    css`
      flex-direction: ${_direction};
    `};

  ${({ theme, _width }) =>
    _width &&
    css`
      width: ${typeof _width === 'number' ? _width : theme.spaces[_width]}px;
    `}

  ${({ _border }) =>
    _border &&
    css`
      border-width: ${_border}px;
    `}

  ${({ _radius }) =>
    _radius &&
    css`
      border-radius: ${_radius}px;
    `}

  ${({ theme, _borderColor }) =>
    _borderColor &&
    css`
      border-color: ${theme.colors[_borderColor]};
    `}
`;

export function Box(props: {
  children?: ReactNode;
  padding?: keyof typeof theme.spaces;
  flex?: number;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  height?: keyof typeof theme.spaces | number;
  background?: keyof typeof theme.colors;
  direction?: Direction;
  width?: keyof typeof theme.spaces | number;
  border?: number;
  radius?: number;
  borderColor?: keyof typeof theme.colors;
}) {
  return (
    <Container
      _padding={props.padding}
      _flex={props.flex}
      _justifyContent={props.justifyContent}
      _alignItems={props.alignItems}
      _height={props.height}
      _background={props.background}
      _direction={props.direction}
      _width={props.width}
      _border={props.border}
      _radius={props.radius}
      _borderColor={props.borderColor}>
      {props.children}
    </Container>
  );
}
