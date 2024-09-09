import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../setup/axios';

export const fetchDatLichThuocByIdAction = createAsyncThunk(
  'fetchDatLichThuocById',
  async (maCTDT, {meta}) => {
    try {
      // chỉnh lại các controller, sử dụng body request trong get
      console.log('mactdt in fetch: ',maCTDT);
      const response = await axios.get(
        `/datlichthuoc/getAllGioThuoc/${maCTDT}`,
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  },
);
