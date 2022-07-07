import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { PrimaryButton, TextInput, Alert } from '../../components';
import { Container, Form, Header, SubTitle, Title } from './styles';
import { Props } from '../../types/navigation';
import { useAuthContext } from '../../contexts/auth';
import { AuthError } from '../../types/firebase';
import { Home } from '../../navigation/Home';

export function SignInScreen({ navigation }: Props<'SignIn'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, isAuthenticated } = useAuthContext();

  if (isAuthenticated) return <Home />;
  return (
    <Container>
      <Alert
        title="Não foi possível se autenticar"
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
        <Title>Login</Title>
      </Header>

      <Form>
        <TextInput
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
          title="Entrar"
          active={!!email && !!password}
          style={{ marginTop: 30 }}
          isLoading={isLoading}
          onPress={async () => {
            try {
              setIsLoading(true);
              await signIn({ email, password });
            } catch (error) {
              const { code } = error as AuthError;

              switch (code) {
                case 'auth/invalid-email':
                  setErrorMessage('E-mail inválido.');
                  break;
                case 'auth/user-not-found':
                  setErrorMessage('Usuário não encontrado.');
                  break;
                case 'auth/wrong-password':
                  setErrorMessage('Senha incorreta.');
                  break;
                case 'auth/internal-error':
                  setErrorMessage(
                    'Serviço indisponível, por favor tente mais tarde.'
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

        <TouchableOpacity activeOpacity={0.8}>
          <SubTitle>Esqueceu sua senha?</SubTitle>
        </TouchableOpacity>
      </Form>
    </Container>
  );
}
