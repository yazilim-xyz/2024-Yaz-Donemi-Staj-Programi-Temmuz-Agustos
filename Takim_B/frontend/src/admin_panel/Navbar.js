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
    <div className="fixed top-0 left-0 w-full flex justify-between items-center p-1 z-50">
      <div className="flex items-center">
        <img
          src={person}
          className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 shadow-sm mr-3"
          alt="User"
        />
        <span  className="text-xl text-white font-bold">Admin Panel</span>
      </div>
      <div className="flex items-center">
        <span className="mr-4 text-white text-lg">Hoşgeldiniz, Admin</span>
        <Link to="/">
          <button
            className="bg-gray-300 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
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
