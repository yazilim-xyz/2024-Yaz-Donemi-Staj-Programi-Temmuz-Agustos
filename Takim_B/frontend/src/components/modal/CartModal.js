import React from 'react';
import CardPage from '../CardPage';
import BarcodeInput from '../BarcodeInput';

const CartModal = ({ isVisible, toggleVisibility }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-sm">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold">Sepet</h2>
          <button onClick={toggleVisibility} className="text-lg font-bold">&times;</button>
        </div>
        <div className="space-y-3">
          <CardPage />
          <BarcodeInput />
        </div>
      </div>
    </div>
  );
};

export default CartModal;
