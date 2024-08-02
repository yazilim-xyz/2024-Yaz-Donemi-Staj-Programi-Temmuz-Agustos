
import React from 'react';

const KeyPad = ({ onKeyClick }) => {
  return (
    <div className="p-1 rounded grid grid-cols-3 gap-1 max-h-72"> {/* Adjusted padding and max height */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', 'C'].map((key) => (
        <button
          key={key}
          className="bg-gray-200 p-1 rounded text-sm h-11 sm:h-7 md:h-11"  // Adjusted padding and font size
          onClick={() => onKeyClick(key)}
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default KeyPad;
