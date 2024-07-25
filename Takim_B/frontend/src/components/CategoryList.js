import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ReactComponent as MenuIcon } from '../assets/images/svg/menu.svg'; 

const categories = [
  'Meyve, Sebze', 'Et, Şarküteri', 'Atıştırmalık', 'Kuruyemiş', 'İçecekler',
  'Glutensiz Ürünler', 'Kahvaltılık Ürünler', 'Sağlık, Bakım', 'Temizlik'
];

const CategoryList = ({ darkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`p-4 w-auto rounded-lg mr-5 shadow ${darkMode ? 'bg-dark_Background_ctgry' : 'bg-light_Background_ctgry'}`}>
      {/* Default Category List for Larger Screens */}
      <div className={`hidden lg:block`}>
        <h2 className={`text-xl font-bold mb-4 uppercase ${darkMode ? 'text-dark_Text_ctgry' : 'text-light_Text_ctgry'}`}>Kategoriler</h2>
        <ul>
          {categories.map((category, index) => (
            <li key={index} className={`border-b py-2 ${darkMode ? 'text-dark_Text_ctgry' : 'text-light_Text_ctgry'}`}>
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Menu Layout for Smaller Screens */}
      <Menu as="div" className="lg:hidden relative">
        <Menu.Button
          className={`p-4 rounded-lg shadow w-full ${darkMode ? 'bg-dark_Background_ctgry text-dark_Text_ctgry' : 'bg-light_Background_ctgry text-light_Text_ctgry'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon className="w-6 h-6" />
        </Menu.Button>
        {isMenuOpen && (
          <Menu.Items className={`absolute top-full left-0 mt-2 w-full p-4 rounded-lg shadow ${darkMode ? 'bg-dark_Background_ctgry' : 'bg-light_Background_ctgry'}`}>
            {categories.map((category, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block border-b py-2 ${active ? 'bg-primary text-white' : ''} ${darkMode ? 'text-dark_Text_ctgry' : 'text-light_Text_ctgry'}`}
                  >
                    {category}
                  </a>
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
