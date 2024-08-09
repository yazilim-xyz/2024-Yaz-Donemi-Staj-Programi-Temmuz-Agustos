import React, { useState, useEffect } from 'react';
import { fetchOutOfStockProducts } from '../service/productService';
import {fetchCategories} from '../service/categoryService';
import Loading from '../components/Loading';
import { FaTimes } from 'react-icons/fa';

const StockTracking = ({ darkMode }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const [productList, categoryList] = await Promise.all([fetchOutOfStockProducts(), fetchCategories()]);
        setProducts(productList);
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Verileri getirirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .filter(product => product.productName.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center p-6 text-red-600">{error}</div>;
  }

  return (
    <div className={`mt-12 p-6 max-w-6xl mx-auto`}>
      <h1 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Stokta Olmayan Ürünler</h1>

      <div className="relative mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Ürün Ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full md:w-2/3 lg:w-1/2 p-2 pl-10 rounded-lg border border-gray-300`}
        />
      </div>

      <div className="mb-6 flex flex-wrap justify-center space-x-2 md:space-x-4">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg ${selectedCategory === 'all' ? 'bg-gray-300' : 'bg-gray-200'} hover:bg-gray-300 transform transition-transform duration-300 ease-in-out hover:scale-105`}
        >
          Tüm Kategoriler
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 rounded-lg ${selectedCategory === category.name ? 'bg-gray-300' : 'bg-gray-200'} hover:bg-gray-300 transform transition-transform duration-300 ease-in-out hover:scale-105`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-700">Stokta olmayan ürün bulunmamaktadır.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className={`relative p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border-gray-800' : 'bg-white border-white'} ${darkMode ? 'text-white' : 'text-gray-800'} transform transition-transform duration-300 ease-in-out hover:scale-105`}>
              <h2 className="text-xl font-semibold">{product.productName}</h2>
              <p className="text-md">Barkod: {product.barcodeId}</p>
              <p className="text-md">Kategori: {product.category}</p>
              <p className="text-md">Fiyat: {product.price}₺</p>
              <p className="text-md">Stok: {product.quantity}</p>
              <FaTimes className="absolute bottom-4 right-4 text-red-800" size={32} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockTracking;
