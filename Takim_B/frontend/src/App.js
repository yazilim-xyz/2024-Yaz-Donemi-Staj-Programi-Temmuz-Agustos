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
import lightModeIcon from './assets/images/light.png';
import darkModeIcon from './assets/images/dark.png';
import user from './assets/images/person.png';
import username from './pages/LoginPage'
import { useNavigate } from 'react-router-dom'; // React Router kullanıyorsanız

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
          className="object-cover h-full w-full"
        />
      </button>
     </div>
    );
  };

  return (
    <div className={`absolute w-full h-screen container mx-auto mb-10 ${darkMode ? 'dark-gradient ' : ' light-gradient'}`}>
      <nav className='fixed flex right-10 space-x-8'>
      <div className='flex item-center mt-4 user_profile'> <img
        src={user}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <p className="font-semibold">{username}DENEME İSİM</p>
        <p className="text-log_in cursor-pointer" onClick={handleLogout}>Değiştir</p>
      </div></div>
      <ToggleButton></ToggleButton>
      </nav>
     
      <div className="mt-24 grid grid-cols-12 gap-4">
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
          />}/>
          <Route path="/main" element={<MainPage />} />
        </Routes>
  );
}

export default App;

