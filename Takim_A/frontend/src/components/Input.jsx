import React from 'react';
import { FaFileImage } from "react-icons/fa";
import { IoMdAttach } from "react-icons/io";

const Input = () => {
  return (
    <div className='bg-white h-12 p-2.5 flex items-center gap-2.5 rounded-lg shadow-md'>
      <input 
        type="text" 
        placeholder='Bir mesaj yazın' 
        className='flex-1 bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-700 outline-none'
      />
      <div className='flex items-center gap-2'>
        <IoMdAttach className='text-gray-500 cursor-pointer hover:text-gray-700 transition duration-300 text-xl' />
        <input 
          type="file" 
          style={{ display: 'none' }} 
          id='file'
        />
        <label htmlFor="file">
          <FaFileImage className='text-gray-500 cursor-pointer hover:text-gray-700 transition duration-300 text-xl' />
        </label>
        <button 
          className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300'
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Input;
