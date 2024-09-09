import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchAllAccountAction = createAsyncThunk(
  'fetchAllAccount',
  async () => {
    try {
      const response = await axios.get('/account/getAllAccount');
      return response.data; 
    } catch (error) {
      return error.message;
    }
  }
);
