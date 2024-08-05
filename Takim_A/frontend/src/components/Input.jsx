import React, {  useState } from 'react';
import { FaFileImage } from "react-icons/fa";
import { IoMdAttach } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { RiCloseCircleLine } from "react-icons/ri"; // X simgesi için

const Input = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  
  const handleSend = () => {
    if (message.trim() || selectedImage) {
      onSend({ text: message, image: selectedImage });
      setMessage('');
      setSelectedImage(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  return (
    <div className='bg-white p-2.5 flex flex-col gap-2 rounded-sm shadow-md'>
  <div className='flex items-center gap-2'>
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
        onChange={handleImageChange}
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
  {selectedImage && (
    <div className='relative'>
      <img 
        src={selectedImage} 
        alt="Selected Preview" 
        className='w-32 h-32 object-cover rounded-lg shadow-lg border border-gray-300'
      />
      <button 
        onClick={handleImageRemove}
        className='absolute top-1 right-1 p-1 bg-white border border-gray-300 rounded-full text-red-500 shadow-md'
      >
        <RiCloseCircleLine className='text-lg'/>
      </button>
    </div>
  )}
</div>

  );
};

export default Input;
