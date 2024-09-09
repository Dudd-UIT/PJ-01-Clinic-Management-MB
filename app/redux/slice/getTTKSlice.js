import { createSlice } from '@reduxjs/toolkit';
import { fetchTTKAction } from '../action/fetchTTKAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchTTKSlice = createSlice({
  name: 'fetchTTK',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTTKAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTTKAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchTTKAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchTTKSlice.reducer;
