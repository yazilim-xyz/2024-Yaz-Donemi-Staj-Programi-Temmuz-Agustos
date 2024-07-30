import React from 'react'
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

const Sidebar = () => {
  const chatData = [1, 2, 3, 4]; // Dummy data for example purposes
  return (
    <div className="flex flex-col lg:w-1/4 md:w-1/3 sm:w-1/2 w-full border-r border-gray-300 bg-[#3D3C61] h-screen p-4 overflow-y-auto">
      <Navbar/>
      <Search/>
      <Chats/>
      <Chats/>
      <Chats/>
      <Chats/>

      
      </div>
  )
}

export default Sidebar;