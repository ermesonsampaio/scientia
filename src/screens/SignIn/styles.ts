import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '../../theme';

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 24px;
  justify-content: center;
`;

export const Header = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 24px;
  font-family: ${THEME.fonts.medium};
  margin-left: 16px;
`;

export const Form = styled.View`
  margin-top: 80px;
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  font-family: ${THEME.fonts.light};
  color: #ddd;
  text-align: center;
  margin-top: 24px;
`;
