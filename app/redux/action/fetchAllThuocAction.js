import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchAllThuocAction = createAsyncThunk(
  'fetchAllThuocAction',
  async () => {
    try {
      const response = await axios.get('/thuoc/getAll');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
