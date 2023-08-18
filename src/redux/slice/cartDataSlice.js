import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const cartProductSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addProduct(state, action) {
      state.push(action.payload)
    },
    removeProduct(state, action) {
      state.splice(action.payload, 1)
    }
  }
});

export default cartProductSlice.reducer;
export const { addProduct, removeProduct } = cartProductSlice.actions;