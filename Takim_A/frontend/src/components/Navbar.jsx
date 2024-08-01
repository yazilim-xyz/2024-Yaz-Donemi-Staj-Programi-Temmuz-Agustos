import React, { useState } from 'react';
import GroupCreateModal from './GroupCreateModal'; // Modal bileşenini import ediyoruz
import { useNavigate, Link } from 'react-router-dom';
import { FaUsers, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Modal durumu

  const LogoutClick = () => {
    navigate('/');
  };

  const handleCreateGroupClick = () => {
    setModalOpen(true); // Modal'i aç
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='flex items-center justify-between bg-[#3955b0] h-[60px] px-4 sm:px-6 md:px-10 lg:px-12  text-white shadow-lg rounded'>
      <span className='text-lg sm:text-xl font-bold text-left m-2'>WorkChat</span>
      <div className='flex items-center gap-2 sm:gap-4 relative '>
        <div className='flex items-center gap-2'> 
          <div onClick={toggleMenu} className='flex items-center cursor-pointer'>
            <FaUsers style={{ color: 'white', fontSize: '20px', sm: '24px' }} className="cursor-pointer hover:text-white transition duration-300" />
            <FaChevronDown style={{fontSize:'20px',sm:'24px'}} className={`ml-1 text-gray-300 text-sm transition-transform duration-300 ${menuOpen ?'rotate-180' : ''}` } />
          </div>
          {menuOpen && (
            <div className='absolute top-full right-0 mt-2 bg-white text-black rounded-lg shadow-lg z-10'>
              <button onClick={handleCreateGroupClick} className='block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left rounded-lg'>
                Grup Oluştur
              </button>
              <Link to="/groups">
                <button className='block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left rounded-lg'>
                  Grupları Göster
                </button>
              </Link>
            </div>
          )}
        </div>
        <button onClick={LogoutClick} className='bg-[#5F8DD3] text-xs sm:text-sm cursor-pointer text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg shadow-md hover:bg-[#800000] hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out transform'>
          Çıkış
        </button>
      </div>
      <GroupCreateModal isOpen={modalOpen} onClose={() => setModalOpen(false)} /> {/* Modal'i çağırıyoruz */}
    </div>
  );
};

export default Navbar;
