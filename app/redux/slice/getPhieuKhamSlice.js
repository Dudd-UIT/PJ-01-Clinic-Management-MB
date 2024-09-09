import { createSlice } from '@reduxjs/toolkit';
import { fetchPkByIdHdAction, fetchLSKByIdBnAction } from '../action/fetchPhieuKhamAction';

const initialState = {
  data: [],
  isLoading: false,
  pkByIdHd: [],
  lskByIdBn: [],
};

const fetchPhieuKhamSlice = createSlice({
  name: 'DSDK',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLSKByIdBnAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLSKByIdBnAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lskByIdBn = action.payload.data;
      })
      .addCase(fetchLSKByIdBnAction.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export default fetchPhieuKhamSlice.reducer;
