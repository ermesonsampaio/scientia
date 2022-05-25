import React, { useContext, useEffect } from 'react';
import { createContext, useState } from 'react';
import { navigation } from '../navigation';
import { AuthenticationService } from '../services/auth';
import { firebaseApp } from '../services/firebase';

interface User {
  username: string;
  email: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface CreateUserAndSignInData {
  username: string;
  email: string;
  password: string;
}

interface AuthContextData {
  user?: User;
  signIn: (data: SignInData) => Promise<void>;
  createUserAndSignIn: (data: CreateUserAndSignInData) => Promise<void>;
  isAuthenticated: boolean;
  isInitializing: boolean;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const authenticationService = new AuthenticationService(firebaseApp);

  async function signIn(data: SignInData) {
    const { user } = await authenticationService.signIn(data);

    setUser({
      username: user.displayName as string,
      email: user.email as string,
    });
  }

  async function createUserAndSignIn(data: CreateUserAndSignInData) {
    const { user } = await authenticationService.signUpAndSignIn(data);

    setUser({
      username: user.displayName as string,
      email: user.email as string,
    });
  }

  useEffect(() => {
    const unsubscribe = authenticationService
      .getAuth()
      .onAuthStateChanged((user) => {
        if (user) {
          setUser({
            username: user.displayName as string,
            email: user.email as string,
          });

          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }

        if (isInitializing) setIsInitializing(false);
      });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isInitializing) {
      if (isAuthenticated) navigation.replace('Home', { screen: 'Quizzes' });
      else navigation.replace('Onboarding', undefined);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        createUserAndSignIn,
        isAuthenticated,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
