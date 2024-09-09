import axios from "../../setup/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPkByIdHdAction = createAsyncThunk(
  "fetchPkByIdHdAction",
  async (maHD, { meta }) => {
    try {
      const response = await axios.get(`/phieukham/dspk/getById/${maHD}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchLSKByIdBnAction = createAsyncThunk(
  "fetchLSKByIdBnAction",
  async (maBN, { meta }) => {
    try {
      const response = await axios.get(`/phieukham/lichSuKham/getById/${maBN}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
