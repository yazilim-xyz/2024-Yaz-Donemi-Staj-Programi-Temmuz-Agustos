import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const products = [
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
    <div className="p-6 max-w-6xl mt-4 mx-auto bg-gray-50 text-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Ürün Tablosu</h1>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Ürün adı, kategori adı veya barkod ile ara..."
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
        size={20}
      />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">No</th>
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">Ürün Adı</th>
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">Barkod No</th>
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">Kategori</th>
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">Fiyat</th>
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">Adet</th>
              <th className="py-3 px-4 border-b text-xs sm:text-sm md:text-base">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={product.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-gray-300 transition duration-300`}>
                  <td className="py-2 px-4 text-center text-xs sm:text-sm md:text-base">{index + 1}</td>
                  <td className="py-2 px-4 text-xs sm:text-sm md:text-base">{product.name}</td>
                  <td className="py-2 px-4 text-xs sm:text-sm md:text-base">{product.barcode}</td>
                  <td className="py-2 px-4 text-xs sm:text-sm md:text-base">{product.category}</td>
                  <td className="py-2 px-4 text-xs sm:text-sm md:text-base">${product.price.toFixed(2)}</td>
                  <td className="py-2 px-4 text-xs sm:text-sm md:text-base">{product.quantity}</td>
                  <td className="py-2 px-4 flex justify-center space-x-4 text-xs sm:text-sm md:text-base">
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
                <td colSpan="7" className="py-4 px-4 text-center text-gray-500 text-xs sm:text-sm md:text-base">Arama sonucunda ürün bulunamadı</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
