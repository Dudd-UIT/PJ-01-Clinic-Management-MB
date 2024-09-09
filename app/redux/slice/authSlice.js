// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
// import { fetchUserAccountAction } from "../../action/fetchDataAction/fetchUserAccountAction";

const initialState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoading = false;

      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserAccountAction.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchUserAccountAction.fulfilled, (state, action) => {
//         state.isLoading = false;
//         const roles = action.payload.data?.roles;
//         const username = action.payload.data?.username;
//         const token = action.payload.data?.access_token; // token chứa username và roles
//         const groupName = action.payload.data?.groupName;
//         const groupID = action.payload.data?.groupID;
//         const userInfo = action.payload.data?.userInfo;

//         const data = {
//           isAuthenticated: token ? true : false,
//           token,
//           account: {
//             roles,
//             username,
//             groupName,
//             groupID,
//             userInfo
//           }
//         };
//         state.user = data;
//       })
//       .addCase(fetchUserAccountAction.rejected, (state) => {
//         state.isLoading = false;
//       });
//   },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
