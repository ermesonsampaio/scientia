import { FirebaseApp } from 'firebase/app';
import {
  Firestore,
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
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
  }

  async getDocumentData<T = unknown>(path: string): Promise<T | null> {
    const document = doc(this.firestore, path);
    const documentSnapshot = await getDoc(document);

    if (documentSnapshot.exists())
      return {
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
      } as unknown as T;

    return null;
  }

  async setDocumentInCollection<T = unknown>(
    collectionName: string,
    docName: string,
    data: T
  ): Promise<void> {
    const collectionReference = collection(this.firestore, collectionName);
    const documentReference = doc(collectionReference, docName);

    await setDoc(documentReference, data);
  }

  async updateDocumentInColletion(
    collectionName: string,
    docName: string,
    data: Partial<unknown>
  ) {
    const collectionReference = collection(this.firestore, collectionName);
    const documentReference = doc(collectionReference, docName);

    await updateDoc(documentReference, data);
  }
}
