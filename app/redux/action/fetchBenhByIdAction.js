import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchBenhByIdAction = createAsyncThunk(
  'fetchBenhById',
  async (maPK) => {
    try {
      const response = await axios.post('/phieukham/ttk/dsBenh/getById', {maPK});
      return response.data; 
    } catch (error) {
      return error.message;
    }
  }
);
