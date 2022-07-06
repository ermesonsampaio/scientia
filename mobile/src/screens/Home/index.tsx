import React, { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import VideoIcon from '../../assets/video.svg';
import { BottomSheet, BottomSheetRef } from '../../components/BottomSheet';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SearchInput } from '../../components/SearchInput';
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
  Container,
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

export function HomeScreen({ navigation }: Props<'Home'>) {
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<QuizType | null>(null);
  const bottomSheetRef = useRef<BottomSheetRef>(null);

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
    if (bottomSheetRef.current?.isActive()) bottomSheetRef.current?.scrollTo(0);
    if (activeQuiz)
      setTimeout(() => bottomSheetRef.current?.scrollTo(-300), 500);
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Container>
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
      </Container>

      <BottomSheet ref={bottomSheetRef} onClose={() => setActiveQuiz(null)}>
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
