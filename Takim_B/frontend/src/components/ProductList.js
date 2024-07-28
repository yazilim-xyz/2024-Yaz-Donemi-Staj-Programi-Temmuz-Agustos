import React from 'react';

const ProductList = ({ darkMode }) => {
  const products = [
    { name: 'Product 1', price: 29, imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Product 2', price: 39, imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Product 3', price: 49.99, imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Product 4', price: 59, imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Product 5', price: 69.99, imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Product 6', price: 79, imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Product 7', price: 59, imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Product 8', price: 69, imageUrl: 'https://via.placeholder.com/150' },
    { name: 'Product 9', price: 79.99, imageUrl: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className={`p-4 rounded shadow max-h-[calc(100vh-8rem)] overflow-y-auto ${darkMode ? 'bg-primary' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Kategoriler</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className={`border p-4 rounded shadow-sm ${darkMode ? 'bg-white text-black' : 'bg-primary text-white'}`}>
            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
            <h3 className="font-semibold">{product.name}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
