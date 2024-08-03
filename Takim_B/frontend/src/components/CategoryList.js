import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { ReactComponent as MenuIcon } from '../assets/images/svg/menu.svg';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from "firebase/firestore";
import { db } from '../service/firebase';

const ref = collection(db, 'categories');

const CategoryList = ({ setSelectedCategory, darkMode, isTabBar = false }) => {
  const [data, isLoading] = useCollectionData(ref);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isTabBar) {
    return (
      <div className={`flex justify-between ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-2 rounded-t-lg shadow-md`}>
        {data.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`text-sm p-2 flex-1 mx-1 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} hover:bg-primary hover:text-white transition-all`}
          >
            {category.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Default Category List for Larger Screens */}
      <div className={`p-4 w-full rounded-3xl shadow hidden lg:block ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <ul>
          {data.map((category) => (
            <li key={category.id} className="border-b py-2">
              <button
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full text-left py-2 px-4 rounded-lg transition-all duration-300 ${darkMode ? 'bg-gray-700 text-white hover:bg-primary' : 'bg-white text-black hover:bg-primary hover:text-white'}`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Menu Layout for Smaller Screens */}
      <Menu as="div" className="lg:hidden relative">
        <Menu.Button
          className={`p-4 rounded-lg shadow w-full flex items-center justify-between ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span>Kategoriler</span>
          <MenuIcon className="w-6 h-6"/>
        </Menu.Button>
        {isMenuOpen && (
          <Menu.Items className={`absolute top-full left-0 mt-2 w-full p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
            {data.map((category) => (
              <Menu.Item key={category.id}>
                {({ active }) => (
                  <button
                    onClick={() => setSelectedCategory(category.name)}
                    className={`block w-full text-left py-2 px-4 rounded-lg transition-all duration-300 ${active ? (darkMode ? 'bg-primary text-white' : 'bg-primary text-white') : ''}`}
                  >
                    {category.name}
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
