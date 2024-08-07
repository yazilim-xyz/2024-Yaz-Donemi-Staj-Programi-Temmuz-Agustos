import React, { useState, useRef } from 'react';
import { FaFileImage } from "react-icons/fa";
import { IoMdAttach } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { RiCloseCircleLine } from "react-icons/ri"; // X simgesi için
import Picker from 'emoji-picker-react';

const Input = ({ onSend, polls, setPolls }) => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false); // Burada ekleniyor
  const fileInputRef = useRef(null);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

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

  const handleAttachClick = () => {
    setShowAttachMenu(!showAttachMenu);
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
    setShowAttachMenu(false);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const locationMessage = `https://www.google.com/maps?q=${latitude},${longitude}`;
        onSend({ text: locationMessage, image: null });
        setMessage('');
        setShowAttachMenu(false);
      }, (error) => {
        alert('Error getting location: ' + error.message);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handlePollClick = () => {
    setShowAttachMenu(false);
    setShowPollModal(true);
  };

  const handlePollCreation = () => {
    if (pollQuestion.trim() && pollOptions.every(option => option.trim())) {
      const newPoll = {
        question: pollQuestion,
        options: pollOptions,
        votes: Array(pollOptions.length).fill(0),
      };
      setPolls([...polls, newPoll]);
      onSend({ text: `Poll: ${pollQuestion}`, poll: newPoll });
      setPollQuestion('');
      setPollOptions(['', '']);
      setShowPollModal(false);
    } else {
      alert('Please fill out the poll question and options.');
    }
  };

  const handlePollOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
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
        <div className='relative flex items-center gap-2'>
          <div className='relative'>
            <MdEmojiEmotions 
              className='text-gray-500 cursor-pointer hover:text-gray-700 transition duration-300 text-xl w-6 h-6'
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            {showEmojiPicker && (
              <div className='absolute bottom-12 left-0 z-10 w-full'>
                <Picker 
                  onEmojiClick={(emojiObject) => setMessage((prevMsg) => prevMsg + emojiObject.emoji)}
                  pickerStyle={{ width: '100%', maxWidth: '400px' }}
                />
              </div>
            )}
          </div>
          <div className='relative'>
            <IoMdAttach 
              className='text-gray-500 cursor-pointer hover:text-gray-700 transition duration-300 text-xl'
              onClick={handleAttachClick}
            />
            {showAttachMenu && (
              <div 
                className='absolute bottom-full right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-20'
                style={{ width: '150px' }}
              >
                <button 
                  className='block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left'
                  onClick={handleFileClick}
                >
                  File
                </button>
                <button 
                  className='block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left'
                  onClick={handleLocationClick}
                >
                  Location
                </button>
                <button 
                  className='block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left'
                  onClick={handlePollClick}
                >
                  Poll
                </button>
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef}
            style={{ display: 'none' }} 
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
      {showPollModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-4 rounded shadow-lg'>
            <h2 className='text-xl mb-4'>Create Poll</h2>
            <input 
              type='text' 
              value={pollQuestion} 
              onChange={(e) => setPollQuestion(e.target.value)} 
              placeholder='Poll Question' 
              className='w-full mb-2 p-2 border border-gray-300 rounded'
            />
            {pollOptions.map((option, index) => (
              <input 
                key={index} 
                type='text' 
                value={option} 
                onChange={(e) => handlePollOptionChange(index, e.target.value)} 
                placeholder={`Option ${index + 1}`} 
                className='w-full mb-2 p-2 border border-gray-300 rounded'
              />
            ))}
            <button 
              onClick={() => setPollOptions([...pollOptions, ''])}
              className='text-blue-500 mb-2'
            >
              Add Option
            </button>
            <div className='flex justify-end gap-2'>
              <button 
                onClick={() => setShowPollModal(false)}
                className='bg-red-500 text-white px-4 py-2 rounded'
              >
                Cancel
              </button>
              <button 
                onClick={handlePollCreation}
                className='bg-blue-500 text-white px-4 py-2 rounded'
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
