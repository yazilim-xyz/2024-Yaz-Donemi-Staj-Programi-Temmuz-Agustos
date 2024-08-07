import React, { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import Sidebar from '../components/Sidebar';
import Chatting from '../components/Chatting';

const Chat = () => {
  const { settings } = useContext(SettingsContext);

  const backgroundImageUrl = settings.theme === 'light'
    ? 'url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)'
    : 'url(https://wallpaperaccess.com/full/1248467.jpg)';

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: backgroundImageUrl }}>
      <div className={`border-2 ${settings.theme === 'light' ? 'border-black' : 'border-white'} w-[65%] h-[80%] ${settings.theme === 'light' ? 'bg-[#A7BCFE]' : 'bg-[#2C3E50]'} rounded-xl flex overflow-hidden`}>
        <Sidebar />
        <Chatting />
      </div>
    </div>
  );
}

export default Chat;
