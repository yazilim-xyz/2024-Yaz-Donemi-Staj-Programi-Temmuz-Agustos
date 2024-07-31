import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../service/firebase"
import lightModeIcon from '../assets/images/png/light.png';
import darkModeIcon from '../assets/images/png/dark.png';
import xyzLogo from '../assets/images/png/xyz-logo.png';

const RegisterPage = ({ toggleDarkMode, darkMode }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  

  const handleRegister = useCallback(
    (e) =>{
    e.preventDefault();

    if(!email || !password){
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('Kayıt Başarılı')
      navigate("/login")
    })
    .catch(e => {
      console.log(e);
    }) 
  }, [email, password])

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-darkBackground to-primary p-4 ${darkMode ? 'dark-gradient' : 'light-gradient'}`}>
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
        alt="Register Logo"
        className="object-contain mb-8"
      />
      <form onSubmit={handleRegister} className="p-8 rounded w-full max-w-md">
        <div className="mb-4 w-full">
          <label className={`block text-sm md:text-base mb-2 ${darkMode ? 'text-secondary' : 'text-text_lgn'}`}>Kullanıcı Adı</label>
          <input
            type="text"
            value={username}
            placeholder="Kullanıcı adınızı girin"
            onChange={(e) => setUsername(e.target.value)}
            className="border border-secondary p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base"
          />
        </div>
        <div className="mb-6 w-full">
          <label className={`block text-sm md:text-base mb-2 ${darkMode ? 'text-secondary' : 'text-text_lgn'}`}>E-Mail</label>
          <input
            type="email"
            value={email}
            placeholder="E-Mail adresinizi girin"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-secondary p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base"
          />
        </div>
        <div className="mb-4 w-full">
          <label className={`block text-sm md:text-base mb-2 ${darkMode ? 'text-secondary' : 'text-text_lgn'}`}>Şifre</label>
          <input
            type="password"
            value={password}
            placeholder="Şifrenizi girin"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-secondary p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base"
          />
        </div>
        <div className="mb-6 w-full">
          <label className={`block text-sm md:text-base mb-2 ${darkMode ? 'text-secondary' : 'text-text_lgn'}`}>Şifre Tekrar</label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Şifrenizi tekrar girin"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-secondary p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base"
          />
        </div>
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="mb-4 bg-button text-lightBackground p-3 rounded w-32 hover:bg-buttonHover text-sm md:text-base"
            onClick={handleRegister}>
            Kayıt Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;