import axios from 'axios';
import { Alert } from 'react-native';
import store from '../redux/store';

// Create an instance of axios
const instance = axios.create({
  baseURL: 'http://152.69.209.236:3001',
});

instance.defaults.withCredentials = true;

// Add a request interceptor
instance.interceptors.request.use(
  config => {
    const bearerToken = `Bearer ${store.getState().auth.user?.token}`;
    
    config.headers.Accept = 'application/json';
    
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    return {
      ...config,
      headers: {
        ...(bearerToken !== null && { Authorization: `${bearerToken}` }),
        ...config.headers,
      },
    };
  },
  error => {
    console.log('interceptors.request: ', error);
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    console.log('>>> error', error);
    const status = error.response?.status || 500;

    switch (status) {
      case 401:
        Alert.alert('Không xác thực người dùng. Vui lòng đăng nhập...');
        break;
      case 403:
      case 400:
      case 404:
      case 409:
      case 422:
        Alert.alert('Bạn không có quyền truy cập vào tài nguyên này...');
        break;
      default:
        Alert.alert('Lỗi ở server');
    }
    
    return Promise.reject(error.response?.data);
  },
);

export default instance;
