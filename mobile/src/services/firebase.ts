import { initializeApp } from 'firebase/app';
import { API_KEY, APP_ID, PROJECT_ID } from 'react-native-dotenv';

export const firebaseApp = initializeApp({
  apiKey: API_KEY,
  appId: APP_ID,
  projectId: PROJECT_ID,
});
