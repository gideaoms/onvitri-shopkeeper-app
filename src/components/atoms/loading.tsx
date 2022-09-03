import React from 'react';
import styled from 'styled-components/native';
import { theme } from '@/theme';

const Container = styled.ActivityIndicator``;

export function Loading(props: { color: keyof typeof theme.colors; size?: 'sm' | 'lg' }) {
  return (
    <Container
      color={theme.colors[props.color]}
      size={props.size === 'sm' ? 'small' : 'large'}
    />
  );
}
