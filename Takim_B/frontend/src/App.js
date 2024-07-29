import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import TotalAmount from './components/TotalAmount';
import BarcodeInput from './components/BarcodeInput';
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
import CardPage from './components/CardPage';

function MainPage() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(darkMode => !darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const ToggleButton = () => {
    return (
      <button
        onClick={toggleDarkMode}
        className="w-16 h-16 rounded-full bg-transparent flex items-center justify-center overflow-hidden z-50"
      >
        <img
          src={darkMode ? darkModeIcon : lightModeIcon}
          alt="Toggle Dark Mode"
          className="object-cover h-full w-full"
        />
      </button>
    );
  };

  return (
    <div className={`w-full h-screen ${darkMode ? 'dark-gradient' : 'light-gradient'}`}>
      <nav className='fixed top-0 left-0 w-full flex justify-between items-center p-4'>
        <div className='flex items-center'>
          <img
            src={user}
            className={`w-12 h-12 rounded-full object-cover border-2 border-black ${darkMode ? 'filter invert' : ''}`}
          />
          <div className={`ml-2 ${darkMode ? 'text-white' : ''}`}>
            <p className="font-semibold">DENEME İSİM</p>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <img
            src={logout}
            alt='Çıkış yap'
            className={`w-7 h-7 rounded-full object-cover cursor-pointer ${darkMode ? 'filter invert' : ''}`}
            onClick={handleLogout}
          />
          <ToggleButton />
        </div>
      </nav>
      <div className="pt-20 px-4 grid grid-cols-12 gap-4">
        <div className="col-span-3 space-y-4 ">
          <div className={`rounded-t-3xl ${darkMode ? 'bg-dark_Background_ctgry' : 'bg-light_div'}`}>
            <div className="bg-white p-4 rounded-3xl shadow-lg flex flex-col space-y-4">
              <CardPage />
              <div className="flex flex-wrap items-center space-x-2 mt-2">
                <ActionButtons />
                <TotalAmount />
              </div>
            </div>
            <BarcodeInput />
          </div>
        </div>
        <div className="col-span-6 space-y-4">
          <ProductList darkMode={darkMode}/>

        </div>
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

