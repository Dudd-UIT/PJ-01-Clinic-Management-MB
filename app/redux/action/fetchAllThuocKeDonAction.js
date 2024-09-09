import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchAllThuocKeDonAction = createAsyncThunk(
  'fetchAllThuocAction',
  async () => {
    try {
      const response = await axios.get('/thuoc/keDon/getAll');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
