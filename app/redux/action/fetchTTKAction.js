import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchTTKAction = createAsyncThunk(
  'fetchTTK',
  async (maPK) => {
    try {
      const response = await axios.post('/phieukham/ttk/getById', {maPK});
      return response.data; 
    } catch (error) {
      return error.message;
    }
  }
);
