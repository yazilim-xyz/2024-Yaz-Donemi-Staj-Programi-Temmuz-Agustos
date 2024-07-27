import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productSlice';
import totalAmountReducer from '../features/totalAmount/totalAmountSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    totalAmount: totalAmountReducer,
  },
});

export default store;

