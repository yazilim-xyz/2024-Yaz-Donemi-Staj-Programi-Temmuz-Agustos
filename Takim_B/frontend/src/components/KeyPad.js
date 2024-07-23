import React from 'react';

const KeyPad = () => {
  return (
    <div className="bg-white p-4 rounded shadow grid grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', 'C'].map((key) => (
        <button key={key} className="bg-gray-200 p-4 rounded">
          {key}
        </button>
      ))}
    </div>
  );
};

export default KeyPad;
