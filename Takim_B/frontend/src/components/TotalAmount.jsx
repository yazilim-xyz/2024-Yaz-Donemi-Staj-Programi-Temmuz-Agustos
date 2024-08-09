import React from 'react';
import { useSelector } from 'react-redux';
import { selectTotalAmount } from '../features/totalAmount/totalAmountSlice';

const TotalAmount = () => {
  const totalAmount = useSelector(selectTotalAmount);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Toplam Tutar</h2>
      <p className="text-2xl">₺{totalAmount.toFixed(2)}</p>
    </div>
  );
};

export default TotalAmount;
