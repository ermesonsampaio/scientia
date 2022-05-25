import React from 'react';
import { StatusBar } from 'expo-status-bar';
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
import { HomeScreen } from './screens/Home';
import { THEME } from './theme';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QuizScreen } from './screens/Quiz';
import { RootStackParamList, TabParamList } from './types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { UserScreen } from './screens/User';
import { UserContextProvider } from './contexts/user';
import { OnboardingScreen } from './screens/Onboarding';
import { SignInScreen } from './screens/SignIn';
import { SignUpScreen } from './screens/SignUp';
import { AuthContextProvider, useAuthContext } from './contexts/auth';
import { navigationRef } from './navigation';

const Tabs = [
  {
    route: 'Quizzes',
    label: 'Questionários',
    activeIcon: 'ios-home-sharp',
    inactiveIcon: 'ios-home-outline',
    component: HomeScreen,
  },
  {
    route: 'User',
    label: 'Progresso',
    activeIcon: 'ios-analytics',
    inactiveIcon: 'ios-analytics-outline',
    component: UserScreen,
  },
];

type IconName = keyof typeof Ionicons.glyphMap;

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: THEME.colors.background,
          borderTopWidth: 1,
          height: 60,
          elevation: 0,
        },
        headerShadowVisible: false,
      }}
    >
      {Tabs.map((item, i) => (
        <Tab.Screen
          key={i}
          name={item.route as keyof TabParamList}
          component={item.component}
          options={{
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={
                  (focused ? item.activeIcon : item.inactiveIcon) as IconName
                }
                color={color}
                size={size}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

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

  return (
    <AuthContextProvider>
      <UserContextProvider>
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
            initialRouteName={'Home'}
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
      </UserContextProvider>
    </AuthContextProvider>
  );
}
