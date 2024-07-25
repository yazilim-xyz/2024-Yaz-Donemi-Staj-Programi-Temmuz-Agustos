import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import store from './app/store';
import ProductList from './components/ProductList';
import TotalAmount from './components/TotalAmount';
import BarcodeInput from './components/BarcodeInput';
import Keypad from './components/KeyPad';
import CategoryList from './components/CategoryList';
import ActionButtons from './components/ActionButton';
import LoginPage from './pages/LoginPage';
import lightModeIcon from './assets/images/png/light.png';
import darkModeIcon from './assets/images/png/dark.png';
import user from './assets/images/png/person.png';
import username from './pages/LoginPage'
import { useNavigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import logout from './assets/images/svg/logout.svg';

function MainPage() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(darkMode => !darkMode);
  };
  const handleLogout = () => {
    // Oturumdan çıkış işlemleri
    // Örneğin, token'ı kaldırmak
    localStorage.removeItem('authToken'); // Örneğin, token'ı yerel depolamadan kaldırmak

    // Yönlendirme işlemi
    navigate('/login'); // Login sayfasına yönlendirme
  };

  const navigate = useNavigate();

  const ToggleButton = () => {
    return (
      <div>
        <toggleDarkMode />
        <button
          onClick={toggleDarkMode}
          className=" w-20 m-b-2 h-20 rounded-full bg-transparant flex items-center justify-center overflow-hidden z-50"
        >
          <img
            src={darkMode ? darkModeIcon : lightModeIcon}
            alt="Toggle Dark Mode"
            className="object-cover h-full w-full"
          />
        </button>
      </div>
    );
  };

  return (
    <div className={`w-full h-screen ${darkMode ? 'dark-gradient ' : ' light-gradient'}`}>
      <nav className='fixed top-1 right-4 flex items-center space-x-4'>
        <div className='flex item-center user_profile'>
          <img
            src={user}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className='ml-2'>
            <p className="font-semibold">{username}DENEME İSİM</p>
            {/* <p className="text-log_out cursor-pointer" onClick={handleLogout}>Değiştir</p> */}
            <div>
              <img
                src={logout}
                alt='çıkış yap'
                className='w-7 h-7 rounded-full object-cover'
                onClick={handleLogout}
              />
            </div>
          </div></div>
        <ToggleButton></ToggleButton>
      </nav>
      <div className="pt-20 px-4  grid grid-cols-12 gap-4">
        {/* Barkodla Sepet İşlemleri - Sol Taraf */}
        <div className="col-span-3 space-y-4">
          <BarcodeInput />
          <Keypad />
          <ActionButtons />
        </div>
        {/* Ürün Listesi - Orta */}
        <div className="col-span-6 space-y-4">
          <ProductList />
          <TotalAmount />
        </div>
        {/* Kategori Listesi - Sağ Taraf */}
        <div className="col-span-3">
          <CategoryList darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(darkMode => !darkMode);
  };
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        darkModeIcon={darkModeIcon}
        lightModeIcon={lightModeIcon}
      />} />
      <Route path="/register" element={<RegisterPage
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        darkModeIcon={darkModeIcon}
        lightModeIcon={lightModeIcon}
      />
      } />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
}

export default App;

