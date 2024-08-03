import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, removeItem } from '../features/products/productSlice';
import { calculateTotal } from '../features/totalAmount/totalAmountSlice';
import { FaTrashAlt } from 'react-icons/fa';
import TotalAmount from './TotalAmount';
import ActionButton from './ActionButton';
import emptyCartImage from '../assets/images/png/empty-card.png'; // Sepet boşken gösterilecek resim

const CardPage = () => {
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const handleReturn = (id) => {
    dispatch(removeItem(id));
    dispatch(calculateTotal(products));
  };

  return (
    <div className="p-4 shadow-lg rounded-lg bg-white h-1/2 flex flex-col">
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
                  <span>{product.name}</span>
                  <span>${(product.price * product.quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>({product.quantity} Adet x ${product.price})</span>
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
      <div className="mt-auto sticky bottom-0 left-0 w-full p-4  flex justify-between items-center">
        <TotalAmount />
        <ActionButton />
      </div>
    </div>
  );
};

export default CardPage;
