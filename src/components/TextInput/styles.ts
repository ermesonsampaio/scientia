import styled from 'styled-components/native';
import { THEME } from '../../theme';

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#A4A4A4',
})`
  background-color: #3a3a3a;
  height: 60px;
  padding: 0 32px;
  border-radius: 10px;
  font-family: ${THEME.fonts.light};
  font-size: 16px;
  color: #a4a4a4;
`;
