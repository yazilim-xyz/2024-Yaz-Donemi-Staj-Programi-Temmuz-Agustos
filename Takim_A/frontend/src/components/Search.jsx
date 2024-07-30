import React from 'react';
import { FaSearch } from 'react-icons/fa'; // FontAwesome'dan arama ikonu ekleyelim

const Search = () => {
  return (
    <div className='border-b border-gray-500'>
      <div className='searchForm flex items-center p-2.5 bg-[#3D3C61] rounded-lg shadow-md'>
        <FaSearch className='text-gray-400 mr-2' />
        <input 
          type="text" 
          placeholder='Kullanıcı Ara' 
          className='bg-transparent border-b-2 border-blue-500 text-white outline-none placeholder-gray-400 flex-1'
        />
      </div>
      <div className='userChat p-2.5 flex items-center gap-2.5 text-white cursor-pointer hover:bg-[#2f2d52] rounded-lg transition duration-300 ease-in-out transform hover:scale-105 mt-4'>
        <img 
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" 
          src="https://pbs.twimg.com/profile_images/1235250851876352002/zXuZlI2k_400x400.jpg" 
          alt="User" 
        />
        <div className='userChatInfo'>
          <span className='text-sm sm:text-base font-medium'>Busra</span>
        </div>
      </div>
    </div>
  )
}

export default Search;
