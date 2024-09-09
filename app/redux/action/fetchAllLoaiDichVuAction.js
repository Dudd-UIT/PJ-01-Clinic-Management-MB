import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchAllLoaiDichVuAction = createAsyncThunk(
  'fetchAllLoaiDichVuAction',
  async () => {
    try { 
      const response = await axios.get('/dichvu/getAllLDV');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
