import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBox, FaPlus, FaEdit, FaTags, FaChartLine, FaSignOutAlt, FaUserCog } from "react-icons/fa";

function Sidebar({ setActivePage, activePage }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className={`transition-all bg-cinder duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-cinder shadow-md`}>
      <div className="p-4 font-bold text-xl border-b flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen && <span className="text-white">Yönetim Paneli</span>}
        <span className={`text-white transform ${isOpen ? 'rotate-180' : ''}`}>&#9660;</span>
      </div>
      <ul className={`mt-4 ${isOpen ? 'block' : 'hidden'}`}>
        <li
          onClick={() => handleClick('categories-admin')}
          className={`px-4 py-2 flex items-center cursor-pointer ${activePage === 'categories-admin' ? 'bg-gray-200 text-black' : 'text-white hover:bg-gray-200 hover:text-black'}`}
        >
          <FaTags className="mr-2" /> {isOpen && 'Kategoriler'}
        </li>
        <li
          onClick={() => handleClick('productTable')}
          className={`px-4 py-2 flex items-center cursor-pointer ${activePage === 'productTable' ? 'bg-gray-200 text-black' : 'text-white hover:bg-gray-200 hover:text-black'}`}
        >
          <FaBox className="mr-2" /> {isOpen && 'Ürünler'}
        </li>
        <li
          onClick={() => handleClick('addProduct')}
          className={`px-4 py-2 flex items-center cursor-pointer ${activePage === 'addProduct' ? 'bg-gray-200 text-black' : 'text-white hover:bg-gray-200 hover:text-black'}`}
        >
          <FaPlus className="mr-2" /> {isOpen && 'Ürün Ekle'}
        </li>
        <li
          className={`px-4 py-2 flex items-center ${activePage === 'stock-tracking' ? 'bg-gray-200 text-black' : 'text-white hover:bg-gray-200 hover:text-black'}`}
        >
          <FaChartLine className="mr-2" /> {isOpen && <Link to="/stock-tracking" onClick={() => handleClick('stock-tracking')}>Stok Takip</Link>}
        </li>

        <li
          className={`px-4 py-2 flex items-center ${activePage === 'logout' ? 'bg-gray-200 text-black' : 'text-white hover:bg-gray-200 hover:text-black'}`}
        >
          <FaSignOutAlt className="mr-2" /> {isOpen && <Link to="/" onClick={() => handleClick('logout')}>Çıkış Yap</Link>}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
