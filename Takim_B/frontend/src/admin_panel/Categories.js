import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";

const categories = [
  { id: 1, name: 'Meyve, Sebze' },
  { id: 2, name: 'Et, Şarküteri' },
  { id: 3, name: 'Atıştırmalık' },
  { id: 4, name: 'Kuruyemiş' },
  { id: 5, name: 'İçecekler' },
  { id: 6, name: 'Glutensiz Ürünler' },
  { id: 7, name: 'Kahvaltılık Ürünler' },
  { id: 8, name: 'Sağlık, Bakım' },
  { id: 9, name: 'Temizlik' },
  { id: 10, name: 'Glutensiz Ürünler' },
  { id: 11, name: 'Kahvaltılık Ürünler' },
  { id: 12, name: 'Sağlık, Bakım' },
  { id: 13, name: 'Temizlik' },
];

const CategoryTable = ({ onEdit, onDelete }) => {
  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 text-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Kategoriler</h1>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div key={category.id} className={`border border-gray-300 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-gray-300 transition duration-300 p-4 rounded-lg`}>
              <div className="flex justify-between items-center">
                <span className="font-bold">{index + 1}</span>
                <span className="flex-1 text-center">{category.name}</span>
                <div className="flex space-x-4">
                  <button onClick={() => onEdit(category.id)} className="text-blue-500 hover:text-blue-700 transition duration-300">
                    <FaEdit className="inline-block" />
                  </button>
                  <button onClick={() => onDelete(category.id)} className="text-red-500 hover:text-red-700 transition duration-300">
                    <FaTrash className="inline-block" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;







/*import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";

const categories = [
  { id: 1, name: 'Meyve, Sebze' },
  { id: 2, name: 'Et, Şarküteri' },
  { id: 3, name: 'Atıştırmalık' },
  { id: 4, name: 'Kuruyemiş' },
  { id: 5, name: 'İçecekler' },
  { id: 6, name: 'Glutensiz Ürünler' },
  { id: 7, name: 'Kahvaltılık Ürünler' },
  { id: 8, name: 'Sağlık, Bakım' },
  { id: 9, name: 'Temizlik' },
  
];

const CategoryTable = ({ onEdit, onDelete }) => {
  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Kategori Tablosu</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="py-3 px-6 border-b">No</th>
              <th className="py-3 px-6 border-b">Kategori</th>
              <th className="py-3 px-6 border-b">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id} className={`border-b ${index % 2 === 0 ? 'bg-indigo-100' : 'bg-purple-100'} hover:bg-purple-200 transition duration-300`}>
                <td className="py-4 px-6 text-center">{index + 1}</td>
                <td className="py-4 px-6">{category.name}</td>
                <td className="py-4 px-6 flex justify-center space-x-6">
                  <button onClick={() => onEdit(category.id)} className="text-blue-500 hover:text-blue-700 transition duration-300">
                    <FaEdit className="inline-block" />
                  </button>
                  <button onClick={() => onDelete(category.id)} className="text-red-500 hover:text-red-700 transition duration-300">
                    <FaTrash className="inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;
 */