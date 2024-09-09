import { createSlice } from '@reduxjs/toolkit';
import { fetchPhieuKhamByIdAction } from '../action/fetchPhieuKhamByIdAction';

const initialState = {
  data: {},
  isLoading: false,
};

const fetchPhieuKhamByIdSlice = createSlice({
  name: 'phieuKhamById',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPhieuKhamByIdAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPhieuKhamByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchPhieuKhamByIdAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchPhieuKhamByIdSlice.reducer;
