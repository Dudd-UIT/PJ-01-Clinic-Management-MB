import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchCTPKFutureByIdAction = createAsyncThunk(
  'fetchCTPKFutureById',
  async maBN => {
    try {
      const response = await axios.get(
        `/phieukham/ctpk/future/getById/${maBN}`,
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  },
);
