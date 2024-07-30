import React from 'react';
import GroupChat from './GroupChat';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const LogoutClick = () => {
    navigate('/'); // 'login' sayfasına yönlendirme
  };

  const CreateGroupClick = () => {
    navigate('/GroupChat'); // GroupChat sayfasına yönlendirme
  };

  return (
    <div className='flex items-center bg-[#3955b0] h-[60px] px-4 sm:px-6 md:px-10 lg:px-12 justify-between font-sans text-white shadow-lg'>
      <span className='text-lg sm:text-xl font-bold'>WorkChat</span>
      <div className='flex items-center gap-2 sm:gap-4'>
        <FaUsers 
          style={{ color: 'gray', fontSize: '20px', sm: '24px' }} 
          className="cursor-pointer hover:text-white transition duration-300" 
          onClick={CreateGroupClick}
        />
        <span className='text-sm sm:text-md font-medium'>Busra</span>
        <button 
          onClick={LogoutClick}  
          className='bg-[#5F8DD3] text-xs sm:text-sm cursor-pointer text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg shadow-md hover:bg-[#800000] hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out transform'
        >
          Çıkış
        </button>
      </div>
    </div>
  )
}

export default Navbar;
