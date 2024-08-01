import React from 'react'
import { Link } from "react-router-dom";
import user from '../assets/images/png/person.png';

const Navbar = () => {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <div className="text-xl font-bold">
    <img
            src={user}
            className={`w-12 h-12 rounded-full object-cover border-2 border-black `}
          />
    </div>
    <div>
      <span className="mr-4">Hoşgeldiniz, Admin</span>
      <Link to="/">
        <button className="bg-red-500 px-4 py-2 rounded">Çıkış Yap</button>
      </Link>
    </div>
  </div>
  )
}

export default Navbar