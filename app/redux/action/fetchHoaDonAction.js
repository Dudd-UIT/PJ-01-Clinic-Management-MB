import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../setup/axios';

export const fetchDSHDByIdAction = createAsyncThunk(
  "fetchDSHDByIdAction",
  async (maPK, { meta }) => {
    try {
      const response = await axios.get(`/hoadon/dshd/getById/${maPK}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
