// Trong file service của bạn (ví dụ chanDoanService.js)
import axios from 'axios';

export const chanDoanService = (formData) => {
  return axios.post('http://127.0.0.1:5000/predict', {haha: 'haha'}, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
