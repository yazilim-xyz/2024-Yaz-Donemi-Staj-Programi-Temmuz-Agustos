import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  items: [],
  barcode: '',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // addItem: (state, action) => {
    //   state.items.push(action.payload);
    // },
    addItem: (state, action) => {
      // state.items.push(action.payload);
      const product = state.items.find(item => item.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const product = state.items.find(item => item.id === action.payload);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
    },
    reset: (state) => {
      state.items = [];
      state.barcode = '';
    },
    setBarcode: (state, action) => {
      state.barcode = action.payload;
    },
  },
});

export const { addItem, removeItem, reset, setBarcode } = productSlice.actions;

export const selectProducts = (state) => state.products.items;
export const addProductByBarcode = (barcode) => (dispatch) => {
  // Simulate adding a product by barcode
  const product = { id: barcode, name: `Product ${barcode}`, price: 10 };
  dispatch(addItem(product));
};

export default productSlice.reducer;
