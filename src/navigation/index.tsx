import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { THEME } from '../theme';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { QuizScreen } from '../screens/Quiz';
import { OnboardingScreen } from '../screens/Onboarding';
import { SignInScreen } from '../screens/SignIn';
import { SignUpScreen } from '../screens/SignUp';
import {
  useFonts,
  Jost_100Thin,
  Jost_300Light,
  Jost_400Regular,
  Jost_500Medium,
  Jost_600SemiBold,
  Jost_700Bold,
} from '@expo-google-fonts/jost';
import { useAuthContext } from '../contexts/auth';
import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { Home } from './Home';
import * as SplashScreen from 'expo-splash-screen';

const navigationRef = createNavigationContainerRef();

export const navigation = {
  push<RouteName extends keyof RootStackParamList>(
    screen: RouteName,
    params: RootStackParamList[RouteName]
  ) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(screen, params));
    }
  },
  replace<RouteName extends keyof RootStackParamList>(
    screen: RouteName,
    params: RootStackParamList[RouteName]
  ) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(screen, params));
    }
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigator() {
  const [fontsLoaded] = useFonts({
    Jost_100Thin,
    Jost_300Light,
    Jost_400Regular,
    Jost_500Medium,
    Jost_600SemiBold,
    Jost_700Bold,
  });

  const { isInitializing } = useAuthContext();

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.hideAsync();
    }

    if (fontsLoaded && !isInitializing) hideSplashScreen();
  }, [fontsLoaded, isInitializing]);

  if (!fontsLoaded || isInitializing) return null;
  return (
    <>
      <NavigationContainer
        theme={{
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            ...THEME.colors,
          },
        }}
        ref={navigationRef}
      >
        <Stack.Navigator
          screenOptions={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: THEME.colors.background,
            },
            headerTitleStyle: {
              fontFamily: THEME.fonts.medium,
            },
            animation: 'fade_from_bottom',
          }}
          initialRouteName={'Onboarding'}
        >
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="Quiz" component={QuizScreen} />

          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" backgroundColor={THEME.colors.background} />
    </>
  );
}
