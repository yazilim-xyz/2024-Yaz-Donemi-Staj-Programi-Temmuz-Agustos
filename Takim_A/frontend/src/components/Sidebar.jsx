import React from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

const Sidebar = () => {
  return (
    <div className="flex flex-col lg:w-1/4 md:w-1/3 sm:w-1/2 w-full border-r border-gray-300 bg-[#292C6D] p-4 overflow-y-auto">
      <div className="flex-grow">
        <Navbar />
        <Search />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
      </div>
      {/*<div className="bg-cyan-900 rounded mt-auto ">
        deneme
      </div>*/}
    </div>
  );
};

export default Sidebar;
