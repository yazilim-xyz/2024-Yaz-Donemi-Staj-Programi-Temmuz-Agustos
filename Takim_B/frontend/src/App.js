import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage'; // Düzenlemeyi unutmayın, MainPage içe aktarıldı
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
      <Route path="/register" element={<RegisterPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
      <Route path="/main" element={<MainPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
      <Route path="/categories" element={<CategoryList darkMode={darkMode} />} />
      <Route path="/categories/:categoryName" element={<ProductList darkMode={darkMode} />} />
    </Routes>
  );
}

export default App;
