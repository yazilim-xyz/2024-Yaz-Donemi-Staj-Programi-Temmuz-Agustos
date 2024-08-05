import React, { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import Categories from './Categories';
import { getTotalProducts, getTotalCategories } from '../service/dashboardService';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    // Set up real-time listeners
    const unsubscribeProducts = getTotalProducts(setTotalProducts);
    const unsubscribeCategories = getTotalCategories(setTotalCategories);

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
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
    <div className="p-5">
      <div className="flex flex-wrap justify-center gap-6">
        {/* Categories Card */}
        <div onClick={() => handleClick('categories-admin')} className="flex-1 min-w-[250px] max-w-[300px] p-6 bg-yellow bg-opacity-90 shadow-md border border-gray-300 rounded-lg">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Toplam Kategori Sayısı</h2>
            <p className="text-4xl font-bold text-white">{totalCategories}</p>
          </div>
        </div>

        {/* Products Card */}
        <div onClick={() => handleClick('productTable')} className="flex-1 min-w-[250px] max-w-[300px] p-6 bg-pink bg-opacity-90 shadow-md border border-gray-300 rounded-lg">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Toplam Ürün Sayısı</h2>
            <p className="text-4xl font-bold text-white">{totalProducts}</p>
          </div>
        </div>

        {/* Additional Card */}
        <div className="flex-1 min-w-[250px] max-w-[300px] p-6 bg-blue bg-opacity-90 shadow-md border border-gray-300 rounded-lg">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Biten Ürünler</h2>
            <p className="text-4xl font-bold text-red-500">Henüz yapılmadı :(</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
