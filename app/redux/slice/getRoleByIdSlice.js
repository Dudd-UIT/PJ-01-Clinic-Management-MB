import { createSlice } from '@reduxjs/toolkit';
import { fetchRoleByIdAction } from '../action/fetchRoleByIdAction';

const initialState = {
  data: {},
  isLoading: false,
};

const fetchRoleByIdSlice = createSlice({
  name: 'roleById',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRoleByIdAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRoleByIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchRoleByIdAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchRoleByIdSlice.reducer;
