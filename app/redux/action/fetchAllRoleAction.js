import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchAllRoleAction = createAsyncThunk(
  'fetchAllRoleAction',
  async () => {
    try {
      const response = await axios.get('/role/getAll');
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
