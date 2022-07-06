import React from 'react';
import { Modal } from 'react-native';
import {
  WrapperContainer,
  Container,
  Title,
  Message,
  Button,
  ButtonText,
} from './styles';

export interface Action {
  suggestedAction?: boolean;
  label: string;
  onPress: () => void;
}

export interface AlertProps {
  title: string;
  message: string;
  visible?: boolean;
  onRequestClose?: () => void;
  actions: Action[];
}

export function Alert({
  message,
  visible = false,
  title,
  actions,
  ...props
}: AlertProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      hardwareAccelerated
      {...props}
    >
      <WrapperContainer>
        <Container>
          <Title>{title}</Title>

          <Message>{message}</Message>

          {actions.map(({ suggestedAction, label, onPress }) => (
            <Button key={label} onPress={onPress}>
              <ButtonText suggestedAction={!!suggestedAction}>
                {label}
              </ButtonText>
            </Button>
          ))}
        </Container>
      </WrapperContainer>
    </Modal>
  );
}
