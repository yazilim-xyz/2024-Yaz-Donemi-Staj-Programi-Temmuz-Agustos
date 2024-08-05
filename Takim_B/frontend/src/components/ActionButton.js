import React from 'react';

const ActionButtons = () => {
  return (
    <div className="flex flex-col space-y-4">
      <button className="bg-green-500 text-white font-bold py-2 px-4 rounded shadow-lg transition-transform transform hover:scale-105">
        Ödeme Al
      </button>
      {/* <button className="bg-red-500 text-white p-2 rounded w-full">
        İade
      </button> */}
    </div>
  );
};

export default ActionButtons;
