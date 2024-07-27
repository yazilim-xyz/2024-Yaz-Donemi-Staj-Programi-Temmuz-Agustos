import React from 'react'
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

const Sidebar = () => {
  return (
    <div className="flex-1 border-r border-black bg-[#3D3C61]">
      
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