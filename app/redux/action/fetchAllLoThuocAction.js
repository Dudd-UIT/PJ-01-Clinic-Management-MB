import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchAllLoThuocAction = createAsyncThunk(
  'fetchAllLoThuocAction',
  async () => {
    try {
      const response = await axios.get('/lothuoc/getAll');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
