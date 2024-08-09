import { db, collection, getDocs, deleteDoc, doc, runTransaction, onSnapshot } from './firebase';

export const getTotalProducts = (callback) => {
  const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
    callback(snapshot.size); 
  }, (error) => {
    console.error("Error getting total products: ", error);
  });

  return unsubscribe; 
};

export const getTotalCategories = (callback) => {
  const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
    callback(snapshot.size); // Number of documents
  }, (error) => {
    console.error("Error getting total categories: ", error);
  });

  return unsubscribe; 
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

export const updateStockOnPayment = async () => {
  const cartRef = collection(db, 'cart');
  const cartSnapshot = await getDocs(cartRef);
  
  const productUpdates = cartSnapshot.docs.map(async (cartDoc) => {
    const cartData = cartDoc.data();
    const productRef = doc(db, 'products', cartData.product_id);

    await runTransaction(db, async (transaction) => {
      const productDoc = await transaction.get(productRef);
      if (!productDoc.exists) {
        throw new Error('Ürün bulunamadı');
      }

      const newQuantity = productDoc.data().quantity - cartData.amount;
      if (newQuantity < 0) {
        throw new Error('Yetersiz stok');
      }

      transaction.update(productRef, { quantity: newQuantity });
    });

    // Sepet öğesini sil
    await deleteDoc(cartDoc.ref);
  });

  await Promise.all(productUpdates);
};