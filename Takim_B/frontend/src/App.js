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

function MainPage() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`container mx-auto ${darkMode ? 'dark' : ''}`}>
      <button
        onClick={toggleDarkMode}
        className="bg-gray-800 text-white p-2 rounded mb-4"
      >
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <div className="grid grid-cols-12 gap-4">
        {/* Barkodla Sepet İşlemleri - Sol Taraf */}
        <div className="col-span-3 space-y-4">
          <BarcodeInput />
          <ActionButtons />
        </div>
        {/* Ürün Listesi - Orta */}
        <div className="col-span-6 space-y-4">
          <ProductList />
          <TotalAmount />
        </div>
        {/* Kategori Listesi - Sağ Taraf */}
        <div className="col-span-3">
          <CategoryList />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
