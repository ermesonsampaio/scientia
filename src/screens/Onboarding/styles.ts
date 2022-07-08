import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '../../theme';

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 24px;
  justify-content: center;
`;

export const Title = styled.Text`
  margin-top: 20px;
  color: #fff;
  font-family: ${THEME.fonts.medium};
  font-size: 24px;
  text-align: center;
`;

export const ActionsContainer = styled.View`
  margin-top: 80px;
  width: 100%;
`;
