import React, { useState } from 'react';
import { FaFileImage } from "react-icons/fa";
import { IoMdAttach } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";


const Input = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage(''); // Mesaj gönderildikten sonra inputu temizle
    }
  };

  return (
    <div className='bg-white h-12 p-2.5 flex items-center gap-2.5 rounded-sm shadow-md'>
      <input 
        type="text" 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Mesajınızı buraya yazınız.'
        className='flex-1 bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-700 outline-none'
      />
      <div className='flex items-center gap-2'>
        <MdEmojiEmotions className='text-gray-500 cursor-pointer hover:text-gray-700 transition duration-300 text-xl'/>
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
          onClick={handleSend}
          className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300'
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Input;
