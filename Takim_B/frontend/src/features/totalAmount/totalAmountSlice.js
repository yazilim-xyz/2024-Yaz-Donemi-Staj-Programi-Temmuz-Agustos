import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalAmount: 0,
};

const totalAmountSlice = createSlice({
  name: 'totalAmount',
  initialState,
  reducers: {
    calculateTotal: (state, action) => {
      state.totalAmount = action.payload.reduce((sum, item) => sum + item.price, 0);
    },
  },
});

export const { calculateTotal } = totalAmountSlice.actions;

export const selectTotalAmount = (state) => state.totalAmount.totalAmount;

export default totalAmountSlice.reducer;
