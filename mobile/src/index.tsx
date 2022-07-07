import React from 'react';
import { AuthContextProvider } from './contexts/auth';
import { UserContextProvider } from './contexts/user';
import { Navigator } from './navigation';

export function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <Navigator />
      </UserContextProvider>
    </AuthContextProvider>
  );
}
