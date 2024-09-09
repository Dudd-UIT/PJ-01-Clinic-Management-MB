import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../setup/axios';

export const fetchCTDTByIdAction = createAsyncThunk(
  "fetchCTDTById",
  async (maPK, { meta }) => {
    try {
      // chỉnh lại các controller, sử dụng body request trong get
      const response = await axios.get(`/donthuoc/ds-thuoc/getById/${maPK}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
