import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

export const navigationRef = createNavigationContainerRef();

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
