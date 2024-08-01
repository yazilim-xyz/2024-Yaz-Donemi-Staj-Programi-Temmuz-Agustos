import React from "react";
import { Link } from "react-router-dom";
import { FaBox, FaPlus, FaEdit, FaTrash, FaTags, FaChartLine, FaSignOutAlt } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4 font-bold text-xl border-b">Yönetim Paneli</div>
      <ul className="mt-4">
        <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
          <FaBox className="mr-2" /> <Link to="/products">Ürünler</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
          <FaTags className="mr-2" /> <Link to="/categories">Kategoriler</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
          <FaPlus className="mr-2" /> <Link to="/add-product">Ürün Ekle</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
          <FaEdit className="mr-2" /> <Link to="/update-product">Ürün Güncelle</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
          <FaTrash className="mr-2" /> <Link to="/delete-product">Ürün Sil</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
          <FaChartLine className="mr-2" /> <Link to="/stock-tracking">Stok Takip</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-200 flex items-center">
          <FaSignOutAlt className="mr-2" /> <Link to="/">Çıkış Yap</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;