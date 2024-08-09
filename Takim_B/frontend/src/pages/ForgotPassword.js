import React, { useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import { resetPassword } from '../service/authService';
import lightModeIcon from '../assets/images/png/light.png';
import darkModeIcon from '../assets/images/png/dark.png';

const ForgotPassword = ({ toggleDarkMode, darkMode }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!email) {
        return;
      }

      resetPassword(email)
        .then(() => {
          alert("Size şifre sıfırlama e-postası gönderdik");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [email]
  );

  return (
    <div className={`flex flex-col items-center justify-center absolute w-full h-screen bg-gradient-to-r from-darkBackground to-primary p-4 ${darkMode ? 'dark-gradient' : 'light-gradient'}`}>
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 w-20 h-20 rounded-full bg-transparent flex items-center justify-center overflow-hidden z-50">
        <img
          src={darkMode ? darkModeIcon : lightModeIcon}
          alt="Toggle Icon"
          className="object-cover h-full w-full" />
      </button>
      <h1 className={` text-2xl ${darkMode ? 'text-white' : 'text-black'}`}>Şifremi Unuttum</h1>
      <form onSubmit={handleSubmit} className="p-8 rounded w-full max-w-md">
        <input
          type="email"
          placeholder="Email adresinizi giriniz"
          className="border border-secondary p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <div className="flex justify-center w-full p-8">
          <button
            type="submit"
            className="mb-4 bg-button text-lightBackground p-3 rounded w-32 hover:bg-buttonHover text-sm md:text-base">
            Gönder
          </button>
        </div>
        <Link to="/login" className={` mb-4 text-sm md:text-base hover:underline ${darkMode ? 'text-white' : 'text-black'}`}>
          Geri dön
        </Link>
      </form>
    </div>
  );
}

export default ForgotPassword;
