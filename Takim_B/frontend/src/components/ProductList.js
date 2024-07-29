import React from 'react';

const products = {
  'All': [
    { id: 1, name: 'Product 1', price: 29 },
    { id: 2, name: 'Product 2', price: 39 },
    { id: 3, name: 'Product 2', price: 39 },
    { id: 4, name: 'Product 2', price: 39 },
    { id: 5, name: 'Product 2', price: 39 },
    { id: 6, name: 'Product 2', price: 39 },
    { id: 7, name: 'Product 2', price: 39 },


    
  ],
  'Meyve, Sebze': [
    { id: 3, name: 'Apple', price: 5 },
    { id: 4, name: 'Banana', price: 2 },
  ],
  'Et, Şarküteri': [
    { id: 5, name: 'Beef', price: 50 },
    { id: 6, name: 'Chicken', price: 30 },
  ],
};

const ProductList = ({category, darkMode }) => {
  const selectedProducts = products[category] || [];


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
