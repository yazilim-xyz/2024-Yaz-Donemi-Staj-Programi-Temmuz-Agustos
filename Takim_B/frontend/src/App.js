import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import ProductList from './components/ProductList';
import TotalAmount from './components/TotalAmount';
import BarcodeInput from './components/BarcodeInput';
import Keypad from './components/KeyPad';
import CategoryList from './components/CategoryList';
import ActionButtons from './components/ActionButton';

function App() {
  return (
    <Provider store={store}>
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4">
          {/* Barkodla Sepet İşlemleri - Sol Taraf */}
          <div className="col-span-3 space-y-4">
            <BarcodeInput />
            <Keypad />
            <TotalAmount />

            <ActionButtons />

          </div>
          {/* Ürün Listesi - Orta */}
          <div className="col-span-6 space-y-4">
            <ProductList />
          </div>
          {/* Kategori Listesi - Sağ Taraf */}
          <div className="col-span-3">
            <CategoryList />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
