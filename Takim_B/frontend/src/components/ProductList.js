import React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../features/products/productSlice';

const ProductList = () => {
  const products = useSelector(selectProducts);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index} className="border-b py-2">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
