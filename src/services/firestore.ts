import { FirebaseApp } from 'firebase/app';
import {
  Firestore,
  getFirestore,
  collection,
  getDocs,
} from 'firebase/firestore';

export class FirestoreService {
  firestore: Firestore;

  constructor(private readonly app: FirebaseApp) {
    this.firestore = getFirestore(app);
  }

  async getCollectionData<T = unknown>(collectionName: string): Promise<T[]> {
    const questionnairesCollection = collection(this.firestore, collectionName);
    const questionnairesSnapshot = await getDocs(questionnairesCollection);

    return questionnairesSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as T[];
  }
}
