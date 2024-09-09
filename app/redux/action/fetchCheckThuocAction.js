import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchCheckThuocAction = createAsyncThunk(
  'fetchCheckThuoc',
  async () => {
    try {
      const response = await axios.get('/lothuoc/check');
      return response.data; 
    } catch (error) {
      return error.message;
    }
  }
);
