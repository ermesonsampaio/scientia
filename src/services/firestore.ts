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
  orderBy,
  query,
  QuerySnapshot,
  onSnapshot,
  FirestoreError,
  DocumentData,
  where,
  WhereFilterOp,
} from 'firebase/firestore';

export class FirestoreService {
  private firestore: Firestore;

  constructor(private readonly app: FirebaseApp) {
    this.firestore = getFirestore(app);
  }

  async getCollectionData<T = unknown>(
    collectionName: string,
    orderByDTO?: { field: string; mode: 'asc' | 'desc' },
    whereDTO?: { field: string; operation: WhereFilterOp; value: unknown }
  ): Promise<T[]> {
    const collectionReference = collection(this.firestore, collectionName);

    const queryConstraints = [];

    if (orderByDTO)
      queryConstraints.push(orderBy(orderByDTO.field, orderByDTO.mode));
    if (whereDTO)
      queryConstraints.push(
        where(whereDTO.field, whereDTO.operation, whereDTO.value)
      );

    const filter = query(collectionReference, ...queryConstraints);

    const collectionSnapshot = await getDocs(filter || collectionReference);

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

  async listenCollection(
    collectionName: string,
    orderByDTO?: { field: string; mode: 'asc' | 'desc' },
    next?: (snapshot: QuerySnapshot<DocumentData>) => void,
    error?: (error: FirestoreError) => void,
    complete?: () => void
  ) {
    const collectionReference = collection(this.firestore, collectionName);

    let filter;

    if (orderByDTO) {
      filter = query(
        collectionReference,
        orderBy(orderByDTO.field, orderByDTO.mode)
      );
    }

    return onSnapshot(filter || collectionReference, {
      next,
      error,
      complete,
    });
  }
}
