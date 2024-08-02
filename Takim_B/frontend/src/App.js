import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage'; // Düzenlemeyi unutmayın, MainPage içe aktarıldı
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './components/MainLayout';
import AuthLayout from './components/AuthLayout';

import MainAdmin from './admin_panel/MainAdmin';
import AddProduct from './components/AddProduct';
import FirstPage from './pages/FirstPage';
import AdminLoginPage from './pages/AdminLoginPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<FirstPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
        <Route path="/login" element={<LoginPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
        <Route path="/admin-login" element={<AdminLoginPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
        <Route path="/register" element={<RegisterPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
        <Route path="/forgot-password" element={<ForgotPassword toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route path="/main" element={<MainPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
        <Route path="/categories" element={<CategoryList darkMode={darkMode} />} />
        <Route path="/categories/:categoryName" element={<ProductList darkMode={darkMode} />} />
      </Route>

      <Route path="/admin" element={<MainAdmin />} />
      <Route path="add-product" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
