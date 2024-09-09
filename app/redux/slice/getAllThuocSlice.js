import { createSlice } from '@reduxjs/toolkit';
import { fetchAllThuocAction } from '../action/fetchAllThuocAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchAllThuocSlice = createSlice({
  name: 'thuoc',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllThuocAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllThuocAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllThuocAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchAllThuocSlice.reducer;
