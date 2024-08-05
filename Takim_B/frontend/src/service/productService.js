import { db, collection, getDocs, addDoc, updateDoc, deleteDoc, getDoc, doc } from './firebase';
export const fetchProducts = async () => {
  const productsCollection = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCollection);
  const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return productsList;
};

export const fetchProductById = async (id) => {
  const productsCollection = collection(db, 'products');
  const productsSnapshot = await getDocs(productsCollection);
  const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const product = productsList.find(p => p.id === id);
  if (product) {
    return product;
  } else {
    throw new Error('Ürün bulunamadı');
  }
};

export const addProduct = async (product) => {
  await addDoc(collection(db, 'products'), product);
};

export const updateProduct = async (id, updatedProduct) => {
  const productDoc = doc(db, 'products', id);
  await updateDoc(productDoc, updatedProduct);
};

export const deleteProduct = async (id) => {
  const productDoc = doc(db, 'products', id);
  await deleteDoc(productDoc);
};
