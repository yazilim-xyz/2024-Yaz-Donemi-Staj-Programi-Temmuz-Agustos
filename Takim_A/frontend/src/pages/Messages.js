import React from 'react';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
  const navigate = useNavigate();

  const handleChatClick = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div>
      <h1>Mesajlarım</h1>
      <div>
        <button onClick={() => handleChatClick(1)}>Button 1</button>
        <button onClick={() => handleChatClick(2)}>Button 2</button>
        <button onClick={() => handleChatClick(3)}>Button 3</button>
        <button onClick={() => handleChatClick(4)}>Button 4</button>
      </div>
    </div>
  )
}

export default Messages;
