import React, { useState } from 'react';
import Messages from './Messages';
import Input from './Input';

const Chatting = () => {
  const [messages, setMessages] = useState([]);
  const [polls, setPolls] = useState([]);
  // Mesaj gönderme işlevi
  const handleSendMessage = ({ text, image }) => {
    setMessages([
      ...messages,
      {
        text,
        image, // Resmi de ekle
        sender: {
          profilePic: 'https://pbs.twimg.com/profile_images/1235250851876352002/zXuZlI2k_400x400.jpg', // Profil fotoğrafı yolu
        },
        time: new Date(),
        isCurrentUser: true, // Mesajı gönderen kullanıcı
      }
    ]);
  };


  return (
    <div className="flex-[2] flex flex-col">
      <div className='h-12 flex items-center bg-[#19376D] p-2.5 text-slate-100 justify-between'>
        <span>Ayşe</span>
        <div className="flex items-center gap-2">

        </div>
      </div>
      <Messages messages={messages} />
      <Input onSend={handleSendMessage} polls={polls} setPolls={setPolls} />
    </div>
  );
}

export default Chatting;
