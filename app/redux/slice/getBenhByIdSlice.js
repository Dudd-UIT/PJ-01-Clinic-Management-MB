import { createSlice } from '@reduxjs/toolkit';
import { fetchBenhByIdAction } from '../action/fetchBenhByIdAction';

const initialState = {
  data: {},
  isLoading: false,
};

const fetchBenhByIdSlice = createSlice({
  name: 'benhById',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBenhByIdAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBenhByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchBenhByIdAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchBenhByIdSlice.reducer;
