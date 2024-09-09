import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchBacSiByDateAction = createAsyncThunk(
  'fetchBacSiByDateAction',
  async (date) => {
    try {
      // const response = await axios.get(`/bacsi/getByDate/${date}`);
      const response = await axios.post('/bacsi/getByDate', {date});
      return response.data; 
    } catch (error) {
      return error.message;
    }
  }
);