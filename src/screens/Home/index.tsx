import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import VideoIcon from '../../assets/video.svg';
import { PrimaryButton, SearchInput, Skeleton, Alert } from '../../components';
import { Category, Quiz as QuizType } from '../../types/models';
import { Props } from '../../types/navigation';
import {
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
import { useAuthContext, User } from '../../contexts/auth';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Dimensions, View } from 'react-native';
import { firebaseApp } from '../../services/firebase';
import { FirestoreService } from '../../services/firestore';

export function HomeScreen({ navigation }: Props<'Home'>) {
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<QuizType | null>(null);

  const [showAlert, setShowAlert] = useState(false);

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
    transform: [
      {
        translateY: interpolate(
          animatedIndex.value,
          [0, 1],
          [0, 50],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  const { user } = useAuthContext();

  useEffect(() => {
    (async () => {
      const firestoreService = new FirestoreService(firebaseApp);

      const quizzes = await firestoreService.getCollectionData<QuizType>(
        'questionnaires',
        undefined,
        {
          field: 'approved',
          operation: '==',
          value: true,
        }
      );

      setQuizzes(quizzes);

      const categories = await firestoreService.getCollectionData<Category>(
        'categories'
      );

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
      quizzes.filter((quiz) => quiz?.category?.id === activeCategory?.id)
    );
  }, [activeCategory]);

  function changeActiveQuiz(quiz: QuizType) {
    if (quiz.id !== activeQuiz?.id) setActiveQuiz(quiz);
    else setActiveQuiz(null);
  }

  function handleInitQuiz() {
    const alreadyAnswered = (user as User).answeredQuestionnaires.filter(
      (id) => (activeQuiz?.id as string) === id
    );

    if (alreadyAnswered?.length) setShowAlert(true);
    else navigation.navigate('Quiz', activeQuiz!);
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

  const containerWidth = Dimensions.get('window').width - 40;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Alert
        visible={showAlert}
        title="Deseja continuar?"
        message="Voc?? j?? respondeu esse question??rio antes, ent??o voc?? n??o obter?? mais pontos respondendo esse question??rio."
        actions={[
          {
            label: 'Continuar',
            suggestedAction: true,
            onPress: () => {
              setShowAlert(false);
              navigation.navigate('Quiz', activeQuiz!);
            },
          },
          {
            label: 'Cancelar',
            suggestedAction: false,
            onPress: () => setShowAlert(false),
          },
        ]}
        onRequestClose={() => setShowAlert(false)}
      />

      <Animated.View style={containerStyle}>
        <Header>
          {user.username ? (
            <Title>Ol?? {user.username}</Title>
          ) : (
            <Skeleton
              width={containerWidth * 0.3}
              height={20}
              style={{ borderRadius: 5, marginBottom: 10 }}
            />
          )}
          <SubTitle>Vamos testar seus conhecimentos?</SubTitle>
          <SearchInput />
        </Header>

        <QuizzesSection>
          <QuizzesHeader>
            {categories.length > 0 ? (
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
            ) : (
              <View style={{ flexDirection: 'row' }}>
                <Skeleton
                  width={100}
                  height={40}
                  style={{ borderRadius: 5, marginLeft: 20, marginRight: 10 }}
                />

                <Skeleton
                  width={100}
                  height={40}
                  style={{ borderRadius: 5, marginHorizontal: 10 }}
                />

                <Skeleton
                  width={100}
                  height={40}
                  style={{ borderRadius: 5, marginHorizontal: 10 }}
                />

                <Skeleton
                  width={100}
                  height={40}
                  style={{ borderRadius: 5, marginHorizontal: 10 }}
                />
              </View>
            )}
          </QuizzesHeader>

          {quizzes.length > 0 ? (
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
                        {quiz?.questions?.length} Quest??es
                      </QuizInfoText>
                    </QuizInfo>
                  </Quiz>
                );
              }}
            />
          ) : (
            <>
              <Skeleton
                width={containerWidth}
                height={100}
                style={{
                  borderRadius: 5,
                  alignSelf: 'center',
                  marginVertical: 10,
                }}
              />

              <Skeleton
                width={containerWidth}
                height={100}
                style={{
                  borderRadius: 5,
                  alignSelf: 'center',
                  marginVertical: 10,
                }}
              />

              <Skeleton
                width={containerWidth}
                height={100}
                style={{
                  borderRadius: 5,
                  alignSelf: 'center',
                  marginVertical: 10,
                }}
              />

              <Skeleton
                width={containerWidth}
                height={100}
                style={{
                  borderRadius: 5,
                  alignSelf: 'center',
                  marginVertical: 10,
                }}
              />
            </>
          )}
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
                <AboutSectionTitle>Descri????o</AboutSectionTitle>

                <AboutSectionText>{activeQuiz?.description}</AboutSectionText>
              </AboutSection>
            )}

            {activeQuiz?.references && (
              <AboutSection>
                <AboutSectionTitle>Materiais de apoio</AboutSectionTitle>

                <AboutSectionSecondaryText>
                  Cuidado, estes materiais estes materiais n??o est??o sob nosso
                  controle
                </AboutSectionSecondaryText>

                <AboutReferences>
                  <AboutReference>
                    <VideoIcon width={25} />

                    <AboutReferenceTitle>Aula de Algu??m</AboutReferenceTitle>
                  </AboutReference>
                </AboutReferences>
              </AboutSection>
            )}

            <PrimaryButton
              title="Avan??ar"
              active
              onPress={() => handleInitQuiz()}
              style={{ margin: 0 }}
            />
          </AboutContainer>
        </AboutWrapper>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
