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
      <nav className={`fixed top-0 left-0 w-full flex justify-between items-center p-2 ${darkMode ? 'bg-gray-900 text-white' : 'bg-purple-300 text-black'} shadow-lg rounded-b-2xl`}>
  <div className="flex items-center">
    <div className="flex items-center justify-center w-36 h-14 bg-white rounded-full shadow-md">
      <img src={xyzLogo} alt="Mutlu Marketi Logo" className="w-32 h-12 object-contain" />
    </div>
    <span className="ml-3 text-xl font-bold">{darkMode ? 'Mutlu Alışverişler' : 'Mutlu Alışverişler'}</span>
  </div>
  <div className="flex items-center space-x-4">
    <ToggleButton />
    <div className="relative group">
      <img src={person} className={`w-8 h-8 rounded-full object-cover border-2 ${darkMode ? 'border-white' : 'border-black'} cursor-pointer`} />
      <div className={`absolute top-full right-0 mt-2 w-48 p-4 rounded-lg shadow-md transform transition-all scale-0 group-hover:scale-100 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <p className="font-semibold">{user.displayName}</p>
        <button onClick={handleLogout} className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-700">Çıkış Yap</button>
      </div>
    </div>
  </div>
</nav>
<div className="pt-20"> 
</div>

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
