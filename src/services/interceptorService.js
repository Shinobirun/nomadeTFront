// services/interceptorService.js
import axios from 'axios';

const BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:4010';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json'; 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
