import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../setup/axios';

export const fetchUserAccountAction = createAsyncThunk(
  "fetchUserAccountAction",
  async () => {
    try {
      const response = await axios.get("/account/getUserAccount");
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
