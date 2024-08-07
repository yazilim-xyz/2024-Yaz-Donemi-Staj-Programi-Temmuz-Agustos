import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../service/firebase';

const ref = collection(db, 'categories');

const CategoryList = ({ setSelectedCategory, darkMode, isTabBar = false }) => {
  const [data, isLoading] = useCollectionData(ref);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const categories = [{ id: 'all', name: 'Tüm Ürünler' }, ...data];

  if (isTabBar) {
    return (
      <div className={`flex justify-between ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-2 rounded-t-lg shadow-md overflow-auto transition-all duration-300 ease-in-out`}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`text-sm p-2 flex-1 mx-1 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} hover:bg-primary hover:text-white `}
          >
            {category.name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className={`p-4 w-full rounded-3xl shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} lg:hidden `}>
        <div className="flex overflow-x-auto scrollbar space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`text-sm p-2 flex-1 rounded-lg whitespace-nowrap ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} hover:bg-primary hover:text-white `}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className={`p-4 w-full rounded-3xl shadow hidden lg:block ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} `}>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="border-b py-2">
              <button
                onClick={() => setSelectedCategory(category.name)}
                className={`w-full text-left py-2 px-4 rounded-lg ${darkMode ? 'bg-gray-700 text-white hover:bg-primary' : 'bg-white text-black hover:bg-primary hover:text-white'}`}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryList;
