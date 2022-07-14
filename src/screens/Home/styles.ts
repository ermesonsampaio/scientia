import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import styled from 'styled-components/native';
import { THEME } from '../../theme';

export const Header = styled.View`
  padding: 0 20px;
`;

export const Title = styled.Text`
  color: #fff;
  font-family: ${THEME.fonts.light};
  font-size: 16px;
`;

export const SubTitle = styled.Text`
  color: #fff;
  font-family: ${THEME.fonts.medium};
  font-size: 20px;
  padding-bottom: 20px;
`;

export const QuizzesSection = styled.View`
  flex: 1;
  margin: 30px 0 0;
`;

export const QuizzesHeader = styled.View`
  padding: 0 0 10px;
  border-bottom-color: ${THEME.colors.border};
  border-bottom-width: 1px;
`;

export const CategoriesList = styled.FlatList``;
export const CategoryItem = styled.TouchableOpacity`
  margin-left: 10px;
`;

export const Quizzes = styled.FlatList.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
})``;

export const Quiz = styled.TouchableOpacity`
  flex-grow: 1;
  margin: 10px 0;
  background-color: ${THEME.colors.card};
  justify-content: center;
  border-radius: 5px;
  padding: 20px 30px;
`;

export const QuizTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: ${THEME.fonts.light};
  padding-bottom: 4px;
`;

export const QuizInfo = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 4px 0;
`;

export const QuizInfoText = styled.Text`
  color: ${THEME.colors.secondaryText};
  font-family: ${THEME.fonts.light};
  font-size: 12px;
  margin-left: 6px;
`;

export const AboutContainer = styled(BottomSheetScrollView).attrs({
  contentContainerStyle: {
    padding: 20,
  },
})`
  flex: 1;
  background-color: ${THEME.colors.background};
`;

export const AboutWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const AboutTitle = styled.Text`
  color: #fff;
  font-size: 22px;
  font-family: ${THEME.fonts.light};
`;

export const AboutSection = styled.View`
  margin: 20px 0;
`;

export const AboutSectionTitle = styled.Text`
  color: ${THEME.colors.primary};
  font-size: 20px;
  font-family: ${THEME.fonts.medium};
`;

export const AboutSectionText = styled.Text`
  color: ${THEME.colors.secondaryText};
  font-family: ${THEME.fonts.light};
  font-size: 16px;
  margin-top: 5px;
`;

export const AboutSectionSecondaryText = styled(AboutSectionText)`
  color: #aaa;
  font-size: 16px;
`;

export const AboutReferences = styled.View``;

export const AboutReference = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 10px 20px;
  margin: 15px 0;
  flex-direction: row;
  align-items: center;
`;

export const AboutReferenceTitle = styled.Text`
  color: ${THEME.colors.secondaryText};
  font-family: ${THEME.fonts.light};
  font-size: 18px;
  margin-left: 20px;
`;

export const CategoryItemText = styled.Text(
  ({ active }: { active: boolean }) => `
    color: ${!active ? '#fff' : THEME.colors.primary};
    font-family: ${THEME.fonts.light};
    font-size: 18px;
    padding: 0 20px;
    `
);
