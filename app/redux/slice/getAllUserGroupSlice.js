import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUserGroupAction } from '../action/fetchAllUserGroupAction';

const initialState = {
  data: [],
  isLoading: false,
};

const fetchAllUserGroupSlice = createSlice({
  name: 'fetchAllUserGroup',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllUserGroupAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUserGroupAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchAllUserGroupAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fetchAllUserGroupSlice.reducer;
