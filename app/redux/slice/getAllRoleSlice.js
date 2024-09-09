import { createSlice } from '@reduxjs/toolkit';
import { fetchAllRoleAction } from '../action/fetchAllRoleAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchAllRoleSlice = createSlice({
  name: 'role',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllRoleAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllRoleAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllRoleAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchAllRoleSlice.reducer;
