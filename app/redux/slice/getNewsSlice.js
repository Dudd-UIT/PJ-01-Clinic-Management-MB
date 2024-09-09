import { createSlice } from '@reduxjs/toolkit';
import { fetchNewsAction } from '../action/fetchNewsAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchNewsSlice = createSlice({
  name: 'fetchNews',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNewsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNewsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchNewsAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchNewsSlice.reducer;
