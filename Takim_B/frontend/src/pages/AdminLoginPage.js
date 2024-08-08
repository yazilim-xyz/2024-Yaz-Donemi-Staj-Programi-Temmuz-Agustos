import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../service/firebase";
import lightModeIcon from '../assets/images/png/light.png';
import darkModeIcon from '../assets/images/png/dark.png';
import xyzLogo from '../assets/images/png/xyz-logo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLoginPage = ({ toggleDarkMode, darkMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();

      let hasError = false;
      const newErrors = { email: '', password: '' };

      if (!email) {
        newErrors.email = 'Bu alan boş bırakılamaz';
        hasError = true;
      }

      if (!password) {
        newErrors.password = 'Bu alan boş bırakılamaz';
        hasError = true;
      }

      if (hasError) {
        setErrors(newErrors);
        return;
      }

      setErrors({ email: '', password: '' });
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success('Giriş başarılı!');
          navigate('/admin');
        })
        .catch((error) => {
          console.error(error);
          toast.error('E-Posta veya Şifre yanlış!');
        });
    },
    [email, password, navigate]
  );

  return (
    <div className={`flex flex-col items-center justify-center absolute w-full h-screen bg-gradient-to-r from-darkBackground to-primary p-4 ${darkMode ? 'dark-gradient' : 'light-gradient'}`}>
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
      <form onSubmit={handleLogin} className="p-8 rounded w-full max-w-md">
        <div className="mb-4 w-full relative">
          <label className={`block text-sm md:text-base mb-2 ${darkMode ? 'text-secondary' : 'text-text_lgn'}`}>E-Mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail adresinizi girin"
            className={`border ${errors.email ? 'border-red-500' : 'border-secondary'} p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base`}
          />
          {errors.email && (
            <div className="absolute right-0 top-full mt-1 text-red-600 text-sm bg-white p-3 rounded-lg shadow-lg border border-red-600">
              {errors.email}
            </div>
          )}
        </div>
        <div className="mb-6 w-full relative">
          <label className={`block text-sm md:text-base mb-2 ${darkMode ? 'text-secondary' : 'text-text_lgn'}`}>Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifrenizi girin"
            className={`border ${errors.password ? 'border-red-500' : 'border-secondary'} p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base`}
          />
          {errors.password && (
            <div className="absolute right-0 top-full mt-1 text-red-600 text-sm bg-white p-3 rounded-lg shadow-lg border border-red-600">
              {errors.password}
            </div>
          )}
        </div>
        <Link to="/forgot-password" className={`block mb-8 text-sm md:text-base hover:underline ${darkMode ? 'text-white' : 'text-black'}`}>
          Şifremi Unuttum
        </Link>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mb-4 bg-button text-lightBackground p-3 rounded w-32 hover:bg-buttonHover text-sm md:text-base"
          >
            Giriş Yap
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AdminLoginPage;
