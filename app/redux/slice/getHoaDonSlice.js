import { createSlice } from '@reduxjs/toolkit';
import { fetchDSHDByIdAction } from '../action/fetchHoaDonAction';

const initialState = {
  dshd: [],
  status: "",
  loading: false,
  selectedHD: {},
  isShowHdRow: [false, false, false],
};

const fetchHoaDonSlice = createSlice({
  name: 'HoaDon',
  initialState: initialState,
  reducers: {
    selectHD: (state, action) => {
      state.selectedHD = action.payload; // Cập nhật thông tin hàng được chọn
    },
    clearSelectedHD: (state) => {
      state.selectedHD = {}; // Xóa thông tin hàng được chọn
    },
    setIsShowHdRow: (state, action) => {
      const currArr = state.isShowHdRow;
      state.isShowHdRow = currArr.map((isShow, index) => {
        return index === action.payload ? (!isShow) : false;
      })
      //state.isShowHdRow = [...currArr.slice(0, rowIndex), !currArr[rowIndex], ...currArr.slice(rowIndex + 1)];
    },
    clearIsShowHdRow: (state) => {
      state.isShowHdRow = [false, false, false]; 
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDSHDByIdAction.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchDSHDByIdAction.fulfilled, (state, action) => {
        state.status = 'success';
        state.loading = false;
        state.dshd = action.payload.data;
      })
      .addCase(fetchDSHDByIdAction.rejected, (state) => {
        state.status = 'failed';
        state.loading = false;
      });
  },
});

export const { selectHD, clearSelectedHD, setIsShowHdRow, clearIsShowHdRow } = fetchHoaDonSlice.actions;

export default fetchHoaDonSlice.reducer;
