import { createSlice } from '@reduxjs/toolkit';
import { fetchAllThuocKeDonAction } from '../action/fetchAllThuocKeDonAction';

const initialState = {
  dsThuoc: [],
  isLoading: false,
};

const fetchAllThuocKeDonSlice = createSlice({
  name: 'dsThuoc',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllThuocKeDonAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllThuocKeDonAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dsThuoc = action.payload.data;
      })
      .addCase(fetchAllThuocKeDonAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchAllThuocKeDonSlice.reducer;
