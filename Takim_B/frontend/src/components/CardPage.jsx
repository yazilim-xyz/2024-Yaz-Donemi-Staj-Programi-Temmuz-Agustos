import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItem } from '../features/products/productSlice';
import { calculateTotal } from '../features/totalAmount/totalAmountSlice';
import { FaTrashAlt } from 'react-icons/fa';
import TotalAmount from './TotalAmount';
import ActionButton from './ActionButton';
import emptyCartImage from '../assets/images/png/empty-card.png';
import { collection, onSnapshot, doc, db, deleteDoc, updateDoc } from '../service/firebase';

const CardPage = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const cartRef = collection(db, 'cart');

    // Firestore'dan ürünleri dinlemek için onSnapshot kullanıyoruz
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
      dispatch(calculateTotal(items));
    });

    // Cleanup function: Dinleyiciyi kaldırmak için
    return () => unsubscribe();
  }, [dispatch]);

  const handleReturn = async (id) => {
    const product = products.find(product => product.id === id);

    if (product) {
      if (product.amount > 1) {
        // Ürün miktarını azalt
        const newQuantity = product.amount - 1;
        const productDocRef = doc(db, 'cart', id);
        const updatedData = {
          amount: newQuantity,
        };
        await updateDoc(productDocRef, updatedData);
      } else {
        // Ürünü kaldır
        const cartRef = doc(db, 'cart', id);
        await deleteDoc(cartRef);
      }
    }
  };

  return (
    <div className="p-4 shadow-lg rounded-lg bg-white h-80 flex flex-col">
      <div className="flex-grow overflow-y-auto scrollbar">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <img src={emptyCartImage} alt="Sepet Boş" className="w-32 h-32 mb-4" />
            <p className="text-gray-500">Sepet Boş</p>
          </div>
        ) : (
          <ul className="space-y-4 p-2">
            {products.map((product) => (
              <li key={product.id} className="border-b py-2 flex flex-col">
                <div className="flex justify-between items-center">
                  <span>{product.productName}</span>
                  <span>${(parseFloat(product.price) * product.amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>({product.amount} Adet x ${parseFloat(product.price)})</span>
                  <button
                    onClick={() => handleReturn(product.id)}
                    className="flex items-center space-x-1 bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105"
                  >
                    <FaTrashAlt />
                    <span>İade</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-auto sticky bottom-0 left-0 w-full p-4 flex justify-between items-center">
        <TotalAmount />
        <ActionButton />
      </div>
    </div>
  );
};

export default CardPage;
