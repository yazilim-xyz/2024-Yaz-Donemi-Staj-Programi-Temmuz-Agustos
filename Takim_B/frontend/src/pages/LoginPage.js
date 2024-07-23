import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Giriş yapma işlemi burada gerçekleştirilecek
    // Başarılı giriş durumunda ana sayfaya yönlendirme
    navigate('/main');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-darkBackground to-primary p-4">
      <img
        src="images/xyz-logo.png"  
        alt="Login Logo"
        className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-cover"
      />
      <form onSubmit={handleLogin} className="p-8 rounded w-full max-w-md ">
        <div className="mb-4 w-full">
          <label className="block text-secondary text-sm md:text-base mb-2">E-Mail</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-secondary p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base"
          />
        </div>
        <div className="mb-6 w-full">
          <label className="block text-secondary text-sm md:text-base mb-2">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-secondary p-3 rounded-3xl w-full bg-lightBackground text-darkBackground text-sm md:text-base"
          />
        </div>
        <a href="/forgot-password" className="mb-8 text-blue-500 text-sm md:text-base hover:underline">
          Şifremi Unuttum
        </a>
      </form>
      <button
          type="submit"
          className="mb-4 bg-button text-lightBackground p-3 rounded-full w-32 hover:bg-secondary text-sm md:text-base"
        >
          Giriş Yap
        </button>
      <a href="/register" className="mb-8 text-lightBackground text-sm md:text-base hover:underline">
          Kayıt Ol
        </a>
    </div>
  );
};

export default LoginPage;
