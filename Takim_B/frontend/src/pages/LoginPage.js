import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lightModeIcon from '../assets/images/png/light.png';
import darkModeIcon from '../assets/images/png/dark.png';
import xyzLogo from '../assets/images/png/xyz-logo.png';


const LoginPage = ({toggleDarkMode, darkMode}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/main');
  };

  return (
    <div className={`flex flex-col items-center justify-center  absolute w-full h-screen  bg-gradient-to-r from-darkBackground to-primary p-4 ${darkMode ? 'dark-gradient ' : ' light-gradient'}`}>
        <toggleDarkMode />
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 w-20 h-20 rounded-full bg-transparent flex items-center justify-center overflow-hidden z-50"
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
        className="object-contain"
      />
      <form onSubmit={handleLogin} className="p-8 rounded w-full max-w-md ">
        <div className="mb-4 w-full">
          <label className={`block  text-sm md:text-base mb-2 ${darkMode ? 'text-secondary ' : 'text-text_lgn'}`}>E-Mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-secondary p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base"
          />
        </div>
        <div className="mb-6 w-full">
          <label className={`block  text-sm md:text-base mb-2 ${darkMode ? 'text-secondary ' : 'text-text_lgn'}`}>Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-secondary p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base"
          />
        </div>
        <a href="/forgot-password" className={`mb-8 text-sm md:text-base hover:underline ${darkMode ? 'text-white ' : 'text-black'}`}>
          Şifremi Unuttum
        </a>
      </form>
      <button
          type="submit"
          className="mb-4 bg-button text-lightBackground p-3 rounded w-32 hover:bg-secondary text-sm md:text-base"
          onClick={handleLogin}
        >
          Giriş Yap
        </button>
      <a href="/register" className="mb-8 text-lgn_kyt text-sm md:text-base hover:underline">
          Kayıt Oluştur
        </a>
    </div>
  );
};

export default LoginPage;
