import React from 'react';
import { Circle } from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthContext } from '../../contexts/auth';
import { useUserContext } from '../../contexts/user';
import { THEME } from '../../theme';
import {
  Container,
  Row,
  SemiColumn,
  ValueText,
  LabelText,
  Column,
  Title,
  TextContainer,
} from './styles';

export function UserScreen() {
  const {
    user: { score },
  } = useAuthContext();
  const { incorrectPoints, quizzesCompleted } = useUserContext();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Title>Progresso</Title>

        <Row>
          <SemiColumn>
            <TextContainer>
              <ValueText>{score}</ValueText>
              <LabelText>TOTAL DE PONTOS</LabelText>
            </TextContainer>
          </SemiColumn>

          <SemiColumn>
            <TextContainer>
              <ValueText>{score + incorrectPoints}</ValueText>
              <LabelText>TOTAIS DE QUESTÕES RESPONDIDAS</LabelText>
            </TextContainer>
          </SemiColumn>
        </Row>

        <Row>
          <Column>
            <Circle
              size={80}
              progress={score / (incorrectPoints + score || 1)}
              style={{ paddingRight: 30 }}
              unfilledColor={THEME.colors.card}
              borderWidth={0}
              color={THEME.colors.primary}
              thickness={8}
              direction="counter-clockwise"
              strokeCap="round"
              animated={true}
            />

            <TextContainer>
              <ValueText>
                {((score / (incorrectPoints + score || 1)) * 100).toFixed(1)}%
              </ValueText>
              <LabelText>PERCENTUAL DE ACERTO</LabelText>
            </TextContainer>
          </Column>
        </Row>

        <Row>
          <SemiColumn>
            <TextContainer>
              <ValueText>{quizzesCompleted}</ValueText>
              <LabelText>QUESTIONÁRIOS CONCLUÍDOS</LabelText>
            </TextContainer>
          </SemiColumn>

          <SemiColumn>
            <TextContainer>
              <ValueText>
                {(score / (incorrectPoints || 1)).toFixed(2)}
              </ValueText>
              <LabelText>TAXA DE ACERTO/ERRO</LabelText>
            </TextContainer>
          </SemiColumn>
        </Row>
      </Container>
    </SafeAreaView>
  );
}
