import React, { useState, useRef, useEffect } from 'react';
import { IoMdAttach } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaCamera } from "react-icons/fa"; // Webcam ikonu
import Picker from 'emoji-picker-react';

const Input = ({ onSend, polls, setPolls }) => {
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [webcamStream, setWebcamStream] = useState(null);
  const [webcamImage, setWebcamImage] = useState(null);
  const fileInputRef = useRef(null);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const messageInputRef = useRef(null);
  const webcamRef = useRef(null);

  useEffect(() => {
    // Cleanup function to stop the webcam stream when component unmounts
    return () => {
      if (webcamStream) {
        const tracks = webcamStream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [webcamStream]);

  const handleSend = () => {
    if (message.trim() || selectedImage || webcamImage) {
      onSend({ text: message, image: selectedImage || webcamImage });
      setMessage('');
      setSelectedImage(null);
      setWebcamImage(null); // Clear webcam image after sending
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

  const handleCaptureClick = async () => {
    if (webcamRef.current && webcamRef.current.srcObject) {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(webcamRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      setWebcamImage(imageData);

      // Stop the webcam stream
      const stream = webcamRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }

      setWebcamStream(null); // Clear the webcam stream state
    } else {
      alert('No webcam stream available to capture.');
    }
  };

  const handleWebcamClose = () => {
    if (webcamRef.current && webcamRef.current.srcObject) {
      const stream = webcamRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    }
    setWebcamStream(null); // Clear the webcam stream state
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setWebcamStream(stream);
      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing webcam: ', err);
      alert('Error accessing webcam: ' + err.message);
    }
  };

  return (
    <div className='bg-white p-2.5 flex flex-col gap-2 rounded-sm shadow-md'>
      <div className='relative flex flex-col'>
        <div className='flex items-center gap-2'>
          <input 
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Mesajınızı buraya yazınız.'
            className='flex-1 bg-gray-100 border border-gray-300 rounded-lg p-2 text-gray-700 outline-none'
            ref={messageInputRef}
          />
          <div className='relative flex items-center gap-2'>
            <MdEmojiEmotions 
              className='text-gray-500 cursor-pointer hover:text-gray-700 transition duration-300 text-xl'
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            <IoMdAttach 
              className='text-gray-500 cursor-pointer hover:text-gray-700 transition duration-300 text-xl'
              onClick={handleAttachClick}
            />
            <FaCamera 
              className='text-gray-500 cursor-pointer hover:text-gray-700 transition duration-300 text-xl'
              onClick={startWebcam}
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
            <input 
              type="file" 
              ref={fileInputRef}
              style={{ display: 'none' }} 
              onChange={handleImageChange}
            />
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
        {webcamImage && (
          <div className='relative'>
            <img 
              src={webcamImage} 
              alt="Webcam Preview" 
              className='w-32 h-32 object-cover rounded-lg shadow-lg border border-gray-300'
            />
            <button 
              onClick={handleWebcamClose}
              className='absolute top-1 right-1 p-1 bg-white border border-gray-300 rounded-full text-red-500 shadow-md'
            >
              <RiCloseCircleLine className='text-lg'/>
            </button>
          </div>
        )}
        {showEmojiPicker && (
          <div className='absolute bottom-full right-0 mt-2'>
            <Picker onEmojiClick={(emoji) => setMessage(message + emoji.emoji)} />
          </div>
        )}
        {showPollModal && (
          <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-4 rounded-lg shadow-lg'>
              <h2 className='text-lg font-semibold mb-2'>Create Poll</h2>
              <input
                type="text"
                placeholder="Poll Question"
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                className='w-full mb-2 p-2 border border-gray-300 rounded'
              />
              {pollOptions.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handlePollOptionChange(index, e.target.value)}
                  className='w-full mb-2 p-2 border border-gray-300 rounded'
                />
              ))}
              <button 
                onClick={() => setPollOptions([...pollOptions, ''])}
                className='text-blue-500'
              >
                Add Option
              </button>
              <div className='mt-2'>
                <button 
                  onClick={handlePollCreation}
                  className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
                >
                  Create Poll
                </button>
                <button 
                  onClick={() => setShowPollModal(false)}
                  className='ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {webcamStream && (
        <div className='relative'>
          <video
            ref={webcamRef}
            autoPlay
            width="640"
            height="480"
            className='border border-gray-300 rounded-lg'
          />
          <button 
            onClick={handleCaptureClick}
            className='absolute top-1 right-1 p-2 bg-white border border-gray-300 rounded-full text-blue-500 shadow-md'
          >
            Capture
          </button>
        </div>
      )}
    </div>
  );
};

export default Input;