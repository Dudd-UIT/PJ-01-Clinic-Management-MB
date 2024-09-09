import axios from '../setup/axios';

// Cập nhật giờ đã đặt lịch
export const updateGioDatLich = async data => {
  const response = await axios.post('/datlichthuoc/update', data);
  return response;
};

// Thêm giờ mới
export const insertGioDatLich = async (maCTDT, thoiGian) => {
  return axios.post('/datlichthuoc/insert', {maCTDT, thoiGian});
};

// Xóa giờ đã đặt lịch
export const deleteGioDatLich = async maCTDT => {
  console.log('maCTDT: ', maCTDT);
  return axios.post('/datlichthuoc/delete', {maCTDT});
};
