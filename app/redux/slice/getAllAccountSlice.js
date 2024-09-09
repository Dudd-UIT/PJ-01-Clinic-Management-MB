import { createSlice } from '@reduxjs/toolkit';
import { fetchAllAccountAction } from '../action/fetchAllAccountAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchAllAccountSlice = createSlice({
  name: 'fetchAllAccount',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllAccountAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAccountAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllAccountAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchAllAccountSlice.reducer;
