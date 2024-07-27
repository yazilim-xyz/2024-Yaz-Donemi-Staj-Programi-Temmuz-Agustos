import React from 'react';
import './Message.css';

const Message = () => {
  return (
    <div className='message owner flex gap-5 mb-5'>
      <div className="messageInfo flex-col text-gray-600 font-light">
        <img src="https://pbs.twimg.com/profile_images/1235250851876352002/zXuZlI2k_400x400.jpg" alt=""  className='w-10 h-10 rounded-full object-cover'/>
        <span>Just now</span>
      </div>
      <div className="messageContent max-w-[50%]  flex flex-col gap-2.5 ">
        <p style={{maxWidth:'max-content'}} className='bg-white p-2.5 rounded-tl-[0px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] bg-[#8da4f1] max-w-md'>Hello</p>
        { <img src="https://pbs.twimg.com/profile_images/1235250851876352002/zXuZlI2k_400x400.jpg" alt="" className='w-10  h-10 rounded-full object-cover rounded-full'/> }
      </div>
    </div>
  )
}

export default Message