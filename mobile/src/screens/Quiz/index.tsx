import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useUserContext } from '../../contexts/user';
import { Option, Question } from '../../types/models';
import { Props } from '../../types/navigation';
import CorrectSound from '../../../assets/sounds/correct-sound.mp3';

import {
  Container,
  Header,
  Title,
  SubTitle,
  OptionsContainer,
  Options,
  OptionContainer,
  OptionText,
  ButtonWrapper,
} from './styles';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

function _QuizScreen({
  route: { params: quizData },
  navigation,
}: Props<'Quiz'>) {
  const [page, setPage] = useState(0);
  const [readyToVerify, setReadyToVerify] = useState(false);
  const [isLastPage, setIsLastQuestion] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<Question>(
    {} as Question
  );
  const [activeOption, setActiveOption] = useState<Option | null>(null);
  const [sound, setSound] = useState<Audio.Sound>();

  const {
    correctPoints,
    increaseCorrectPoints,
    increaseIncorrectPoints,
    increaseQuizzesCompleted,
  } = useUserContext();

  useEffect(() => {
    navigation.setOptions({ title: quizData.title });
    setActiveQuestion(quizData.questions[0]);
  }, []);

  useEffect(() => {
    if (page + 1 >= quizData.questions.length) {
      setIsLastQuestion(true);
    }

    setActiveQuestion(quizData.questions[page]);
    setActiveOption(null);
    setReadyToVerify(false);
  }, [page]);

  useEffect(() => {
    if (readyToVerify && activeOption?.isCorrect)
      (async () => await playSound())();
  }, [correctPoints]);

  function verifyResponse() {
    setReadyToVerify(true);

    if (activeOption?.isCorrect) increaseCorrectPoints();
    else increaseIncorrectPoints();
  }

  function nextQuestion() {
    if (isLastPage) {
      increaseQuizzesCompleted();
      navigation.replace('Home', { screen: 'Quizzes' });
    }

    setPage(page + 1);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(CorrectSound);

    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <Container>
      <Header>
        <Title>
          Questão {page + 1}/{quizData.questions.length}
        </Title>
        <SubTitle>{activeQuestion.content}</SubTitle>
      </Header>

      <OptionsContainer>
        <Options
          data={activeQuestion.options}
          scrollEnabled={false}
          renderItem={({ item }) => {
            const option = item as Option;

            return (
              <OptionContainer
                activeOpacity={0.8}
                onPress={() => {
                  if (readyToVerify) return;

                  if (activeOption?.id === option.id) setActiveOption(null);
                  else setActiveOption(option);
                }}
                active={activeOption?.id === option.id}
                readyToVerify={readyToVerify}
                isCorrect={option.isCorrect}
              >
                <OptionText
                  active={activeOption?.id === option.id}
                  readyToVerify={readyToVerify}
                  isCorrect={option.isCorrect}
                >
                  {option.content}
                </OptionText>
              </OptionContainer>
            );
          }}
        />
      </OptionsContainer>

      <ButtonWrapper>
        <PrimaryButton
          title={
            !readyToVerify
              ? 'Verificar Resposta'
              : !isLastPage
              ? 'Próxima'
              : 'Finalizar'
          }
          active={!!activeOption?.id}
          onPress={!readyToVerify ? verifyResponse : nextQuestion}
        />
      </ButtonWrapper>
    </Container>
  );
}

export const QuizScreen = gestureHandlerRootHOC(_QuizScreen);
