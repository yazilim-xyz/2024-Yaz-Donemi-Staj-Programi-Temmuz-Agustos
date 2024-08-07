import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../service/firebase';
import lightModeIcon from '../assets/images/png/light.png';
import darkModeIcon from '../assets/images/png/dark.png';
import xyzLogo from '../assets/images/png/xyz-logo.png';
import person from '../assets/images/png/person.png';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ toggleDarkMode, darkMode, toggleCartVisibility }) => {
  const [user, isLoading] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <nav className={`fixed top-0 left-0 w-full flex justify-between items-center p-1 ${darkMode ? 'dark-mode dark-gradient' : 'light-gradient'} z-50 transition-all duration-300 ease-in-out`}>
      <div className="flex items-center transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-center w-36 h-14 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out">
          <img src={xyzLogo} alt="Mutlu Marketi Logo" className="w-32 h-12 object-contain" />
        </div>
      </div>
      <div className="flex items-center space-x-4 transition-all duration-300 ease-in-out">
        <button onClick={toggleDarkMode} className="w-16 h-16 rounded-full bg-transparent flex items-center justify-center overflow-hidden z-50">
          <img src={darkMode ? darkModeIcon : lightModeIcon} alt="Toggle Dark Mode" className="object-cover h-full w-full" />
        </button>

        <button onClick={toggleCartVisibility} className="w-16 h-16 rounded-full bg-transparent flex items-center justify-center overflow-hidden z-50">
          <FaShoppingCart className={`text-2xl ${darkMode ? 'text-white' : 'text-black'}`} />
        </button>
        <div className="relative group flex items-center space-x-2 transition-all duration-300 ease-in-out">
          <p className="font-semibold">{user.displayName}</p>
          <img
            src={person}
            alt="User Icon"
            className={` w-8 h-8 object-cover cursor-pointer`}
          />
          <div className={`absolute top-full right-0 mt-2 w-48 p-4 rounded-lg shadow-md transform transition-all duration-300 ease-in-out scale-0 group-hover:scale-100 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <button onClick={handleLogout} className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-700">Çıkış Yap</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
