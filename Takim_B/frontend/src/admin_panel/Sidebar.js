import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBox, FaPlus, FaEdit, FaTags, FaChartLine, FaSignOutAlt, FaUserCog } from "react-icons/fa";

function Sidebar({ setActivePage }) {
  const [isOpen, setIsOpen] = useState(true); // Sidebar'ın açık/kapalı durumunu kontrol eder.

  return (
    <div className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} bg-white shadow-md`}>
      <div className="p-4 font-bold text-xl border-b flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen && <span>Yönetim Paneli</span>} {/* Yönetim Paneli yazısını sadece sidebar açık olduğunda göster */}
        <span className={`transform ${isOpen ? 'rotate-180' : ''}`}>&#9660;</span> {/* Ok işareti */}
      </div>
      <ul className={`mt-4 ${isOpen ? 'block' : 'hidden'}`}>
        <li onClick={() => setActivePage('categories-admin')} className="px-4 py-2 hover:bg-gray-200 flex items-center cursor-pointer">
          <FaTags className="mr-2" /> {isOpen && 'Kategoriler'}
        </li>
        <li onClick={() => setActivePage('productTable')} className="px-4 py-2 hover:bg-gray-200 flex items-center cursor-pointer">
          <FaBox className="mr-2" /> {isOpen && 'Ürünler'}
        </li>
        <li onClick={() => setActivePage('addProduct')} className="px-4 py-2 hover:bg-gray-200 flex items-center cursor-pointer">
          <FaPlus className="mr-2" /> {isOpen && 'Ürün Ekle'}
        </li>
        <li onClick={() => setActivePage('updateProduct')} className="px-4 py-2 hover:bg-gray-200 flex items-center cursor-pointer">
          <FaEdit className="mr-2" /> {isOpen && 'Ürün Güncelle'}
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
          <FaChartLine className="mr-2" /> {isOpen && <Link to="/stock-tracking">Stok Takip</Link>}
        </li>
        <li onClick={() => setActivePage('kullanıcılar')} className="px-4 py-2 hover:bg-gray-200 flex items-center cursor-pointer">
          <FaUserCog className="mr-2" /> {isOpen && 'Kullanıcılar'}
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
          <FaSignOutAlt className="mr-2" /> {isOpen && <Link to="/">Çıkış Yap</Link>}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
