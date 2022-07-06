import React from 'react';
import {
  useFonts,
  Jost_100Thin,
  Jost_300Light,
  Jost_400Regular,
  Jost_500Medium,
  Jost_600SemiBold,
  Jost_700Bold,
} from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import { useAuthContext } from './contexts/auth';
import { Navigator } from './navigation';

export function App() {
  const [fontsLoaded] = useFonts({
    Jost_100Thin,
    Jost_300Light,
    Jost_400Regular,
    Jost_500Medium,
    Jost_600SemiBold,
    Jost_700Bold,
  });

  const { isInitializing } = useAuthContext();

  if (!fontsLoaded || isInitializing) return <AppLoading />;

  return <Navigator />;
}
