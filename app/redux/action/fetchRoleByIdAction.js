import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchRoleByIdAction = createAsyncThunk(
  'fetchRoleByIdAction',
  async (userGroup) => {
    try {
      const response = await axios.post('/role/getById', userGroup);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
