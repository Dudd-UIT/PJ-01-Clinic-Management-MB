import {createSlice} from '@reduxjs/toolkit';
import {
  fetchDsClsByIdAction,
  fetchAllClsAction,
} from '../action/fetchCLSAction';

const initialState = {
  dsClsById: [],
  isLoading: false,
  allCls: [],
};

const fetchCLSSlice = createSlice({
  name: 'CLS',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDsClsByIdAction.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchDsClsByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dsClsById = action.payload.data;
      })
      .addCase(fetchDsClsByIdAction.rejected, state => {
        state.isLoading = false;
      })
      .addCase(fetchAllClsAction.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchAllClsAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allCls = action.payload.data;
      })
      .addCase(fetchAllClsAction.rejected, state => {
        state.isLoading = false;
      });
  },
});

export default fetchCLSSlice.reducer;
