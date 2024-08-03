import React, { useCallback } from 'react';
import { Link } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../service/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import person from '../assets/images/png/person.png';

const Navbar = () => {
  const [user, isLoading] = useAuthState(auth);

  const handleLogout = useCallback(() => {
    signOut(auth);
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center">
        <img
          src={person}
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md mr-3"
          alt="User"
        />
        <span className="text-2xl font-extrabold"></span>
      </div>
      <div className="flex items-center">
        <span className="mr-4 text-lg font-semibold">Hoşgeldiniz, Admin</span>
        <Link to="/">
          <button
            className="bg-white text-red-500 px-4 py-2 rounded-lg shadow-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out font-semibold"
            onClick={handleLogout}
          >
            Çıkış Yap
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
