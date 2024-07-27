import React from 'react';
import GroupChat from './GroupChat';
import { useNavigate } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa'; // Grup oluşturma simgesi için react-icons'dan FaUsers ikonunu ekleyelim

const Navbar = () => {
  const navigate = useNavigate(); 

  const LogoutClick = () => {
    navigate('/'); // 'login' sayfasına yönlendirme
  };

  const CreateGroupClick = () => {
    navigate('/GroupChat'); // GroupChat sayfasına yönlendirme
  };

  return (
    <div className='flex items-center bg-[#3955b0] h-[60px] px-10 justify-between font-sans text-white shadow-lg'>
      <span className='text-xl font-bold '>WorkChat</span>
      <div className=' ml-2 flex items-center gap-4'>
      <FaUsers 
      style={{ color: 'gray', fontSize: '24px' }} 
      className="cursor-pointer hover:text-white transition duration-300" 
      onClick={CreateGroupClick}
      />

        <span className='text-md font-medium'>Busra</span>
        <button 
          onClick={LogoutClick}  
          className='bg-[#5F8DD3] text-sm cursor-pointer text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#800000] hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out transform'
        >
          Çıkış
        </button>
      </div>
    </div>
  )
}

export default Navbar;
