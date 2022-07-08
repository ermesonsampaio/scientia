import styled from 'styled-components/native';
import { THEME } from '../../theme';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0 20px;
`;

export const Title = styled.Text`
  color: ${THEME.colors.text};
  font-family: ${THEME.fonts.medium};
  font-size: 30px;
  margin: 20px 0 30px 0;
`;

export const Row = styled.View`
  flex-direction: row;
  margin: 10px 0;
  justify-content: space-between;
`;

export const Column = styled.View`
  flex-direction: row;
  align-items: center;
  border: 2px solid ${THEME.colors.card};
  border-radius: 10px;
  padding: 20px 30px;
  width: 100%;
  height: 150px;
`;

export const SemiColumn = styled(Column)`
  width: 49%;
`;

export const TextContainer = styled.View``;

export const ValueText = styled.Text`
  color: ${THEME.colors.primary};
  font-family: ${THEME.fonts.medium};
  font-size: 35px;
`;

export const LabelText = styled.Text`
  color: #fff;
  font-family: ${THEME.fonts.light};
  font-size: 12px;
`;

export const Quizzes = styled.FlatList``;

export const Quiz = styled.TouchableOpacity`
  background-color: ${THEME.colors.card};
  border-radius: 10px;
  padding: 20px 30px;
  margin: 10px 0;
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
