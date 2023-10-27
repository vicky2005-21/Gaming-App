import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  DocumentReference,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyDTqzW4fCECsfqCJYQLdAzIsnXM9NXul2U",
  authDomain: "cerebrus-creaitors.firebaseapp.com",
  databaseURL:
    "https://cerebrus-creaitors-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cerebrus-creaitors",
  storageBucket: "cerebrus-creaitors.appspot.com",
  messagingSenderId: "959138646112",
  appId: "1:959138646112:web:35349bdd2eeb0f728b9b05",
  measurementId: "G-C6JT5PL6LB",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getItem(item: string) {
  const itemRef = collection(db, item);
  const itemSnapshot = await getDocs(itemRef);

  return itemSnapshot.docs.map((x) => ({
    id: x.id,
    doc: x.data(),
  }));
}

export async function addItem(item: string, data: Object) {
  const itemRef = collection(db, item);
  const result = await addDoc(itemRef, data);

  return result.id;
}
