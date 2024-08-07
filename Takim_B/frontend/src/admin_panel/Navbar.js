import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { auth } from '../service/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import person from '../assets/images/png/person.png';
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Import your icon
import lightModeIcon from '../assets/images/png/light.png';
import darkModeIcon from '../assets/images/png/dark.png';

const Navbar = () => {
  const [user, isLoading] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  // Toggle menu visibility
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Toggle menu visibility
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode); // This should be a function
  };
  // Handle click outside of menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    signOut(auth);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={`fixed top-0 left-0 w-full flex justify-between items-center p-1 z-50 transition-all duration-300 ease-in-out`}>
      <div className="flex items-center ml-auto">
        <button onClick={toggleDarkMode} className="w-16 h-16 rounded-full bg-transparent flex items-center justify-center overflow-hidden z-50 ">
          <img src={darkMode ? darkModeIcon : lightModeIcon} alt="Toggle Dark Mode" className="object-cover h-full w-full" />
        </button>
        <span className={`text-xl font-bold uppercase mr-2 ${darkMode ? 'dark-mode text-white' : 'text-black'}`}>{user.displayName}</span>
        <img
          src={person}
          className="w-10 h-10 mr-2 rounded-full object-cover border-2 border-gray-300 shadow-sm hover:cursor-pointer hover:transition-transform transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          alt="User"
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div
            ref={menuRef}
            className={`absolute top-full right-0 mt-2 w-48 bg-white text-gray-900 border rounded shadow-lg ${darkMode ? 'dark-mode dark-gradient' : ''}`}
          >
            <button
              onClick={handleLogout}
              className={`w-full text-left px-4 py-2 flex items-center  ${darkMode ? 'dark-mode text-white hover:bg-cinder' : 'text-black hover:bg-gray-200'}`}
            >
              <FaSignOutAlt className="mr-2 " /> Çıkış Yap
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar;