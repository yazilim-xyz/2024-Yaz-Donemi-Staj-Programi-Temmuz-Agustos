import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerWithEmail } from '../service/authService';
import lightModeIcon from '../assets/images/png/light.png';
import darkModeIcon from '../assets/images/png/dark.png';
import xyzLogo from '../assets/images/png/xyz-logo.png';

const RegisterPage = ({ toggleDarkMode, darkMode }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleRegister = useCallback(
    (e) => {
      e.preventDefault();

      let hasError = false;
      const newErrors = { username: '', email: '', password: '', confirmPassword: '' };

      if (!email) {
        newErrors.email = 'Bu alan boş bırakılamaz';
        hasError = true;
      }

      if (!password) {
        newErrors.password = 'Bu alan boş bırakılamaz';
        hasError = true;
      }

      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Şifreler uyuşmuyor';
        hasError = true;
      }

      const passwordPattern = /(?=.*[0-9].*[0-9].*[0-9].*[0-9].*[0-9].*[0-9])/;
      if (!passwordPattern.test(password)) {
        newErrors.password = 'Şifre en az 6 rakam içermelidir.';
        hasError = true;
      }

      if (!username) {
        newErrors.username = 'Bu alan boş bırakılamaz';
        hasError = true;
      }

      if (hasError) {
        setErrors(newErrors);
        return;
      }

      setErrors({ username: '', email: '', password: '', confirmPassword: '' });
      registerWithEmail(email, password, username)
        .then(() => {
          navigate('/login');
        })
        .catch(e => {
          console.log(e);
          setErrors({ ...errors, email: 'Kayıt oluşturulurken bir hata oluştu.' });
        });
    },
    [username, email, password, confirmPassword, navigate, errors]
  );

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-darkBackground to-primary p-4 ${darkMode ? 'dark-gradient' : 'light-gradient'} transition-all duration-300 ease-in-out`}>
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
        <div className="mb-4 w-full relative">
          <label className={`block text-sm md:text-base mb-2 ${darkMode ? 'text-secondary' : 'text-text_lgn'} transition-all duration-300 ease-in-out`}>Kullanıcı Adı</label>
          <input
            type="text"
            value={username}
            placeholder="Kullanıcı adınızı girin"
            onChange={(e) => setUsername(e.target.value)}
            className={`border ${errors.username ? 'border-red-500' : 'border-secondary'} p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base transition-all duration-300 ease-in-out`}
          />
          {errors.username && (
            <div className="absolute right-0 top-full mt-1 text-red-600 text-sm bg-white p-2 rounded-lg shadow-lg border border-red-600">
              {errors.username}
            </div>
          )}
        </div>
        <div className="mb-6 w-full relative">
          <label className={`block text-sm md:text-base mb-2 ${darkMode ? 'text-secondary' : 'text-text_lgn'} transition-all duration-300 ease-in-out`}>E-Mail</label>
          <input
            type="email"
            value={email}
            placeholder="E-Mail adresinizi girin"
            onChange={(e) => setEmail(e.target.value)}
            className={`border ${errors.email ? 'border-red-500' : 'border-secondary'} p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base transition-all duration-300 ease-in-out`}
          />
          {errors.email && (
            <div className="absolute right-0 top-full mt-1 text-red-600 text-sm bg-white p-2 rounded-lg shadow-lg border border-red-600">
              {errors.email}
            </div>
          )}
        </div>
        <div className="mb-4 w-full relative">
          <label className={`block text-sm md:text-base mb-2 ${darkMode ? 'text-secondary' : 'text-text_lgn'} transition-all duration-300 ease-in-out`}>Şifre</label>
          <input
            type="password"
            value={password}
            placeholder="Şifrenizi girin"
            onChange={(e) => setPassword(e.target.value)}
            className={`border ${errors.password ? 'border-red-500' : 'border-secondary'} p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base transition-all duration-300 ease-in-out`}
          />
          {errors.password && (
            <div className="absolute right-0 top-full mt-1 text-red-600 text-sm bg-white p-2 rounded-lg shadow-lg border border-red-600">
              {errors.password}
            </div>
          )}
        </div>
        <div className="mb-6 w-full relative">
          <label className={`block text-sm md:text-base mb-2 ${darkMode ? 'text-secondary' : 'text-text_lgn'} transition-all duration-300 ease-in-out`}>Şifre Tekrar</label>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Şifrenizi tekrar girin"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`border ${errors.confirmPassword ? 'border-red-500' : 'border-secondary'} p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base`}
          />
          {errors.confirmPassword && (
            <div className="absolute right-0 top-full mt-1 text-red-600 text-sm bg-white p-2 rounded-lg shadow-lg border border-red-600">
              {errors.confirmPassword}
            </div>
          )}
        </div>
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="mb-4 bg-button text-lightBackground p-3 rounded w-32 hover:bg-buttonHover text-sm md:text-base hover:scale-105"
          >
            Kayıt Oluştur
          </button>
        </div>
        <Link to="/login" className="flex justify-center block text-lgn_kyt text-sm md:text-base hover:underline">Hesabım var mı? Giriş Yap</Link>
      </form>
    </div>
  );
};

export default RegisterPage;
