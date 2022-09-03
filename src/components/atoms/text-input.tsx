import React from 'react';
import { KeyboardType, TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { Box } from '@/components/atoms/box';
import { Text } from '@/components/atoms/text';

const TextInputContainer = styled.TextInput<{ editable: boolean }>`
  width: 100%;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors['text.300']};
  background-color: ${({ theme, editable }) =>
    editable ? theme.colors['shape.100'] : theme.colors['shape.500']};
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: ${({ theme }) => theme.sizes.md}px;
  color: ${({ theme }) => theme.colors['text.500']};
`;

export function TextInput(props: {
  label: string;
  onChange: (text: string) => void;
  value: string;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  keyboardType?: KeyboardType;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  numberOfLines?: number;
  disabled?: boolean;
}) {
  return (
    <Box direction="column">
      <Text
        size="md"
        color="text.500">
        {props.label}
      </Text>
      <TextInputContainer
        onChangeText={props.onChange}
        value={props.value}
        placeholder={props.placeholder ?? props.label}
        multiline={props.multiline}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        autoCapitalize={props.autoCapitalize}
        numberOfLines={props.numberOfLines}
        editable={!props.disabled}
        textAlignVertical={props.numberOfLines && props.numberOfLines > 1 ? 'top' : 'auto'}
      />
      {props.error && (
        <Text
          size="sm"
          color="error.500">
          {props.error}
        </Text>
      )}
    </Box>
  );
}
