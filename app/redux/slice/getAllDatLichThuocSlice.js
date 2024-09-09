import { createSlice } from '@reduxjs/toolkit';
import { fetchDatLichThuocByIdAction } from '../action/fetchDatLichThuocByIdAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchDatLichThuocByIdSlice = createSlice({
  name: 'DatLichThuoc',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDatLichThuocByIdAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDatLichThuocByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchDatLichThuocByIdAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchDatLichThuocByIdSlice.reducer;
