import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ReactComponent as MenuIcon } from '../assets/images/svg/menu.svg'; 

const categories = [
  'Meyve, Sebze', 'Et, Şarküteri', 'Atıştırmalık', 'Kuruyemiş', 'İçecekler',
  'Glutensiz Ürünler', 'Kahvaltılık Ürünler', 'Sağlık,Bakım', 'Temizlik'
];

const CategoryList = ({setSelectedCategory, darkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  return (
    <div>
      {/* Default Category List for Larger Screens */}
      <div className={`p-4 w-full rounded-3xl  shadow hidden lg:block ${darkMode ? 'bg-dark_Background_ctgry' : 'bg-light_div'}`}>
        <h2 className={`text-xl font-bold mb-4 uppercase ${darkMode ? 'text-lightBackground':'text-lightBackground'  }`}>Kategoriler</h2>
        <ul>
        {categories.map((category, index) => (
            <li key={index} className="border-b py-4 ">
              <button onClick={() => setSelectedCategory(category)} className={`${darkMode ? 'text-white' : 'text-white'}`}>
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Menu Layout for Smaller Screens */}
      <Menu as="div" className="lg:hidden relative">
        <Menu.Button
          className={`p-4 rounded-lg shadow w-full ${darkMode ? 'bg-light_Background_ctgry text-lightBackground' : 'bg-light_Background_ctgry text-darkText'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon className="w-6 h-6" />
        </Menu.Button>
        {isMenuOpen && (
          <Menu.Items className={`absolute top-full left-0 mt-2 w-full p-4 rounded-lg shadow ${darkMode ? 'bg-dark_Background_ctgry' : 'bg-light_Background_ctgry'}`}>
            {categories.map((category, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button onClick={() => setSelectedCategory(category)} className={`block border-b py-2 ${active ? 'bg-primary text-white' : ''}`}>
                  {category}
                </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        )}
      </Menu>
    </div>
  );
};

export default CategoryList;
