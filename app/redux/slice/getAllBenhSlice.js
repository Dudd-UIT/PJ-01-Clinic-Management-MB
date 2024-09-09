import { createSlice } from '@reduxjs/toolkit';
import { fetchAllBenhAction } from '../action/fetchAllBenhAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchAllBenhSlice = createSlice({
  name: 'fetchAllBenh',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllBenhAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBenhAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllBenhAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchAllBenhSlice.reducer;
