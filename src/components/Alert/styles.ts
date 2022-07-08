import styled from 'styled-components/native';
import { THEME } from '../../theme';

export const WrapperContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.View`
  padding: 32px 0 0 0;
  width: 70%;
  background-color: ${THEME.colors.card};
  border-radius: 16px;
  align-items: center;
`;

export const Title = styled.Text`
  padding: 0 32px;
  font-size: 20px;
  color: ${THEME.colors.text};
  font-family: ${THEME.fonts.bold};
`;

export const Message = styled.Text`
  padding: 0 32px;
  font-size: 16px;
  color: #ddd;
  font-family: ${THEME.fonts.regular};
  margin: 16px 0 32px 0;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  border-top-width: 1px;
  border-top-color: ${THEME.colors.placeholder};
  width: 100%;
  align-items: center;
  padding: 16px 0;
`;

export const ButtonText = styled.Text(
  ({ suggestedAction }: { suggestedAction: boolean }) => `
  font-size: 16px;
  color: ${suggestedAction ? THEME.colors.primary : '#ddd'};
  font-family: ${suggestedAction ? THEME.fonts.medium : THEME.fonts.regular};
`
);
