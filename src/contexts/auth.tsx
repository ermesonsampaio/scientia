import React, { useContext, useEffect } from 'react';
import { createContext, useState } from 'react';
import { AuthenticationService } from '../services/auth';
import { firebaseApp } from '../services/firebase';
import { FirestoreService } from '../services/firestore';

export interface User {
  id: string;
  username: string;
  answeredQuestionnaires: string[];
  score: number;
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
  user: User;
  signIn: (data: SignInData) => Promise<void>;
  createUserAndSignIn: (data: CreateUserAndSignInData) => Promise<void>;
  isAuthenticated: boolean;
  isInitializing: boolean;
  increaseScore: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
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
      score: 0,
    });
  }

  async function createUserAndSignIn(data: CreateUserAndSignInData) {
    const { user } = await authenticationService.signUpAndSignIn(data);

    setUser({
      id: user.uid,
      username: user.displayName as string,
      answeredQuestionnaires: [],
      score: 0,
    });
  }

  async function increaseScore() {
    await firestoreService.updateDocumentInColletion('users', user.id, {
      score: user.score + 1,
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
              score: 0,
              username: user.displayName,
            });

            storedUser = await firestoreService.getDocumentData<User>(
              `users/${user.uid}`
            );

            setUser(storedUser!);
          } else {
            setUser(storedUser);
          }
        }

        setIsInitializing(false);
      });

    return subscriber;
  }, []);

  useEffect(() => {
    setIsAuthenticated(Object.keys(user)?.length > 0);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        createUserAndSignIn,
        isAuthenticated,
        isInitializing,
        increaseScore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
