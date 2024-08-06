import React from 'react';

const ActionButtons = () => {
  return (
    <div className="flex flex-col space-y-4 transition-all duration-300 ease-in-out">
      <button className="bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
        Ödeme Al
      </button>
    </div>
  );
};

export default ActionButtons;
