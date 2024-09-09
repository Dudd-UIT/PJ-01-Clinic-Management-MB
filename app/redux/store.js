import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import getAllBenhNhanReducer from './slice/getAllBenhNhanSlice';
import phieuKhamReducer from './slice/getPhieuKhamSlice';
import getAllBacSiReducer from './slice/getAllBacSiSlice';
import getAllDichVuReducer from './slice/getAllDichVuSlice';
import getHoaDonReducer from './slice/getHoaDonSlice';
import getDSDKRecuder from './slice/getDSDKSlice';
import getCTDTByIdRecuder from './slice/getCTDTByIdSlice';
import getCLSRecuder from './slice/getCLSSlice';
// import selectedRowReducer from './slice/selectedRowSlice'
import getAllLoaiDichVuReducer from './slice/getAllLoaiDichVuSlice';
import getAllBenhReducer from './slice/getAllBenhSlice';
import getAllThuocReducer from './slice/getAllThuocSlice';
import getTTKReducer from './slice/getTTKSlice';
import getBenhByIdReducer from './slice/getBenhByIdSlice';
import getPhieuKhamByIdReducer from './slice/getPhieuKhamByIdSlice';
import getBacSiByDateReducer from './slice/getBacSiByDateSlice';
import selectedItemReducer from './slice/selectedItemSlice';
import getCTPKFutureByIdReducer from './slice/getCTPKFutureByIdSlice';
import getAllDatLichThuocReducer from './slice/getAllDatLichThuocSlice'
import getAllGioDatLichReducer from './slice/getAllGioDatLichSlice';
import getNewsReducer from './slice/getNewsSlice'
import getMessageReducer from './slice/chatMessageSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    benhNhan: getAllBenhNhanReducer,
    phieuKham: phieuKhamReducer,
    bacSi: getAllBacSiReducer,
    bacSiByDate: getBacSiByDateReducer,
    dichVu: getAllDichVuReducer,
    hoaDon: getHoaDonReducer,
    thuoc: getAllThuocReducer,
    dsdk: getDSDKRecuder,
    ctdtById: getCTDTByIdRecuder,
    clsById: getCLSRecuder,
    existedCTDT: getCTDTByIdRecuder,
    selectedItem: selectedItemReducer,
    auth: authReducer,
    loaiDichVu: getAllLoaiDichVuReducer,
    benh: getAllBenhReducer,
    ttk: getTTKReducer,
    benhById: getBenhByIdReducer,
    phieuKhamById: getPhieuKhamByIdReducer,
    gioThuocById: getAllDatLichThuocReducer,
    gioDatLich: getAllGioDatLichReducer,
    ctpkFutureById: getCTPKFutureByIdReducer,
    news: getNewsReducer,
    messages: getMessageReducer,
  },
});

export default store;
