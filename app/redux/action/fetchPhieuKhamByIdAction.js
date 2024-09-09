import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchPhieuKhamByIdAction = createAsyncThunk(
  'fetchPhieuKhamById',
  async maPK => {
    try {
      const response = await axios.get(`/phieukham/chitiet-pk/getById/${maPK}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  },
);
