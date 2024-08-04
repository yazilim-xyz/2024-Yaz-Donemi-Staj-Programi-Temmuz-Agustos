import { db, collection, addDoc, updateDoc, deleteDoc, doc } from './firebase';

const categoryCollection = collection(db, 'categories');

export const addCategory = async (category) => {
  await addDoc(categoryCollection, category);
};

export const updateCategory = async (id, updatedCategory) => {
  const categoryDoc = doc(db, 'categories', id);
  await updateDoc(categoryDoc, updatedCategory);
};

export const deleteCategory = async (id) => {
  const categoryDoc = doc(db, 'categories', id);
  await deleteDoc(categoryDoc);
};
