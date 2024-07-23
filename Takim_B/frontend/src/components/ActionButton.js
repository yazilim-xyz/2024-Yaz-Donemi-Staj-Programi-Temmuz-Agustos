import React from 'react';

const ActionButtons = () => {
  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <button className="bg-green-500 text-white p-2 rounded w-full">
        Ödeme Al
      </button>
      <button className="bg-red-500 text-white p-2 rounded w-full">
        İade
      </button>
    </div>
  );
};

export default ActionButtons;
