import React from 'react';
import { TextInputProps as RNTextInputProps } from 'react-native';
import { Input } from './styles';

export type TextInputProps = RNTextInputProps;

export default function TextInput({
  placeholderTextColor,
  ...props
}: TextInputProps) {
  return <Input {...props} />;
}
