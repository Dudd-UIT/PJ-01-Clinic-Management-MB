import {createSlice} from '@reduxjs/toolkit';
import {fetchBacSiByDateAction} from '../action/fetchBacSiByDateAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchBacSiByDateSlice = createSlice({
  name: 'fetchBacSiByDate',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBacSiByDateAction.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchBacSiByDateAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchBacSiByDateAction.rejected, state => {
        state.isLoading = false;
      });
  },
});

export default fetchBacSiByDateSlice.reducer;
