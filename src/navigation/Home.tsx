import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/Home';
import { UserScreen } from '../screens/User';
import { THEME } from '../theme';
import { RankingScreen } from '../screens/Ranking';

type IconName = keyof typeof Ionicons.glyphMap;

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
  {
    route: 'Ranking',
    label: 'Ranking',
    activeIcon: 'ios-trophy',
    inactiveIcon: 'ios-trophy-outline',
    component: RankingScreen,
  },
];

const Tab = createBottomTabNavigator<TabParamList>();

export function Home() {
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
