import styled from 'styled-components/native';
import { THEME } from '../../theme';

export const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: ${THEME.colors.card};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  top: 75%;
`;

export const Line = styled.View`
  width: 75px;
  height: 4px;
  background-color: ${THEME.colors.placeholder};
  border-radius: 2px;
  align-self: center;
  margin: 15px 0;
`;
