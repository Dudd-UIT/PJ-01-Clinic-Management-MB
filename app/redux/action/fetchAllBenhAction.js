import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchAllBenhAction = createAsyncThunk(
  'fetchAllBenh',
  async () => {
    try {
      const response = await axios.get('/benh/getAll');
      return response.data; 
    } catch (error) {
      return error.message;
    }
  }
);
