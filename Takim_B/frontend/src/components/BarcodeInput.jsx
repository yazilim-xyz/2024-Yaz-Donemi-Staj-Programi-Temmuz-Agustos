import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductByBarcode, selectProducts } from '../features/products/productSlice';
import { calculateTotal } from '../features/totalAmount/totalAmountSlice';
import KeyPad from './KeyPad';
import { FaBarcode } from 'react-icons/fa';

const BarcodeInput = () => {
  const [barcode, setBarcode] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (barcode.trim() === '') {
      setError('Barcod boş olamaz.');
      return;
    }
    dispatch(addProductByBarcode(barcode));
    setBarcode('');
    dispatch(calculateTotal(products));
    setError('');
  };

  const handleKeyClick = (key) => {
    if (key === 'C') {
      setBarcode('');
    } else {
      setBarcode((prevBarcode) => prevBarcode + key);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setBarcode(value);
      setError('');
    } else {
      setError('Lütfen yalnızca sayısal değer girin!');
    }
  };

  return (
    <div className="p-4 shadow-lg rounded-lg max-w-lg mx-auto bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <input
          type="text"
          value={barcode}
          onChange={handleChange} // Pass the event object here
          placeholder="Barkod"
          className="border p-2 rounded-lg w-full"
        />
        <button
          type="submit"
          className="mt-2 sm:mt-0 font-bold p-2 rounded-lg flex items-center space-x-2 bg-green-500 text-white hover:bg-green-600 transition-transform transform hover:scale-105"
        >
          <span>Sepete Ekle</span>
        </button>
        <FaBarcode className="sm:ml-2 text-3xl" />
      </form>
      <div className="mt-4">
        <KeyPad onKeyClick={handleKeyClick} />
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default BarcodeInput;
