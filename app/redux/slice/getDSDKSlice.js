import { createSlice } from '@reduxjs/toolkit';
import { fetchDSDKAction, fetchPkByIdHdAction, fetchLSKByIdBnAction } from '../action/fetchDSDKAction';

const initialState = {
  data: [],
  isLoading: false,
  pkByIdHd: [],
  lskByIdBn: [],
};

const fetchDSDKSlice = createSlice({
  name: 'DSDK',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDSDKAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDSDKAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchDSDKAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPkByIdHdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pkByIdHd = action.payload.data;
      })
      .addCase(fetchLSKByIdBnAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lskByIdBn = action.payload.data;
      })
  },
});

export default fetchDSDKSlice.reducer;
