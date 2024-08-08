// File: /components/Dashboard.js

import React, { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import Categories from './Categories';
import { getTotalProducts, getTotalCategories, getTotalStock } from '../service/dashboardService';
import productIcon from '../assets/images/png/product-icon.png';
import stockIcon from '../assets/images/png/stock-icon.png';
import categoryIcon from '../assets/images/png/category-icon.png';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalStock, setTotalStock] = useState(0);

  useEffect(() => {
    // Set up real-time listeners
    const unsubscribeProducts = getTotalProducts(setTotalProducts);
    const unsubscribeCategories = getTotalCategories(setTotalCategories);
    const unsubscribeStock = getTotalStock(setTotalStock);

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
      unsubscribeStock();
    };
  }, []);

  const handleClick = (page) => {
    setActivePage(page);
  };

  if (activePage) {
    return (
      <div className="p-5">
        {activePage === 'productTable' && <ProductTable />}
        {activePage === 'categories-admin' && <Categories />}
      </div>
    );
  }

  return (
    <div className="p-5 mt-20 flex justify-center">
      <div className="flex flex-wrap justify-center  gap-6">
        {/* Categories Card */}
        <div onClick={() => handleClick('categories-admin')} className="flex-1 min-w-[250px] max-w-[300px] p-6 bg-yellow bg-opacity-90 shadow-md border border-gray-300 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer opacity-90 hover:opacity-100 hover:scale-105 hover:shadow-lg">
          <img src={categoryIcon} className='inset-0 z-0 flex items-center justify-center opacity-20'></img>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Toplam Kategori Sayısı</h2>
            <p className="text-4xl font-bold text-white">{totalCategories}</p>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white font-bold text-lg opacity-0 hover:opacity-100 transition-opacity">
              Gitmek için tıklayın
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div onClick={() => handleClick('productTable')} className="flex-1 min-w-[250px] max-w-[300px] p-6 bg-pink bg-opacity-90 shadow-md border border-gray-300 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer opacity-90 hover:opacity-100 hover:scale-105 hover:shadow-lg">
          <img src={productIcon} className='inset-0 z-0 flex items-center justify-center opacity-20'></img>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Toplam Ürün Sayısı</h2>
            <p className="text-4xl font-bold text-white">{totalProducts}</p>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white font-bold text-lg opacity-0 hover:opacity-100 transition-opacity">
              Gitmek için tıklayın
            </div>
          </div>
        </div>

        {/* Stock Card */}
        <div className="flex-1 min-w-[250px] max-w-[300px] p-6 bg-blue bg-opacity-90 shadow-md border border-gray-300 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer opacity-90 hover:opacity-100 hover:scale-105 hover:shadow-lg">
          <img src={stockIcon} className='inset-0 z-0 flex items-center justify-center opacity-20'></img>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Toplam Stok</h2>
            <p className="text-4xl font-bold text-white">{totalStock}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
