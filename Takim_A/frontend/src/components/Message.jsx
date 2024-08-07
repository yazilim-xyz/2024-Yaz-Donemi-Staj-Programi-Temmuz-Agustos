import React from 'react';

const Message = ({ text, sender, time, isCurrentUser, image }) => {
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div className={`flex items-start gap-3 mb-3  ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && (
        <img
          src={sender.profilePic}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`p-2.5 rounded-lg max-w-xs ${isCurrentUser ? 'bg-[#508C9B] text-white opacity-100' : 'bg-gray-200 text-black opacity-100'}`}
        >
          <p>{text}</p>
          {image && <img src={image} alt="Sent" className="mt-2  rounded-lg max-h-60 max-w-60 object-contain" />}
        </div>
        <span className="text-xs text-gray-500 mt-1">{formatTime(time)}</span>
      </div>
      {isCurrentUser && (
        <img
          src={sender.profilePic}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
    </div>
  );
};

export default Message;
