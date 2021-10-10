import { baseURL } from './index';
import axios from 'axios';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 1000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
