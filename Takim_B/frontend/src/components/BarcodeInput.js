import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductByBarcode } from '../features/products/productSlice';
import KeyPad from './KeyPad'; 

const BarcodeInput = () => {
  const [barcode, setBarcode] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductByBarcode(barcode));
    setBarcode('');
  };
  const handleKeyClick = (key) => {
    if (key === 'C') {
      setBarcode('');
    } else {
      setBarcode((prevBarcode) => prevBarcode + key);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter barcode"
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
        >
          Add Product
        </button>
      </form>
      <KeyPad onKeyClick={handleKeyClick} />
    </div>
  );
};

export default BarcodeInput;
