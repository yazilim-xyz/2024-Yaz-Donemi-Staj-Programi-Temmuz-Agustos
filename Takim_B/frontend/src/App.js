import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import ForgotPassword from './pages/ForgotPassword';
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

import MainAdmin from './admin_panel/MainAdmin';
import FirstPage from './pages/FirstPage';
import AdminLoginPage from './pages/AdminLoginPage';
import UpdateProduct from './components/modal/UpdateProductModal';
import AddProduct from './components/AddProduct';
import AdminCategoryPage from './admin_panel/Categories';
import ProductTable from './admin_panel/ProductTable';
import StockTracking from './admin_panel/StockTracking';

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
        <Route path="/admin" element={<MainAdmin darkMode={darkMode}/>} />
        <Route path="/add-product" element={<AddProduct darkMode={darkMode}/>} />
        <Route path="/update-product" element={<UpdateProduct darkMode={darkMode}/>} />
        <Route  path="/categories-admin" element={<AdminCategoryPage darkMode={darkMode}/>} />
        <Route  path="/productTable" element={<ProductTable darkMode={darkMode}/>} />
        <Route  path="/stock-tracking" element={<StockTracking darkMode={darkMode}/>} />
      </Route>


    </Routes>
  );
}

export default App;
