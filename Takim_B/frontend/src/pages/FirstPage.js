import React from 'react';
import { useNavigate } from 'react-router-dom';
import lightModeIcon from '../assets/images/png/light.png';
import darkModeIcon from '../assets/images/png/dark.png';
import xyzLogo from '../assets/images/png/xyz-logo.png';

const FirstPage = ({ toggleDarkMode, darkMode }) => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  const handlePersonnelLogin = () => {
    navigate('/login');
  };

  return (
    <div className={`flex flex-col items-center justify-center absolute w-full h-screen bg-gradient-to-r from-darkBackground to-primary p-4 ${darkMode ? 'dark-gradient' : 'light-gradient'}`}>
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 w-20 h-20 rounded-full bg-transparent flex items-center justify-center overflow-hidden z-50 "
      >
        <img
          src={darkMode ? darkModeIcon : lightModeIcon}
          alt="Toggle Icon"
          className="object-cover h-full w-full"
        />
      </button>
      <img
        src={xyzLogo}
        alt="Login Logo"
        className="w-84 h-72 object-contain mb-4"
      />
      <div className="flex space-x-4">
        <button
          onClick={handleAdminLogin}
          className="px-8 py-4 bg-orange-500 text-white rounded hover:bg-orange-700 hover:scale-105"
        >
          Yönetici Giriş
        </button>
        <button
          onClick={handlePersonnelLogin}
          className="px-8 py-4 bg-orange-500 text-white rounded hover:bg-orange-700 hover:scale-105"
        >
          Personel Giriş
        </button>
      </div>
    </div>
  );
};

export default FirstPage;
