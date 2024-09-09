import { createSlice } from '@reduxjs/toolkit';
import { fetchAllBacSiAction } from '../action/fetchAllBacSiAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchAllBacSiSlice = createSlice({
  name: 'fetchAllBacSi',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllBacSiAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBacSiAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllBacSiAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchAllBacSiSlice.reducer;
