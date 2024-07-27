import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";

const EmojiPicker = ({ onSelect }) => {
  const emojis = ["😀", "😂", "😍", "🥺", "😢"];
  return (
    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-lg rounded-lg p-2 transition-opacity duration-300 opacity-100 z-10">
      <div className="grid grid-cols-5 gap-2">
        {emojis.map((emoji, index) => (
          <span
            key={index}
            onClick={() => onSelect(emoji)}
            className="cursor-pointer text-xl"
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

const FileOptions = ({ onFileChange, onImageUpload, onClose }) => {
  return (
    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-lg rounded-lg p-2 transition-opacity duration-300 opacity-100 z-10">
      <div className="flex flex-col gap-2">
        <label className="cursor-pointer bg-gray-200 p-2 rounded-lg text-center hover:bg-gray-300">
          Resim Yükle
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
        </label>
        <label className="cursor-pointer bg-gray-200 p-2 rounded-lg text-center hover:bg-gray-300">
          Dosya Yükle
          <input
            type="file"
            accept="*/*"
            onChange={onFileChange}
            className="hidden"
          />
        </label>
        <button
          onClick={onClose}
          className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
        >
          Kapat
        </button>
      </div>
    </div>
  );
};

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState({
    1: [],
    2: [],
    3: [],
    4: []
  });

  const [input, setInput] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [showFileOptions, setShowFileOptions] = useState(false);

  const chatNames = {
    1: "Ahmet",
    2: "Mehmet",
    3: "Ayşe",
    4: "Fatma"
  };

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      const newMessage = { text: input, sender: 'user' };
      setMessages(prevMessages => ({
        ...prevMessages,
        [id]: [...prevMessages[id], newMessage]
      }));
      setInput('');
    }
  };

  const addEmoji = (emoji) => {
    setInput(input + emoji);
    setShowPicker(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileUrl = reader.result;
        setMessages(prevMessages => ({
          ...prevMessages,
          [id]: [...prevMessages[id], { text: fileUrl, sender: 'user', type: 'file' }]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setMessages(prevMessages => ({
          ...prevMessages,
          [id]: [...prevMessages[id], { text: imageUrl, sender: 'user', type: 'image' }]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)' }}>
      <div className="bg-primary rounded-lg shadow-lg w-4/5 h-4/5 flex flex-col overflow-hidden bg-opacity-10">
        <header className="bg-secondary p-4 text-white flex justify-between items-center bg-opacity-90 border-b border-gray-200">
          <h1>{chatNames[id]}</h1>
          <div className="flex">
         
          <IoIosArrowRoundBack 
          onClick={() => navigate('/messages')} 
          className='text-4xl ml-2 hover:cursor-pointer hover:bg-tertiary rounded-lg hover:text-primary transition-transform duration-200 transform hover:scale-110' />
          </div>
          
        </header>
        <div className="flex-grow p-4 overflow-y-auto bg-primary bg-opacity-50">
          <div className="flex flex-col space-y-4">
            {messages[id].map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-xs transition-opacity duration-500 ease-in-out ${message.sender === 'user' ? 'bg-opacity-90 bg-secondary text-white self-end opacity-100 animate-fadeIn' : 'bg-gray-200 text-black self-start opacity-100'}`}
              >
                {message.type === 'image' ? (
                  <img src={message.text} alt="Yüklenen" className="max-w-full max-h-60" />
                ) : message.type === 'file' ? (
                  <a href={message.text} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Dosyayı Görüntüle
                  </a>
                ) : (
                  message.text
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-white border-t bg-opacity-50 relative">
          <div className="flex items-center relative">
            <button 
              onClick={() => setShowFileOptions(!showFileOptions)} 
              className="mr-2 p-2 border rounded-lg bg-gray-200 hover:bg-gray-300 relative"
            >
              📂
            </button>
            {showFileOptions && (
              <FileOptions
                onFileChange={handleFileChange}
                onImageUpload={handleImageUpload}
                onClose={() => setShowFileOptions(false)}
              />
            )}
            <button 
              onClick={() => setShowPicker(!showPicker)} 
              className="mr-2 p-2 border rounded-lg bg-gray-200 hover:bg-gray-300 relative"
            >
              😀
            </button>
            {showPicker && <EmojiPicker onSelect={addEmoji} />}
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              className="flex-grow p-2 border rounded-lg focus:outline-none" 
              placeholder="Mesajınızı yazın..."
            />
            <button 
              onClick={handleSendMessage} 
              className="bg-secondary text-white  p-2 rounded-lg hover:bg-secondary hover:bg-opacity-70 ml-3 transition-transform duration-200 transform hover:scale-110 hover:text-primary hover:bg-tertiary"
            >
              Gönder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
