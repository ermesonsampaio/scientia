import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { THEME } from '../../theme';

export const Container = styled(SafeAreaView)`
  align-items: center;
`;

export const Title = styled.Text`
  color: ${THEME.colors.text};
  font-family: ${THEME.fonts.medium};
  font-size: 30px;
  margin: 20px 0 30px 0;
`;

export const Row = styled(Animated.View)(
  ({ me }: { me: boolean }) => `
    flex-direction: row;
    align-items: center;
    padding: 24px 10%;
    width: 100%;
    justify-content: space-between;
    background-color: ${me && THEME.colors.primary};
    border: 0px solid ${THEME.colors.placeholder};
    border-bottom-width: 1px;
  `
);

export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Position = styled.Text(
  ({ me }: { me: boolean }) => `
    color: ${me ? THEME.colors.text : THEME.colors.primary};
    font-family: ${THEME.fonts.bold};
    font-size: 24px;
  `
);

export const UserInfo = styled.Text`
  color: ${THEME.colors.text};
  font-family: ${THEME.fonts.regular};
  font-size: 18px;
  margin-left: 32px;
`;

export const Score = styled(Animated.Text)`
  color: ${THEME.colors.text};
  font-family: ${THEME.fonts.regular};
  font-size: 18px;
`;
