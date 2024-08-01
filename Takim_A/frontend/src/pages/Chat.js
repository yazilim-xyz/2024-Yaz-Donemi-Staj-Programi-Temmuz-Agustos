import React from 'react';
import Sidebar from '../components/Sidebar';
import Chatting from '../components/Chatting';


const Chat = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://i.pinimg.com/originals/ef/37/81/ef37815019ae52354c7c5772f4e886d6.png)' }}>
       <div className="border-2 border-white  w-[65%] h-[80%] bg-[#A7BCFE] rounded-[10px] flex overflow-hidden">
        
        <Sidebar />
        <Chatting />
        
        
       </div>
    </div>
  )
}

export default Chat