import {createSlice} from '@reduxjs/toolkit';
import {fetchCTPKFutureByIdAction} from '../action/fetchCTPKFutureByIdAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchCTPKFutureByIdSlice = createSlice({
  name: 'CTPKFutureByID',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCTPKFutureByIdAction.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchCTPKFutureByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchCTPKFutureByIdAction.rejected, state => {
        state.isLoading = false;
      });
  },
});

export default fetchCTPKFutureByIdSlice.reducer;
