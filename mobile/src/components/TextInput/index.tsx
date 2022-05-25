import React from 'react';
import { TextInputProps } from 'react-native';
import { Input } from './styles';

export function TextInput({ placeholderTextColor, ...props }: TextInputProps) {
  return <Input {...props} />;
}
