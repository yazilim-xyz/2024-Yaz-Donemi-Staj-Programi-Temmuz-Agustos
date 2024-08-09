import { db, onSnapshot } from './firebase';
import { collection, doc, getDoc, setDoc, updateDoc, getDocs, query, where } from 'firebase/firestore';

// Barkod numarasına göre ürün detaylarını getirme işlevi
export const fetchProductByBarcode = async (barcode) => {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('barcodeId', '==', barcode));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const productDoc = querySnapshot.docs[0];
    return { id: productDoc.id, ...productDoc.data() };
  } else {
    throw new Error('Ürün bulunamadı');
  }
};

// Ürünü sepete ekleme işlevi
export const addProductToCart = async (product, amount = 1) => {
  const cartRef = collection(db, 'cart');
  const productInCartRef = doc(cartRef, product.id);
  const productInCartDoc = await getDoc(productInCartRef);

  if (productInCartDoc.exists()) {
    await updateDoc(productInCartRef, {
      amount: productInCartDoc.data().amount + amount,
    });
  } else {
    await setDoc(productInCartRef, {
      product_id: product.id,
      amount: amount,
      price: product.price,
      productName: product.productName,
    });
  }
};

// Sepetteki tüm ürünleri getirme işlevi
export const getCartItems = async () => {
  const cartRef = collection(db, 'cart');
  const cartSnapshot = await getDocs(cartRef);
  const cartItems = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return cartItems;
};

export const fetchTotalStock = async () => {
  const productsRef = collection(db, 'products');
  const productsSnapshot = await getDocs(productsRef);
  const products = productsSnapshot.docs.map(doc => doc.data());

  const totalStock = products.reduce((sum, product) => sum + Number(product.quantity), 0);
  return totalStock;
};

// Toplam stok miktarını çekme işlevi
export const getTotalStock = (callback) => {
  const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
    const totalStock = snapshot.docs.reduce((sum, doc) => {
      return sum + Number(doc.data().quantity);
    }, 0);
    callback(totalStock); // Güncellenmiş toplam stok miktarını geri çağırma işlevine ilet
  }, (error) => {
    console.error("Error getting total stock: ", error);
  });

  return unsubscribe; // Dinlemeyi durdurmak için geri dönüş işlevi
};