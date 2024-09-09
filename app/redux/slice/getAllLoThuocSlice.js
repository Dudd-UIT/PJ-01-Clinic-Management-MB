import { createSlice } from '@reduxjs/toolkit';
import { fetchAllLoThuocAction } from '../action/fetchAllLoThuocAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchAllLoThuocSlice = createSlice({
  name: 'lothuoc',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllLoThuocAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllLoThuocAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllLoThuocAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchAllLoThuocSlice.reducer;
