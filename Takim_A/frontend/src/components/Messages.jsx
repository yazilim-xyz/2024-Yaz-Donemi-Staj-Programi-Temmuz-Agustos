import React from 'react';
import Message from './Message';

const Messages = ({ messages }) => {
  return (
    <div style={{ height: 'calc(100% - 96px)' }} className='messages overflow-auto bg-[#BAD7E9] p-2.5 opacity-100'>
      {messages.map((msg, index) => (
        <Message
          key={index}
          text={msg.text}
          sender={msg.sender}
          time={msg.time}
          isCurrentUser={msg.isCurrentUser}
          image={msg.image}
        />
      ))}
    </div>
  );
}

export default Messages;
