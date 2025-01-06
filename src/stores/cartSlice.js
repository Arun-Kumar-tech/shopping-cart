import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push({ ...action.payload, addNumber: 1 });
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },

    updateItemQuantity: (state, action) => {
      const { id, addNumber } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        if (addNumber < 0) {
          item.addNumber = 0;
        } else {
          item.addNumber = addNumber;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
