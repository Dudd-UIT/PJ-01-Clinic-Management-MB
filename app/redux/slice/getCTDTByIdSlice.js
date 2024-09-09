import { createSlice } from '@reduxjs/toolkit';
import { fetchCTDTByIdAction } from '../action/fetchCTDTById';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchCTDTByIdSlice = createSlice({
  name: 'CTDT',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCTDTByIdAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCTDTByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchCTDTByIdAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchCTDTByIdSlice.reducer;
