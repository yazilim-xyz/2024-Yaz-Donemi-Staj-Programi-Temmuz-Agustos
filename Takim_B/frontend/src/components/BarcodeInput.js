import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProductByBarcode } from '../features/products/productSlice';
import KeyPad from './KeyPad'; 
import { FaBarcode } from 'react-icons/fa'; 

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
    <div className="p-4 shadow">
      <form onSubmit={handleSubmit} className='flex items-center space-x-2 flex-grow'>
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Barkod"
          className="border p-2 rounded-r-3xl rounded-l-3xl py-4 m-3 flex-grow"
        />
        <button
          type="submit"
          className="mt-2 font-bold p-2 rounded-lg"
        >
          {/* Add Product */}
          <FaBarcode className="ml-2 text-3xl" /> 
          Barkod
        </button>
      </form>
      <KeyPad onKeyClick={handleKeyClick} className="flex-grow"/>
    </div>
  );
};

export default BarcodeInput;
