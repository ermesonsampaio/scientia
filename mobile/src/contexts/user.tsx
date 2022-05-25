import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { Key } from '../types/async-storage';

interface UserContextData {
  correctPoints: number;
  incorrectPoints: number;
  quizzesCompleted: number;
  increaseCorrectPoints(): void;
  increaseIncorrectPoints(): void;
  increaseQuizzesCompleted(): void;
}

const UserContext = createContext({} as UserContextData);

export const UserContextProvider: React.FC = ({ children }) => {
  const [correctPoints, setCorrectPoints] = useState(0);
  const [incorrectPoints, setIncorrectPoints] = useState(0);
  const [quizzesCompleted, setQuizzesCompleted] = useState(0);

  useEffect(() => {
    (async () => {
      setCorrectPoints(await getPoints('@scientia_CorrectPoints'));
      setIncorrectPoints(await getPoints('@scientia_IncorrectPoints'));
      setQuizzesCompleted(await getPoints('@scientia_QuizzesCompleted'));
    })();
  }, []);

  async function getPoints(key: Key): Promise<number> {
    const points = await AsyncStorage.getItem(key);

    return +(points || 0);
  }

  async function setPoints(points: number, key: Key) {
    await AsyncStorage.setItem(key, points.toString());
  }

  useEffect(() => {
    (async () => {
      await setPoints(correctPoints, '@scientia_CorrectPoints');
    })();
  }, [correctPoints]);

  useEffect(() => {
    (async () => {
      await setPoints(incorrectPoints, '@scientia_IncorrectPoints');
    })();
  }, [incorrectPoints]);

  useEffect(() => {
    (async () => {
      await setPoints(quizzesCompleted, '@scientia_QuizzesCompleted');
    })();
  }, [quizzesCompleted]);

  return (
    <UserContext.Provider
      value={{
        correctPoints,
        incorrectPoints,
        quizzesCompleted,
        increaseCorrectPoints: () => setCorrectPoints(correctPoints + 1),
        increaseIncorrectPoints: () => setIncorrectPoints(incorrectPoints + 1),
        increaseQuizzesCompleted: () =>
          setQuizzesCompleted(quizzesCompleted + 1),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
