import {
  collection,
  doc,
  Firestore,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from "firebase/firestore";

const fetchData = async <T>(
  db: Firestore,
  collectionName: string,
  ...queryCondtions
): Promise<T> => {
  return new Promise(async (resolve, reject) => {
    try {
      const c = collection(db, collectionName);
      const q = query(c,...queryCondtions, orderBy("createdAt", "asc"));
      const querySnapshot = await getDocs(q);
      const data =
        (querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) || []) as T;
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

const postData = async (
  db: Firestore,
  collectionName: string,
  body: Object
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const c = collection(db, collectionName);
      const response = await setDoc(doc(c), {createdAt: serverTimestamp(), ...body});
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export interface MasterData {
  createdAt: number;
  id: string;
  name: string;
}

export { fetchData, postData };
