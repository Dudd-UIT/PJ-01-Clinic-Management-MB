import { createSlice } from '@reduxjs/toolkit';
import { fetchCheckThuocAction } from '../action/fetchCheckThuocAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchCheckThuocSlice = createSlice({
  name: 'thuoc',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCheckThuocAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCheckThuocAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchCheckThuocAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchCheckThuocSlice.reducer;
