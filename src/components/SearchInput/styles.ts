import styled from 'styled-components/native';
import { THEME } from '../../theme';

export const Container = styled.TouchableOpacity`
  height: 50px;
  padding: 0 30px;
  background-color: ${THEME.colors.card};
  align-items: center;
  flex-direction: row;
  border-radius: 5px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: THEME.colors.placeholder,
  selectionColor: THEME.colors.primary,
})`
  margin-left: 20px;
  font-size: 16px;
  font-family: ${THEME.fonts.light};
  color: ${THEME.colors.text};
`;
