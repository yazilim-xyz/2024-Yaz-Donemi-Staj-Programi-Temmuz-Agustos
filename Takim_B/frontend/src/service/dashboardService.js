import { db, collection, onSnapshot } from './firebase';

export const getTotalProducts = (callback) => {
  const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
    callback(snapshot.size); // Number of documents
  }, (error) => {
    console.error("Error getting total products: ", error);
  });

  return unsubscribe; // Return unsubscribe function to stop listening
};

export const getTotalCategories = (callback) => {
  const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
    callback(snapshot.size); // Number of documents
  }, (error) => {
    console.error("Error getting total categories: ", error);
  });

  return unsubscribe; // Return unsubscribe function to stop listening
};
