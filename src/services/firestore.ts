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
    const collectionReference = collection(this.firestore, collectionName);
    const collectionSnapshot = await getDocs(collectionReference);

    return collectionSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as unknown as T[];
    })) as T[];
  }
}
