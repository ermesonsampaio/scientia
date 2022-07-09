import React, { useContext, useEffect } from 'react';
import { createContext, useState } from 'react';
import { AuthenticationService } from '../services/auth';
import { firebaseApp } from '../services/firebase';
import { FirestoreService } from '../services/firestore';

export interface User {
  id: string;
  username: string;
  answeredQuestionnaires: string[];
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
  const firestoreService = new FirestoreService(firebaseApp);

  async function signIn(data: SignInData) {
    const { user } = await authenticationService.signIn(data);

    setUser({
      id: user.uid,
      username: user.displayName as string,
      answeredQuestionnaires: [],
    });
  }

  async function createUserAndSignIn(data: CreateUserAndSignInData) {
    const { user } = await authenticationService.signUpAndSignIn(data);

    setUser({
      id: user.uid,
      username: user.displayName as string,
      answeredQuestionnaires: [],
    });
  }

  useEffect(() => {
    const subscriber = authenticationService
      .getAuth()
      .onAuthStateChanged(async (user) => {
        if (user) {
          let storedUser = await firestoreService.getDocumentData<User>(
            `users/${user.uid}`
          );

          if (!storedUser) {
            await firestoreService.setDocumentInCollection('users', user.uid, {
              answeredQuestionnaires: [],
            });

            storedUser = await firestoreService.getDocumentData<User>(
              `users/${user.uid}`
            );

            setUser({
              ...storedUser!,
              id: user.uid,
              username: user.displayName as string,
            });
          } else {
            setUser({
              ...storedUser,
              id: user.uid,
              username: user.displayName as string,
            });
          }
        }

        setIsInitializing(false);
      });

    return subscriber;
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

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
