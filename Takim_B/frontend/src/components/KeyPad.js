import React from 'react';

const KeyPad = ({ onKeyClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', 'C'].map((key) => (
        <button
          key={key}
          className="bg-gray-200 p-2 rounded-lg text-lg hover:bg-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={() => onKeyClick(key)}
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default KeyPad;
