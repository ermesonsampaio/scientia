import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import VideoIcon from '../../assets/video.svg';
import { PrimaryButton, SearchInput } from '../../components';
import api from '../../services/api';
import { Category, Quiz as QuizType } from '../../types/models';
import { Props } from '../../types/navigation';
import {
  AboutButtonContainer,
  AboutContainer,
  AboutReference,
  AboutReferences,
  AboutReferenceTitle,
  AboutSection,
  AboutSectionSecondaryText,
  AboutSectionText,
  AboutSectionTitle,
  AboutTitle,
  AboutWrapper,
  CategoriesList,
  CategoryItem,
  CategoryItemText,
  Header,
  Quiz,
  QuizInfo,
  QuizInfoText,
  QuizTitle,
  Quizzes,
  QuizzesHeader,
  QuizzesSection,
  SubTitle,
  Title,
} from './styles';
import { useAuthContext } from '../../contexts/auth';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
export function HomeScreen({ navigation }: Props<'Home'>) {
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<QuizType | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '90%'], []);

  const animatedIndex = useSharedValue(0);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [1, 0],
      Extrapolate.CLAMP
    ),
  }));

  const { user } = useAuthContext();

  useEffect(() => {
    (async () => {
      const { data: quizzes } = await api.get<QuizType[]>('/quizzes');
      setQuizzes(quizzes);

      const { data: categories } = await api.get<Category[]>('/categories');
      setCategories(categories);
      setActiveCategory(categories[0]);
    })();
  }, []);

  useEffect(() => {
    if (activeQuiz) bottomSheetRef.current?.snapToIndex(0);
    else bottomSheetRef.current?.close();
  }, [activeQuiz]);

  useEffect(() => {
    setQuizzes(
      quizzes.filter((quiz) => quiz.category.id === activeCategory?.id)
    );
  }, [activeCategory]);

  function changeActiveQuiz(quiz: QuizType) {
    if (quiz.id !== activeQuiz?.id) setActiveQuiz(quiz);
    else setActiveQuiz(null);
  }

  function handleInitQuiz() {
    navigation.navigate('Quiz', activeQuiz!);
  }

  const containerStyle = useMemo(
    () => [
      {
        flex: 1,
        paddingTop: 50,
      },
      containerAnimatedStyle,
    ],
    [containerAnimatedStyle]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View style={containerStyle}>
        <Header>
          <Title>Olá {user?.username}</Title>
          <SubTitle>Vamos testar seus conhecimentos?</SubTitle>
          <SearchInput />
        </Header>

        <QuizzesSection>
          <QuizzesHeader>
            <CategoriesList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                const category: Category = item as Category;

                return (
                  <CategoryItem
                    onPress={() => setActiveCategory(category)}
                    key={index}
                  >
                    <CategoryItemText
                      active={activeCategory?.id === category.id}
                    >
                      {category.label}
                    </CategoryItemText>
                  </CategoryItem>
                );
              }}
            />
          </QuizzesHeader>

          <Quizzes
            showsVerticalScrollIndicator={false}
            data={quizzes}
            keyExtractor={(item) => (item as QuizType).id.toString()}
            renderItem={({ item }) => {
              const quiz = item as QuizType;

              return (
                <Quiz
                  activeOpacity={0.8}
                  onPress={() => changeActiveQuiz(quiz)}
                >
                  <QuizTitle>{quiz?.title}</QuizTitle>

                  <QuizInfo>
                    <Ionicons
                      name="ios-clipboard-outline"
                      size={14}
                      color="#fff"
                    />
                    <QuizInfoText>
                      {quiz?.questions.length} Questões
                    </QuizInfoText>
                  </QuizInfo>
                </Quiz>
              );
            }}
          />
        </QuizzesSection>
      </Animated.View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose
        animatedIndex={animatedIndex}
      >
        <AboutWrapper>
          <AboutContainer>
            <AboutTitle>{activeQuiz?.title}</AboutTitle>

            {activeQuiz?.description && (
              <AboutSection>
                <AboutSectionTitle>Descrição</AboutSectionTitle>

                <AboutSectionText>{activeQuiz?.description}</AboutSectionText>
              </AboutSection>
            )}

            {activeQuiz?.references && (
              <AboutSection>
                <AboutSectionTitle>Materiais de apoio</AboutSectionTitle>

                <AboutSectionSecondaryText>
                  Cuidado, estes materiais estes materiais não estão sob nosso
                  controle
                </AboutSectionSecondaryText>

                <AboutReferences>
                  <AboutReference>
                    <VideoIcon width={25} />

                    <AboutReferenceTitle>Aula de Alguém</AboutReferenceTitle>
                  </AboutReference>
                </AboutReferences>
              </AboutSection>
            )}
          </AboutContainer>

          <AboutButtonContainer>
            <PrimaryButton
              title="Avançar"
              active
              onPress={() => handleInitQuiz()}
            />
          </AboutButtonContainer>
        </AboutWrapper>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
