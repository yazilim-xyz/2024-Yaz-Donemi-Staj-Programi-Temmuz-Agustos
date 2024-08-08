import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <FaSpinner className="text-4xl text-gray-500 animate-spin" />
    </div>
  );
};

export default Loading;
