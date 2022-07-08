import styled from 'styled-components/native';
import { THEME } from '../../theme';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

export const Header = styled.View`
  margin-top: 20px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: ${THEME.fonts.light};
`;

export const SubTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: ${THEME.fonts.regular};
`;

export const OptionsContainer = styled.View`
  flex: 1;
  margin-top: 40px;
  padding-bottom: 20px;
`;

export const Options = styled.FlatList``;

type OptionProps = {
  active: boolean;
  readyToVerify: boolean;
  isCorrect: boolean;
};

export const OptionContainer = styled.TouchableOpacity(
  ({ active, readyToVerify, isCorrect }: OptionProps) => `
    margin: 10px 0;
    background-color: ${
      !readyToVerify || !active
        ? THEME.colors.card
        : isCorrect
        ? THEME.colors.correct
        : THEME.colors.incorrect
    };
    justify-content: center;
    padding: 20px 30px;
    border-radius: 10px;
    border: ${
      active && !readyToVerify ? `1px solid ${THEME.colors.primary}` : 'none'
    };
  `
);

export const OptionText = styled.Text(
  ({ active, readyToVerify, isCorrect }: OptionProps) => `
    color: ${
      !active
        ? THEME.colors.secondaryText
        : readyToVerify
        ? isCorrect
          ? THEME.colors.darkText
          : THEME.colors.text
        : THEME.colors.primary
    };
    font-family: ${THEME.fonts.light};
    font-size: 16px;
  `
);

export const ButtonWrapper = styled.View`
  width: 100%;
  padding-bottom: 10px;
`;

export const AuthorCredit = styled.View`
  flex-direction: row;
`;

export const CreditText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-family: ${THEME.fonts.light};
  margin-top: 5px;
`;

export const AuthorName = styled(CreditText)`
  color: ${THEME.colors.primary};
  font-size: 12px;
  font-family: ${THEME.fonts.regular};
  margin-left: 5px;
`;
