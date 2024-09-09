import { createSlice } from '@reduxjs/toolkit';
import { fetchAllGioDatLichAction } from '../action/fetchAllGioDatLichAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchAllGioDatLichSlice = createSlice({
  name: 'GioDatLich',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllGioDatLichAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllGioDatLichAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllGioDatLichAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchAllGioDatLichSlice.reducer;
