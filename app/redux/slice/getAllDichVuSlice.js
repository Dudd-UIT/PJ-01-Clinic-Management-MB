import { createSlice } from '@reduxjs/toolkit';
import { fetchAllDichVuAction } from '../action/fetchAllDichVuAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchAllDichVuSlice = createSlice({
  name: 'services',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllDichVuAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllDichVuAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllDichVuAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchAllDichVuSlice.reducer;
