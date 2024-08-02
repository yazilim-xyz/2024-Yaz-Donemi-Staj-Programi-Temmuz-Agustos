import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductByBarcode, selectProducts } from '../features/products/productSlice';
import { calculateTotal } from '../features/totalAmount/totalAmountSlice';
import KeyPad from './KeyPad';
import { FaBarcode, FaPlus } from 'react-icons/fa';

const BarcodeInput = () => {
  const [barcode, setBarcode] = useState('');
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductByBarcode(barcode));
    setBarcode('');
    dispatch(calculateTotal(products));
  };

  const handleKeyClick = (key) => {
    if (key === 'C') {
      setBarcode('');
    } else {
      setBarcode((prevBarcode) => prevBarcode + key);
    }
  };

  return (
    <div className="p-4 shadow-lg max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2'>
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Barcode"
          className="border p-2 rounded-lg w-full"
        />
        <FaBarcode className="sm:ml-2 text-3xl" /> 
        <button
          type="submit"
          className="mt-2 sm:mt-0 font-bold p-2 rounded-lg flex items-center space-x-2"
        >
          <FaPlus className="text-xl" />
        </button>
      </form>
      <div className="mt-4">
        <KeyPad onKeyClick={handleKeyClick} />
      </div>
    </div>
  );
};

export default BarcodeInput;
