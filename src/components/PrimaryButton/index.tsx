import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { Button, ButtonText } from './styles';

export interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  active?: boolean;
  pressable?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
}

export default function PrimaryButton({
  title,
  active,
  onPress,
  pressable,
  isLoading,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      activeOpacity={active || pressable ? 0.8 : 1}
      active={!!active}
      onPress={() => {
        if ((pressable || active) && onPress) onPress();
      }}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size={25} color="#ddd" />
      ) : (
        <ButtonText active={!!active}>{title}</ButtonText>
      )}
    </Button>
  );
}
