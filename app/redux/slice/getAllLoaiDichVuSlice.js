import { createSlice } from '@reduxjs/toolkit';
import { fetchAllLoaiDichVuAction } from '../action/fetchAllLoaiDichVuAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchAllLoaiDichVuSlice = createSlice({
  name: 'loaiDichVu',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllLoaiDichVuAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllLoaiDichVuAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllLoaiDichVuAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchAllLoaiDichVuSlice.reducer;
