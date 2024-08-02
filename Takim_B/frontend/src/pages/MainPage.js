import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import xyzLogo from '../assets/images/png/xyz-logo.png';
import ProductList from '../components/ProductList';
import TotalAmount from '../components/TotalAmount';
import BarcodeInput from '../components/BarcodeInput';
import CategoryList from '../components/CategoryList';
import ActionButtons from '../components/ActionButton';
import lightModeIcon from '../assets/images/png/light.png';
import darkModeIcon from '../assets/images/png/dark.png';
import person from '../assets/images/png/person.png';
import logout from '../assets/images/svg/logout.svg';
import CardPage from '../components/CardPage';
import { signOut } from 'firebase/auth';
import { auth } from '../service/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

function MainPage({ toggleDarkMode, darkMode }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const [user, isLoading] = useAuthState(auth);

  const handleLogout = useCallback(() => {
    signOut(auth);
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const ToggleButton = () => (
    <button onClick={toggleDarkMode} className="w-16 h-16 rounded-full bg-transparent flex items-center justify-center overflow-hidden z-50">
      <img src={darkMode ? darkModeIcon : lightModeIcon} alt="Toggle Dark Mode" className="object-cover h-full w-full" />
    </button>
  );

 


  return (
    <div className={`w-full h-screen ${darkMode ? 'dark-gradient' : 'light-gradient'}`}>
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-2">
        <img src={xyzLogo} className={`w-36 h-20 object-contain`} />
        <div className="flex items-center space-x-4">
          <img src={logout} alt="Çıkış yap"
            className={`w-7 h-7 rounded-full object-cover cursor-pointer ${darkMode ? 'filter invert' : ''}`}
            onClick={handleLogout} />
          <ToggleButton />
          <div className="flex items-center">
            <img src={person} className={`w-10 h-10 rounded-full object-cover border-2 border-black ${darkMode ? 'filter invert' : ''}`} />
            <div className={`ml-2 ${darkMode ? 'text-white' : ''}`}>
              <p className="font-semibold">{user.displayName}</p>
            </div>
          </div>
        </div>
      </nav>
      <div className="pt-20 px-4 grid grid-cols-12 gap-4">
        <div className="col-span-3 space-y-4">
          <div className={`rounded-t-3xl ${darkMode ? 'bg-dark_Background_ctgry' : 'bg-light_div'}`}>
            <div className="bg-white p-4 rounded-3xl shadow-lg flex flex-col space-y-4">
              <CardPage />
              <div className="flex flex-wrap items-center space-x-2 mt-4 sm:w-auto">
                <ActionButtons />
                <TotalAmount />
              </div>
            </div>
            <BarcodeInput />
          </div>
        </div>
        <div className="col-span-6 space-y-4">
          <ProductList category={selectedCategory} darkMode={darkMode} />
        </div>
        <div className="col-span-3">
          <CategoryList setSelectedCategory={setSelectedCategory} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
