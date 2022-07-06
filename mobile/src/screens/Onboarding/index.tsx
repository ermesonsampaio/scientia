import React from 'react';
import { PrimaryButton } from '../../components';
import { Props } from '../../types/navigation';
import { ActionsContainer, Container, Title } from './styles';

export function OnboardingScreen({ navigation }: Props<'Onboarding'>) {
  return (
    <Container>
      <Title>
        Você está a um passo de colocar seus conhecimentos em prática.
      </Title>

      <ActionsContainer>
        <PrimaryButton
          title="Entrar"
          active
          onPress={() => navigation.push('SignIn')}
        />

        <PrimaryButton
          style={{
            marginTop: 20,
          }}
          title="Criar conta"
          pressable
          onPress={() => navigation.push('SignUp')}
        />
      </ActionsContainer>
    </Container>
  );
}
