import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const products = [
  { id: 1, name: 'Elma', barcode: '1234567890', price: 5.99, quantity: 100, category: 'Meyve, Sebze' },
  { id: 2, name: 'Süt', barcode: '0987654321', price: 2.99, quantity: 50, category: 'Gıda' },
  { id: 3, name: 'Ekmek', barcode: '1122334455', price: 1.49, quantity: 200, category: 'Gıda' },
  { id: 4, name: 'Peynir', barcode: '2233445566', price: 4.49, quantity: 80, category: 'Süt Ürünleri' },
  { id: 1, name: 'Elma', barcode: '1234567890', price: 5.99, quantity: 100, category: 'Meyve, Sebze' },
  { id: 2, name: 'Süt', barcode: '0987654321', price: 2.99, quantity: 50, category: 'Gıda' },
  { id: 3, name: 'Ekmek', barcode: '1122334455', price: 1.49, quantity: 200, category: 'Gıda' },
  { id: 4, name: 'Peynir', barcode: '2233445566', price: 4.49, quantity: 80, category: 'Süt Ürünleri' },
  { id: 1, name: 'Elma', barcode: '1234567890', price: 5.99, quantity: 100, category: 'Meyve, Sebze' },
  { id: 2, name: 'Süt', barcode: '0987654321', price: 2.99, quantity: 50, category: 'Gıda' },
  { id: 3, name: 'Ekmek', barcode: '1122334455', price: 1.49, quantity: 200, category: 'Gıda' },
  { id: 4, name: 'Peynir', barcode: '2233445566', price: 4.49, quantity: 80, category: 'Süt Ürünleri' },
  { id: 1, name: 'Elma', barcode: '1234567890', price: 5.99, quantity: 100, category: 'Meyve, Sebze' },
  { id: 2, name: 'Süt', barcode: '0987654321', price: 2.99, quantity: 50, category: 'Gıda' },
  { id: 3, name: 'Ekmek', barcode: '1122334455', price: 1.49, quantity: 200, category: 'Gıda' },
  { id: 4, name: 'Peynir', barcode: '2233445566', price: 4.49, quantity: 80, category: 'Süt Ürünleri' },
  
  // Daha fazla ürün ekleyebilirsiniz
];

const ProductTable = ({ onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtreleme fonksiyonu
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode.includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Ürünler</h1>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Ürün adı, kategori adı veya barkod ile ara..."
          className="w-full p-2 pr-10 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="py-3 px-4 sm:px-6 border-b text-left text-xs sm:text-sm md:text-base font-medium">No</th>
              <th className="py-3 px-4 sm:px-6 border-b text-left text-xs sm:text-sm md:text-base font-medium">Ürün Adı</th>
              <th className="py-3 px-4 sm:px-6 border-b text-left text-xs sm:text-sm md:text-base font-medium">Barkod No</th>
              <th className="py-3 px-4 sm:px-6 border-b text-left text-xs sm:text-sm md:text-base font-medium">Kategori</th>
              <th className="py-3 px-4 sm:px-6 border-b text-left text-xs sm:text-sm md:text-base font-medium">Fiyat</th>
              <th className="py-3 px-4 sm:px-6 border-b text-left text-xs sm:text-sm md:text-base font-medium">Adet</th>
              <th className="py-3 px-4 sm:px-6 border-b text-left text-xs sm:text-sm md:text-base font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={product.id} className={`border-b ${index % 2 === 0 ? 'bg-indigo-100' : 'bg-purple-100'} hover:bg-purple-200 transition duration-300`}>
                  <td className="py-2 px-2 sm:py-4 sm:px-6 text-center text-xs sm:text-sm">{index + 1}</td>
                  <td className="py-2 px-2 sm:py-4 sm:px-6 text-xs sm:text-sm">{product.name}</td>
                  <td className="py-2 px-2 sm:py-4 sm:px-6 text-xs sm:text-sm">{product.barcode}</td>
                  <td className="py-2 px-2 sm:py-4 sm:px-6 text-xs sm:text-sm">{product.category}</td>
                  <td className="py-2 px-2 sm:py-4 sm:px-6 text-xs sm:text-sm">${product.price.toFixed(2)}</td>
                  <td className="py-2 px-2 sm:py-4 sm:px-6 text-xs sm:text-sm">{product.quantity}</td>
                  <td className="py-2 px-2 sm:py-4 sm:px-6 flex justify-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
                    <button onClick={() => onEdit(product.id)} className="text-blue-500 hover:text-blue-700 transition duration-300">
                      <FaEdit className="inline-block" />
                    </button>
                    <button onClick={() => onDelete(product.id)} className="text-red-500 hover:text-red-700 transition duration-300">
                      <FaTrash className="inline-block" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 px-2 sm:px-6 text-center text-gray-500 text-xs sm:text-sm">Arama sonucunda ürün bulunamadı</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
