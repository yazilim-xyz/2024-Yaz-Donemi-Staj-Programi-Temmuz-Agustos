import { db, collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from './firebase';

const categoryCollection = collection(db, 'categories');

export const fetchCategories = async () => {
  const categorySnapshot = await getDocs(categoryCollection);
  return categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addCategory = async (name) => {
  const docRef = await addDoc(categoryCollection, { name });
  return { id: docRef.id, name };
};

export const updateCategory = async (id, name) => {
  const categoryDoc = doc(db, 'categories', id);
  await updateDoc(categoryDoc, { name });
};

export const deleteCategory = async (id) => {
  const categoryDoc = doc(db, 'categories', id);
  await deleteDoc(categoryDoc);
};
