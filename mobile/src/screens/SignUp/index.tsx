import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { PrimaryButton, TextInput, Alert } from '../../components';
import { Container, Form, Header, SubTitle, Title } from './styles';
import { Props } from '../../types/navigation';
import { useAuthContext } from '../../contexts/auth';
import { AuthError } from '../../types/firebase';

export function SignUpScreen({ navigation }: Props<'SignUp'>) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { createUserAndSignIn } = useAuthContext();

  return (
    <Container>
      <Alert
        title="Não foi possível criar uma nova conta"
        message={errorMessage}
        visible={!!errorMessage}
        onRequestClose={() => setErrorMessage('')}
        actions={[
          {
            label: 'Tentar novamente',
            onPress: () => setErrorMessage(''),
            suggestedAction: true,
          },
        ]}
      />

      <Header onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back-outline" color="#fff" size={24} />
        <Title>Criar uma conta</Title>
      </Header>

      <Form>
        <TextInput
          placeholder="Nome de usuário"
          returnKeyType="next"
          autoCorrect={false}
          onChangeText={(username) => setUsername(username)}
        />

        <TextInput
          style={{ marginTop: 20 }}
          placeholder="E-mail"
          keyboardType="email-address"
          returnKeyType="next"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(email) => setEmail(email)}
        />

        <TextInput
          placeholder="Senha"
          style={{ marginTop: 20 }}
          secureTextEntry
          returnKeyType="go"
          autoCorrect={false}
          onChangeText={(password) => setPassword(password)}
        />

        <PrimaryButton
          title="Criar conta"
          active={!!username && !!email && !!password}
          style={{ marginTop: 30 }}
          isLoading={isLoading}
          onPress={async () => {
            try {
              setIsLoading(true);
              await createUserAndSignIn({ username, email, password });
            } catch (error) {
              const { code } = error as AuthError;

              switch (code) {
                case 'auth/email-already-in-use':
                  setErrorMessage(
                    'Este e-mail já está sendo usado por outro usuário.'
                  );
                  break;
                default:
                  setErrorMessage(
                    'Serviço indisponível, por favor tente mais tarde.'
                  );
                  break;
              }
            } finally {
              setIsLoading(false);
            }
          }}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.replace('SignIn')}
        >
          <SubTitle>Já tenho uma conta</SubTitle>
        </TouchableOpacity>
      </Form>
    </Container>
  );
}
