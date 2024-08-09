import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductByBarcode, addProductToCart, getCartItems } from '../../../../backend/service/cartService';

export const addProductByBarcode = createAsyncThunk(
  'products/addProductByBarcode',
  async (barcode, { rejectWithValue }) => {
    try {
      const product = await fetchProductByBarcode(barcode);
      await addProductToCart(product, 1);
      const updatedProducts = await getCartItems(); // Güncellenmiş sepeti al
      return updatedProducts; // Güncellenmiş sepeti döndür
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    removeItem: (state, action) => {
      return state.filter(product => product.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductByBarcode.fulfilled, (state, action) => {
        return action.payload; // Güncellenmiş sepeti state'e aktar
      });
  },
});

export const { removeItem } = productSlice.actions;
export const selectProducts = (state) => state.products;
export default productSlice.reducer;
