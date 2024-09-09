import {createSlice} from '@reduxjs/toolkit';
import {fetchAllBenhNhanAction} from '../action/fetchAllBenhNhanAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchAllBenhNhanSlice = createSlice({
  name: 'patients',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllBenhNhanAction.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBenhNhanAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllBenhNhanAction.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default fetchAllBenhNhanSlice.reducer;
