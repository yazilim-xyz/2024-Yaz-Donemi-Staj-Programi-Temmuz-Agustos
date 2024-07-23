import React from 'react';
import { useSelector } from 'react-redux';
import { selectTotalAmount } from '../features/totalAmount/totalAmountSlice';

const TotalAmount = () => {
  const totalAmount = useSelector(selectTotalAmount);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">Total Amount</h2>
      <p className="text-2xl">${totalAmount.toFixed(2)}</p>
    </div>
  );
};

export default TotalAmount;
