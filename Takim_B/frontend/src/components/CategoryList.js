import React from 'react';

const categories = [
  'Meyve, Sebze', 'Et, Şarküteri', 'Atıştırmalık', 'Kuruyemiş', 'İçecekler',
  'Glutensiz Ürünler', 'Kahvaltılık Ürünler', 'Sağlık, Bakım', 'Temizlik'
];

const CategoryList = (darkMode) => {
  return (
    <div className={`p-4 w-auto rounded-egik mr-5 shadow ${darkMode ? 'bg-dark_Background_ctgry' : 'bg-light_Background_ctgry'}`}>
      <h2 className="text-xl text-white font-bold mb-4 uppercase">Kategoriler</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="border-b py-2 text-white">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
