import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../setup/axios';

export const fetchDsClsByIdAction = createAsyncThunk(
  "fetchDsClsById",
  async (maPK, { meta }) => {
    try {
      // chỉnh lại các controller, sử dụng body request trong get
      const response = await axios.get(`/cls/ds-cls/getById/${maPK}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchAllClsAction = createAsyncThunk(
  "fetchAllCls",
  async () => {
    try {
      const response = await axios.get(`/cls/getAll`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
