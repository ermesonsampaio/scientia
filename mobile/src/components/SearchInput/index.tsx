import React, { createRef } from 'react';
import { Container, Input } from './styles';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native';

export default function SearchInput() {
  const inputRef = createRef<TextInput>();

  return (
    <Container activeOpacity={0.8} onPress={() => inputRef?.current?.focus()}>
      <Ionicons name="ios-search-outline" color="#fff" size={20} />
      <Input ref={inputRef} placeholder="Pesquise algo" />
    </Container>
  );
}
