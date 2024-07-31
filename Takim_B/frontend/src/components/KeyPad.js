import React from 'react';

const KeyPad = ({ onKeyClick }) => {
  return (
    <div className="p-2 rounded grid grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-1 max-h-full ">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', 'C'].map((key) => (
        <button key={key} className="bg-gray-200 p-2 sm:p-3 rounded text-base sm:text-lg md:text-xl "
        onClick={() => onKeyClick(key)}
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default KeyPad;
