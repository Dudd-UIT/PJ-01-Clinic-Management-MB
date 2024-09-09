import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchAllGioDatLichAction = createAsyncThunk(
  'fetchAllGioDatLichAction',
  async (maBN, { meta }) => {
    try {
      const response = await axios.get(`/datlichthuoc/getAll/${maBN}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
