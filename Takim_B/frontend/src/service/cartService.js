// File: /service/cartService.js

import { db } from './firebase';
import { collection, doc, getDoc, setDoc, updateDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';

// Function to get product details by barcode
export const fetchProductByBarcode = async (barcode) => {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('barkodNo', '==', barcode));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const productDoc = querySnapshot.docs[0];
    return { id: productDoc.id, ...productDoc.data() };
  } else {
    throw new Error('Product not found');
  }
};

// Function to add product to cart
export const addProductToCart = async (product, amount) => {
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
    });
  }
};

// Function to get all cart items
export const getCartItems = async () => {
  const cartRef = collection(db, 'cart');
  const cartSnapshot = await getDocs(cartRef);
  const cartItems = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const productsRef = collection(db, 'products');
  const productPromises = cartItems.map(async (item) => {
    const productDoc = await getDoc(doc(productsRef, item.product_id));
    return {
      ...item,
      ...productDoc.data(),
      id: productDoc.id,
    };
  });

  return Promise.all(productPromises);
};

// Test function
const testGetCartItems = async () => {
  try {
    const cartItems = await getCartItems();
    console.log('Cart Items:', cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};

testGetCartItems();
