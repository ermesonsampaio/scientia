import styled from 'styled-components/native';
import { THEME } from '../../theme';

export const Button = styled.TouchableOpacity(
  ({ active }: { active: boolean }) => `
    height: 60px;
    background-color: ${active ? THEME.colors.primary : THEME.colors.card};
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  `
);

export const ButtonText = styled.Text(
  ({ active }: { active: boolean }) => `
    color: ${active ? THEME.colors.contrastText : THEME.colors.secondaryText};
    font-family: ${THEME.fonts.light};
    font-size: 18px;
  `
);
