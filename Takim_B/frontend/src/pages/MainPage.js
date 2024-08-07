import React, { useState, useCallback, useEffect } from 'react';
import ProductList from '../components/ProductList';
import BarcodeInput from '../components/BarcodeInput';
import CategoryList from '../components/CategoryList';
import CardPage from '../components/CardPage';
import Navbar from '../components/Navbar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../service/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../features/products/productSlice';
import { calculateTotal, selectTotalAmount } from '../features/totalAmount/totalAmountSlice';

function MainPage({ toggleDarkMode, darkMode }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartVisible, setIsCartVisible] = useState(false);
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

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={`w-full h-full ${darkMode ? 'dark-mode dark-gradient' : 'light-gradient'} overflow-hidden `}>
      <Navbar
        toggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
        toggleCartVisibility={toggleCartVisibility}
      />
      <div className={`pt-20 px-4 h-full grid ${isCartVisible ? 'grid-cols-1 md:grid-cols-6' : 'grid-cols-1 lg:grid-cols-12'} gap-4 `}>
        {isCartVisible && (
          <div className="md:col-span-2 flex flex-col h-full overflow-auto lg:hidden">
            <div className="flex flex-col space-y-4">
              <CardPage />
              <BarcodeInput />
            </div>
          </div>
        )}
        <div className={`lg:col-span-3 flex flex-col h-full overflow-auto ${isCartVisible ? 'md:col-span-4' : ''}`}>
          <h2 className={`sticky top-0 z-10 p-4 font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Kategoriler</h2>
          <CategoryList setSelectedCategory={setSelectedCategory} darkMode={darkMode} />
        </div>
        <div className={`lg:col-span-6 flex flex-col h-full overflow-auto ${isCartVisible ? 'md:col-span-4' : ''} transition-all duration-100 ease-in-out`}>
          <h2 className={`sticky top-0 z-10 p-4 font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Ürünler</h2>
          <ProductList category={selectedCategory} darkMode={darkMode} />
        </div>
        {!isCartVisible && (
          <div className="hidden lg:flex lg:col-span-3 flex-col h-full overflow-auto space-y-4">
            <CardPage />
            <BarcodeInput />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
