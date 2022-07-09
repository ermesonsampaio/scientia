import { QuerySnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthContext, User } from '../../contexts/auth';
import { firebaseApp } from '../../services/firebase';
import { FirestoreService } from '../../services/firestore';
import { TabProps } from '../../types/navigation';
import {
  Container,
  Row,
  Wrapper,
  Position,
  UserInfo,
  Score,
  Title,
} from './styles';
import {
  SequencedTransition,
  FadeInDown,
  FadeOutUp,
} from 'react-native-reanimated';

export function RankingScreen({}: TabProps<'Ranking'>) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const firestoreService = new FirestoreService(firebaseApp);

  const { user } = useAuthContext();

  useEffect(() => {
    setIsLoading(true);

    firestoreService.listenCollection(
      'users',
      {
        field: 'score',
        mode: 'desc',
      },
      (querySnapshot: QuerySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];

        setUsers(data);
      }
    );
  }, []);

  return (
    <Container>
      <Title>Ranking</Title>

      {users.map(({ username, score, id }, position) => (
        <Row
          me={id === user.id}
          key={id}
          layout={SequencedTransition.delay(500).duration(1000).randomDelay()}
        >
          <Wrapper>
            <Position me={id === user.id}>{position + 1}°</Position>
            <UserInfo>{username}</UserInfo>
          </Wrapper>

          <Score
            key={score}
            entering={FadeInDown.duration(500)}
            exiting={FadeOutUp.duration(500)}
          >
            {score}
          </Score>
        </Row>
      ))}
    </Container>
  );
}
