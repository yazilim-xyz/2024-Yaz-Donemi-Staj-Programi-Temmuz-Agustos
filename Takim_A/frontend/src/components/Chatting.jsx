import React from 'react';
import { FaSearch, FaUserPlus } from 'react-icons/fa'; // react-icons'dan ikonları ekleyelim
import { BsThreeDots } from "react-icons/bs";
import Messages from './Messages';
import Input from './Input';


const Chatting = () => {
  return (
    <div className="flex-[2]">
      <div className='chatInfo h-12 items-center flex bg-[#5d5b8d] p-2.5 text-slate-100 justify-between'>
          <span>Jane</span>
          <div className="chatIcaons flex  items-center gap-2  ">
            <FaUserPlus
            style={{height:"40px", width:"25px", gap:'10px',display:'flex'}}
            className='cursor-pointer hover:text-gray-300 transition duration-300'
            />
            <BsThreeDots
            style={{height:"40px", width:"25px",gap:'10px',display:'flex'}}
            className='cursor-pointer hover:text-gray-300 transition duration-300'
            />
            <img src="" alt="" /> 
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}
export default Chatting;