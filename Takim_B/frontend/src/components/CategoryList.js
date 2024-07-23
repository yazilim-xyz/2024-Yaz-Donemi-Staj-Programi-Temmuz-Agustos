import React from 'react';

const categories = [
  'Meyve, Sebze', 'Et, Şarküteri', 'Atıştırmalık', 'Kuruyemiş', 'İçecekler',
  'Glutensiz Ürünler', 'Kahvaltılık Ürünler', 'Sağlık, Bakım', 'Temizlik'
];

const CategoryList = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Kategoriler</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="border-b py-2">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
