import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import xyzLogo from '../assets/images/png/xyz-logo.png';
import ProductList from '../components/ProductList';
import BarcodeInput from '../components/BarcodeInput';
import CategoryList from '../components/CategoryList';
import lightModeIcon from '../assets/images/png/light.png';
import darkModeIcon from '../assets/images/png/dark.png';
import person from '../assets/images/png/person.png';
import logout from '../assets/images/svg/logout.svg';
import CardPage from '../components/CardPage';
import { signOut } from 'firebase/auth';
import { auth } from '../service/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../features/products/productSlice';
import { calculateTotal, selectTotalAmount } from '../features/totalAmount/totalAmountSlice';

function MainPage({ toggleDarkMode, darkMode }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const [user, isLoading] = useAuthState(auth);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const totalAmount = useSelector(selectTotalAmount);

  const handleLogout = useCallback(() => {
    signOut(auth);
  }, []);

  useEffect(() => {
    dispatch(calculateTotal(products));
  }, [products, dispatch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const ToggleButton = () => (
    <button onClick={toggleDarkMode} className="w-16 h-16 rounded-full bg-transparent flex items-center justify-center overflow-hidden z-50">
      <img src={darkMode ? darkModeIcon : lightModeIcon} alt="Toggle Dark Mode" className="object-cover h-full w-full" />
    </button>
  );

  return (
    <div className={`w-full h-full ${darkMode ? 'dark-mode dark-gradient' : 'light-gradient'} overflow-hidden`}>
      <nav className={`fixed top-0 left-0 w-full flex justify-between items-center p-1 ${darkMode ? 'dark-mode dark-gradient' : 'light-gradient'} z-50`}>
        <img src={xyzLogo} className="w-36 h-20 object-contain" />
        <div className="flex items-center space-x-4">
          <img src={logout} alt="Logout"
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
      <div className="pt-24 px-4 h-full grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-3 flex flex-col h-full overflow-auto">
          <h2 className={`sticky top-0 z-10 p-4 font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Sepet</h2>
          <CardPage />
          <div className="my-4" /> {/* Add spacing between CardPage and BarcodeInput */}
          <BarcodeInput />
        </div>
        <div className="md:col-span-6 flex flex-col h-full overflow-auto">
          <h2 className={`sticky top-0 z-10 p-4 font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Ürünler</h2>
          <ProductList category={selectedCategory} darkMode={darkMode} />
        </div>
        <div className="md:col-span-3 flex flex-col h-full overflow-auto hidden md:block">
          <h2 className={`sticky top-0 z-10 p-4 font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Kategoriler</h2>
          <CategoryList setSelectedCategory={setSelectedCategory} darkMode={darkMode} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full dark:bg-gray-800 p-2 md:hidden overflow-auto">
        <CategoryList setSelectedCategory={setSelectedCategory} darkMode={darkMode} isTabBar />
      </div>
    </div>
  );
}

export default MainPage;
