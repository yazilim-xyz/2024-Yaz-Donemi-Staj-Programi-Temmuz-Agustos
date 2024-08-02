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
];

const CategoryTable = ({ onEdit, onDelete }) => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Kategori Tablosu</h1>
      <div className="overflow-x-auto">
        <div className="max-h-[600px] overflow-y-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-3 px-6 border-b">No</th>
                <th className="py-3 px-6 border-b">Kategori</th>
                <th className="py-3 px-6 border-b">İşlemler (Düzenle/Sil)</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{category.name}</td>
                  <td className="py-3 px-6 flex justify-center space-x-6">
                    <button onClick={() => onEdit(category.id)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit className="inline-block" />
                    </button>
                    <button onClick={() => onDelete(category.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash className="inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
