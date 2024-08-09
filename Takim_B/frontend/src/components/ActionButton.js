// File: /components/ActionButtons.js

import React from 'react';
import { updateStockOnPayment } from '../service/dashboardService';

const ActionButtons = () => {
  const handlePayment = async () => {
    try {
      await updateStockOnPayment();
      alert('Ödeme başarılı ve stok güncellendi. Sepet boşaltıldı.');
    } catch (error) {
      console.error('Stok güncellenirken hata:', error);
      alert('Ödeme işlemi sırasında bir hata oluştu');
    }
  };

  return (
    <div className="flex flex-col space-y-4 transition-all duration-300 ease-in-out">
      <button
        className="bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={handlePayment}
      >
        Ödeme Al
      </button>
    </div>
  );
};

export default ActionButtons;
