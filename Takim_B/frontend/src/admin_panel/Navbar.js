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
    <div className="bg-primary text-white p-4 flex justify-between items-center">
    <div className="text-xl font-bold">
    <img
            src={person}
            className={`w-12 h-12 rounded-full object-cover border-2 border-black `}
          />
    </div>
    <div>
      <span className="mr-4">Hoşgeldiniz, Admin</span>
      <Link to="/">
        <button className="bg-red-500 px-4 py-2 rounded" onClick={handleLogout}>Çıkış Yap</button>
      </Link>
    </div>
  </div>
  )
}

export default Navbar