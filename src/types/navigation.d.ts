import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Quiz } from './models';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: NavigatorScreenParams<TabParamList>;
  Quiz: Quiz;
  SignIn: undefined;
  SignUp: undefined;
};

type TabParamList = {
  Quizzes: undefined;
  User: undefined;
  Ranking: undefined;
};

type Props<T extends keyof RootStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, T>,
  BottomTabScreenProps<TabParamList>
>;

type TabProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  NativeStackScreenProps<RootStackParamList>
>;
