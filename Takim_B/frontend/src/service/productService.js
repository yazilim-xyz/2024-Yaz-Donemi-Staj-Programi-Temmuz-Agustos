import { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from './firebase';

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

export const generateUniqueBarcode = async () => {
  let unique = false;
  let barcode = '';

  while (!unique) {
    barcode = Math.floor(1000000 + Math.random() * 9000000).toString(); // 7 haneli rastgele sayı

    const productsRef = collection(db, 'products');
    const q = query(productsRef, where('barcodeId', '==', barcode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      unique = true;
    }
  }

  return barcode;
};
